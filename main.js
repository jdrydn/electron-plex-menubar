const { app, Menu } = require('electron');
const { menubar } = require('menubar');

const urls = [
  { label: 'Plex', url: 'https://app.plex.tv/desktop' },
  { label: 'Netflix', url: 'https://www.netflix.com/browse' },
  { label: 'Disney+', url: 'https://www.disneyplus.com/home' },
];

app.on('ready', () => {
  let currentUrl = urls[0].url;

  const mb = menubar({
    index: currentUrl,
    tooltip: 'Plex',
    browserWindow: {
      height: 250,
      width: 400,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: false,
        zoomFactor: 0.5,
      },
    },
    preloadWindow: true,
    showOnAllWorkspaces: true,
    showDockIcon: true,
    windowPosition: 'trayLeft',
  });

  function rebuildMenu() {
    return Menu.buildFromTemplate([
      {
        label: 'Change Source',
        submenu: urls.map(({ label, url }) => ({
          label,
          enabled: currentUrl !== url,
          click: () => {
            currentUrl = url;
            mb.window.loadURL(url);
            app.dock.setMenu(rebuildMenu());
          },
        })),
      },
    ]);
  }

  mb.on('ready', function () {
    console.log('Webview is ready');

    if (process.platform === 'darwin') {
      app.dock.setMenu(rebuildMenu());
    }
  });
});