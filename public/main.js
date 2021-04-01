const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: false },
  });

  // and load the index.html of the app.
  win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
}
app.on("ready", createWindow);
