const { app, BrowserWindow } = require('electron');
const isDevMode = require('electron-is-dev');
const keytar = require('keytar');
const url = require('url');

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// Credentials that are fetched from the Keychain
let credentials = [];

async function createWindow () {
  try {
    credentials = await keytar.findCredentials('docker-registry-ui');
    for(const credential of credentials) {
      // fix for windows
      credential.password = credential.password.replace(/\000+/g, '');
    }
  } catch(e) {
    console.log(e);
    credentials = [];
  }

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

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.show();
  });
}

app.on('ready', async () => await createWindow());

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async function () {
  if (mainWindow === null) {
    await createWindow();
  }
});

app.on("login", (event, contents, authencation, info, callback) => {
  for(const credential of credentials) {
    const parsedUrl = url.parse(credential.account);
    if (parsedUrl.hostname === info.host) {
      return callback(parsedUrl.auth, credential.password);
    }
  }
  callback();
});
