const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
require("electron-reload")(__dirname);


const template = [
	{
		label: "File",
		submenu: [
			{
				label: "Open File",
				click: async () => {
					console.log("File was opened");
				}
			}
		]
	}
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


function createWindow () {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

	win.loadFile('index.html');
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	});
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
});