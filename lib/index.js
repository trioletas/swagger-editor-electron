'use strict';

const url = require('url');

const electron = require('electron');
const serve = require('swagger-editor-serve');
const screenUtils = require('./screen-utils');

serve().then(editorUrl => {
  const app = electron.app;
  const BrowserWindow = electron.BrowserWindow;

  let mainWindow;

  function createWindow() {
    const screenSize = screenUtils.getScreenSize();
    const options = {
      webPreferences: {
        nodeIntegration: false,
      },
      width: screenSize.width,
      height: screenSize.height,
    };

    mainWindow = new BrowserWindow(options);
    mainWindow.loadURL(url.format(editorUrl));
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
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
