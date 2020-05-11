const {app, BrowserWindow, globalShortcut, Menu} = require('electron');
const isDevMode = require('electron-is-dev');
const keytar = require('keytar');
const url = require('url');

const isMac = process.platform === 'darwin'

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// Credentials that are fetched from the Keychain
let credentials = [];

// Credentials helper window
let credentialsWindow;

const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {
                label: 'Preferences', accelerator: 'CmdorCtrl+,', click: () => {
                    credentialsWindow.show();
                }
            },
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            ...(isMac ? [] : [{role: 'quit'}]),
            {
                label: 'Preferences', accelerator: 'CmdorCtrl+,', click: () => {
                    credentialsWindow.show();
                }
            },
        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            ...(isMac ? [
                {role: 'pasteAndMatchStyle'},
                {role: 'delete'},
                {role: 'selectAll'},
                {type: 'separator'},
                {
                    label: 'Speech',
                    submenu: [
                        {role: 'startspeaking'},
                        {role: 'stopspeaking'}
                    ]
                }
            ] : [
                {role: 'delete'},
                {type: 'separator'},
                {role: 'selectAll'}
            ])
        ]
    },
    // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [
            {role: 'reload'},
            {role: 'forcereload'},
            {role: 'toggledevtools'},
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'},
            {type: 'separator'},
            {
                label: 'Credentials Helper', accelerator: 'CmdorCtrl+k', click: () => {
                    credentialsWindow.show();
                }
            },
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            {role: 'minimize'},
            {role: 'zoom'},
            ...(isMac ? [
                {type: 'separator'},
                {role: 'front'},
                {type: 'separator'},
                {role: 'window'}
            ] : [
                {role: 'close'}
            ])
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: async () => {
                    const {shell} = require('electron')
                    await shell.openExternal('https://joxit.dev/docker-registry-ui/')
                }
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(template);
if (isMac) {
    Menu.setApplicationMenu(menu);
}

async function loadCredentials() {
    try {
        credentials = await keytar.findCredentials('docker-registry-ui');
        for (const credential of credentials) {
            // fix for windows
            credential.password = credential.password.replace(/\000+/g, '');
        }
    } catch (e) {
        console.log(e);
        credentials = [];
    }
}

async function createWindow() {
    return new Promise((resolve, reject) => {
        mainWindow = new BrowserWindow({
            height: 920,
            width: 1600,
            show: false,
            webPreferences: {
                nodeIntegration: false,
            }
        });

        if (isDevMode) {
            mainWindow.webContents.openDevTools();
        }

        if (!isMac) {
            mainWindow.setMenu(menu);
        }

        mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
        mainWindow.webContents.on('dom-ready', () => {
            console.log("Main Window DOM ready");
            resolve();
        });
    });
}

async function createCredentialsWindow() {
    return new Promise((resolve) => {
        credentialsWindow = new BrowserWindow({
            width: 1000,
            height: 400,
            show: false,
            title: 'Credential Manager',
            parent: mainWindow,
            webPreferences: {
                nodeIntegration: true,
            }
        });

        if (isDevMode) {
            credentialsWindow.openDevTools();
        }

        if (!isMac) {
            credentialsWindow.setMenu(null);
        }

        credentialsWindow.loadURL(`file://${__dirname}/dist/authentication/index.html`);
        credentialsWindow.webContents.on('dom-ready', () => {
            console.log('Credentials Window DOM is ready');
            resolve();
        });

        credentialsWindow.on('close', async (e) => {
            console.log("Closed credential window");
            credentialsWindow.hide();
            e.preventDefault();
            await loadCredentials();
            mainWindow.reload();
        });
    });
}

app.on('ready', async () => {
    await Promise.all([
        loadCredentials(),
        createWindow(),
        createCredentialsWindow(),
    ]);
    mainWindow.show();
});


app.on("login", (event, contents, authencation, info, callback) => {
    for (const credential of credentials) {
        const parsedUrl = url.parse(credential.account);
        if (parsedUrl.hostname === info.host) {
            return callback(parsedUrl.auth, credential.password);
        }
    }
    callback();
});
