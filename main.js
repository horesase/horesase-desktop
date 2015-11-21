"use strict";

var App           = require("app");
var BrowserWindow = require("browser-window");
var CrashReporter = require("crash-reporter");

CrashReporter.start();

App.on("window-all-closed", function() {
  if (process.platform != "darwin") {
    App.quit();
  }
});

var mainWindow = null;

App.on("ready", function() {
  mainWindow = new BrowserWindow({ width: 1000, height: 800, resizable: false });
  mainWindow.loadUrl("file://" + __dirname + "/index.html");

  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});
