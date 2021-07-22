const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.webContents.openDevTools();
  console.log("bawa ji"); //vscode terminal

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile("src/build/index.html");
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("message", (event, arg) => {
  console.log("MESSAGE EVENT");
  if (arg.variant === "ingoing") {
    console.log(arg);
  } else if (arg.variant === "outgoing") {
    console.log("aese nahi chalay ga");
  }
});
