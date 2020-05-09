import * as React from "react";
import {useEffect, useState} from "react";
import {render} from "react-dom";
import * as keytar from 'keytar';
import {ipcRenderer} from 'electron';
import {
    Button,
    createMuiTheme,
    CssBaseline,
    IconButton,
    LinearProgress,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ThemeProvider,
    useMediaQuery
} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';
import {blue} from "@material-ui/core/colors";
import {Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon} from "@material-ui/icons";

const mainStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    main: {
        flexGrow: 1,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    input: {
        width: '100%',
    },
}));

function CredentialRow({credential, index, onDelete, onUpdate}) {
    const [account, setAccount] = useState(credential?.account || '');
    const [password, setPassword] = useState(credential?.password || '');

    const style = mainStyle();
    return (<TableRow>
        <TableCell>
            <TextField
                className={style.input}
                type="text"
                placeholder='https://user@someregistry:5000/'
                value={account} variant="outlined"
                onChange={(e) => {
                    setAccount(e.target.value)
                }}/>
        </TableCell>
        <TableCell>
            <TextField type="password"
                       className={style.input}
                       variant="outlined"
                       placeholder='Password'
                       value={password}
                       onChange={(e) => {
                           setPassword(e.target.value)
                       }}/>
        </TableCell>
        <TableCell align="right">
            <IconButton onClick={async () => await onUpdate(credential, index, {account, password})}>
                <SaveIcon/>
            </IconButton>
            <IconButton onClick={async () => await onDelete(credential, index,)}>
                <DeleteIcon/>
            </IconButton>
        </TableCell>
    </TableRow>);
}


function CredentialsTable({onError}) {
    const [credentials, setCredentials] = useState(null);

    async function loadItems() {
        try {
            const credentials = await keytar.findCredentials('docker-registry-ui');
            for (const credential of credentials) {
                // fix for windows
                credential.password = credential.password.replace(/\000+/g, '');
            }
            setCredentials(credentials);
        } catch (e) {
            onError(e.toString());
        }
    }

    async function handleDelete(item, index) {
        // delete an item that has not been stored yet
        if (!item) {
            const newCredentials = [...credentials];
            newCredentials.splice(index, 1);
            setCredentials(newCredentials);
            return;
        }

        try {
            await keytar.deletePassword('docker-registry-ui', item.account);
            await loadItems();
        } catch (e) {
            onError(e.toString());
        }
    }

    async function handleUpdate(oldCredentials, index, newCredentials) {
        try {
            await handleDelete(oldCredentials, index);
            await keytar.setPassword('docker-registry-ui', newCredentials.account, newCredentials.password);
            await loadItems();
        } catch (e) {
            console.error("Error while updating key: ", e);
            onError(e.toString());
        }
    }

    useEffect(() => {
        const load = async () => {
            await loadItems();
        };

        load();
        return;
    }, []);

    if (credentials === null) {
        return <LinearProgress/>
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Host of the registry including username</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell align='right'>
                            <IconButton onClick={() => {
                                setCredentials([...credentials, null])
                            }} disabled={credentials.includes(null)}>
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {credentials.map((credential, index) => <CredentialRow
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                        index={index}
                        key={credential?.account || ''}
                        credential={credential}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [error, setError] = useState();
    const classes = mainStyle();

    const theme = React.useMemo(
        () =>
          createMuiTheme({
            palette: {
              type: prefersDarkMode ? 'dark' : 'light',
              primary: blue,
            },
          }),
        [prefersDarkMode],
      );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className={classes.root}>
                {error && <Alert severity='error' onClose={() => {
                    setError(null)
                }}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>}
                <main className={classes.main}>
                    <CredentialsTable onError={setError}/>
                </main>
            </div>
        </ThemeProvider>
    );
}

render(<App/>, document.getElementById("root"));

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept();
}

