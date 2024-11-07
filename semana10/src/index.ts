import { app, BrowserWindow, ipcMain } from 'electron';
import Veiculo from './enty/veiculo';
import VeiculoRepository from './repository/veiculo.repository';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

var mainWindow: BrowserWindow;
const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
 // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
 
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('create', async (event: any, veiculo: any) => {
  console.log(veiculo)
const { id, modelo, cor, ano, preco, imagem} = veiculo;
const novoveiculo = new Veiculo (modelo, cor, ano, preco, imagem, id);
new VeiculoRepository().save(novoveiculo);

})

ipcMain.handle('findAll', async () => {
  return new VeiculoRepository().findAll();
})

ipcMain.handle('findbyid', async (_: any, id: any) => {
  return new VeiculoRepository().findbyid(id);
})

ipcMain.handle('deletarVeiculo', async (_: any, id: String) => {
  await new VeiculoRepository().delete(id);
})

ipcMain.on("changescreen", (_: any, id: String) => {
  mainWindow.loadURL('http://localhost:3000/detalhes')
})

ipcMain.on("change-screen-home", () => {
  mainWindow.loadURL('http://localhost:3000/main_window')
})