import * as React from "react";
import { render } from "react-dom";
import { useEffect, useState } from "react";
import * as keytar from 'keytar';
import './main.css';
import { ipcRenderer } from 'electron';

function CredentialRow({ credential, index, onDelete, onUpdate }) {
    const [account, setAccount] = useState(credential?.account  || '');
    const [password, setPassword] = useState(credential?.password  || '');

    return (<tr>
        <td>
            <input type="text"
                   value={account}
                   onChange={(e) => { setAccount(e.target.value) }} />
        </td>
        <td>
            <input type="password"
                   value={password}
                   onChange={(e) => { setPassword(e.target.value) }} />
        </td>
        <td align="right">
            <button onClick={async () => await onDelete(credential, index) }>Delete</button>
            <button onClick={async () => await onUpdate(credential, index, { account, password }) }>Save</button>
        </td>
    </tr>);
}

function CredentialsTable({ onError }) {
    const [credentials, setCredentials] = useState(null);

    async function loadItems() {
        try {
            setCredentials(await keytar.findCredentials('docker-registry-ui'));
        } catch(e) {
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
        } catch(e) {
            onError(e.toString());
        }
    }

    async function handleUpdate(oldCredentials, index, newCredentials) {
        console.log("update");
        try {
            await handleDelete(oldCredentials, index);
            await keytar.setPassword('docker-registry-ui', newCredentials.account, newCredentials.password);
            await loadItems();
        } catch(e) {
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
        return <h1>Loading ...</h1>
    }
    return (
        <>
            <header>
                <h1>Docker Registry</h1>
                <button onClick={() => { setCredentials([...credentials, null ])}}>+</button>
            </header>
        <table>
        <thead>
            <tr>
                <td>URL</td>
                <td>Password</td>
            </tr>
        </thead>
        <tbody>
            {credentials.map((credential, index) => <CredentialRow
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                index={index}
                key={index}
                credential={credential} />)}
        </tbody>
    </table></>);
}

function App() {
    const [error, setError] = useState(null);

    function handleOk() {
        ipcRenderer.send('close');
    }

    return (
        <main>
            <CredentialsTable onError={setError} />
            { error && <p class="error">{error}</p>}
            <footer>
                <button onClick={handleOk}>Ok</button>
            </footer>
        </main>);
}

render(<App />, document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}
