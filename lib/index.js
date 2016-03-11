'use strict';

const url = require('url');

const electron = require('electron');

const serve = require('swagger-editor-serve');

serve().then(editorUrl => {
    const app = electron.app;
    const BrowserWindow = electron.BrowserWindow;

    let mainWindow;

    function createWindow() {
        mainWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: false,
            },
        });
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
