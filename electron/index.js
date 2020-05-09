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

function createWindow() {
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
        mainWindow.show();
    });
}

function createCredentialsWindow() {

    credentialsWindow = new BrowserWindow({
        useContentSize: true,
        show: false,
        title: 'Credential Manager',
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
    credentialsWindow.webContents.on('ipc-message', (event, channel) => {
        if (channel === 'close') {
            credentialsWindow.hide();

        }
    })

    credentialsWindow.on('hide', async () => {
        await loadCredentials();
        mainWindow.reload();
    });

    credentialsWindow.on('close', (event) => {
        event.preventDefault();
        credentialsWindow.hide();
    })
}

app.on('ready', async () => {
    await loadCredentials();
    createWindow();
    createCredentialsWindow();
});

app.on('window-all-closed', function () {
    app.quit();
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
