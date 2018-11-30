'use strict';

const { app, BrowserWindow } = require('electron')

const url = require('url');
const serve = require('swagger-editor-serve');

serve().then(({ serverUrl }) => {
  let mainWindow;

  const createWindow = () => {
    mainWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: false
      }
    });

    mainWindow.loadURL(url.format(serverUrl));

    mainWindow.on('closed', () => mainWindow = null);

    mainWindow.once('ready-to-show', () => {
      mainWindow.maximize();
      mainWindow.show();
    })
  }

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

});
