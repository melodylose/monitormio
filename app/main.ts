import * as electron from 'electron';
import {app, BrowserWindow} from 'electron';

let mainWindow: Electron.BrowserWindow = null;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();        
    } 
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadURL('file://' + __dirname + '/../app/index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});