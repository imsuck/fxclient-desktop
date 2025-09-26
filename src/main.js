import { app, BrowserWindow, Menu, MenuItem } from "electron/main";
import * as path from "path";

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
  });

  mainWindow.loadURL("https://fxclient.github.io/FXclient/");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

let mainMenu = new Menu;

if (process.platform === 'darwin') {
  const appMenu = new MenuItem({ role: 'appMenu' })
  mainMenu.append(appMenu)
}

const submenu = Menu.buildFromTemplate([
  {
    label: "Open FXClient",
    click: () => {
      if (mainWindow) {
        mainWindow.loadURL("https://fxclient.github.io/FXclient/");
      }
    },
    accelerator: "F3",
  },
  {
    label: "Open territorial.io",
    click: () => {
      if (mainWindow) {
        mainWindow.loadURL("https://territorial.io/");
      }
    },
    accelerator: "F4",
  },
]);
mainMenu.append(new MenuItem({ label: "FXClient", submenu }))

Menu.setApplicationMenu(mainMenu)

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
