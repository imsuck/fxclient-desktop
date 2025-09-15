import { app, BrowserWindow } from "electron/main";
import * as path from "path";

function createWindow() {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
  });

  win.loadURL("https://fxclient.github.io/FXclient/");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
