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

  mainWindow.webContents.on('did-finish-load', () => {
    const css = `
      /* hide propaganda */
      body > div[style^="position: fixed"] {
        display: none;
      }
    `;
    mainWindow.webContents.insertCSS(css)
      .then(key => {
        console.log('CSS injected with key:', key);
      })
      .catch(error => {
        console.error('Error injecting CSS:', error);
      });
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
  {
    label: "Open DevTools",
    click: () => {
      if (mainWindow) {
        mainWindow.webContents.openDevTools();
      }
    },
    accelerator: "CmdOrCtrl+Shift+I",
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
