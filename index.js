// todo modal popup on submission
// todo see records
// todo form validation

const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");

// * db
const ingoingRecord = require("./models/ingoingRecord");
const outgoingRecord = require("./models/outgoingRecord");
const otRecord = require("./models/otRecord");

const mongoose = require("mongoose");

var mainWindow; // global

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1200,
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
// CREATE
ipcMain.on("message", (event, arg) => {
  console.log("EVENT FIRED...");
  console.log(arg.variant);
  insertRecords(arg);
});

async function insertRecords(arg) {
  mongoose.connect(
    "mongodb+srv://abdullah:iphonese@cluster0.gbkbv.mongodb.net/patientManager",
    { useUnifiedTopology: true }
  );
  if (arg.variant === "ingoing") {
    await ingoingRecord.create(arg);
    console.log("added records to ingoing");
  } else if (arg.variant === "outgoing") {
    await outgoingRecord.create(arg);
    console.log("added records to outgoing");
  } else if (arg.variant === "ot") {
    await otRecord.create(arg);
    console.log("added records to ot");
  }
}
/// END CREATE

/// READ
ipcMain.on("fetchIngoing", (event, arg) => {
  getRecords("ingoingRecord").then((allRecords) => {
    console.log("SENDING THIS:");
    console.log(allRecords);
    mainWindow.webContents.send("sendIngoing", allRecords);
  });
});

ipcMain.on("fetchOutgoing", (event, arg) => {
  const allRecords = getRecords("outgoingRecord");
  event.sender.send("sendOutgoing", allRecords);
});

ipcMain.on("fetchOt", (event, arg) => {
  const allRecords = getRecords("OtRecord");
  event.sender.send("sendOt", allRecords);
});

async function getRecords(variant) {
  mongoose.connect(
    "mongodb+srv://abdullah:iphonese@cluster0.gbkbv.mongodb.net/patientManager",
    { useUnifiedTopology: true }
  );
  if (variant == "ingoingRecord") {
    return await ingoingRecord.find({});
    // console.log(records);
    
  } else if (variant == "outgoingRecord") {
    return await outgoingRecord.find({});
    // console.log(records);
   
  } else if (variant == "otRecord") {
    return await otRecord.find({});
    
  }
}
/// END READ
