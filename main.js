const { app, Menu, session } = require('electron');
const { menubar } = require('menubar');

const urls = [
  { label: 'Plex', url: 'https://app.plex.tv/desktop' },
  { label: 'Netflix', url: 'https://www.netflix.com/browse' },
  { label: 'Disney+', url: 'https://www.disneyplus.com/home' },
];

const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36';

app.on('ready', () => {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = userAgent;
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  let currentUrl = urls[0].url;

  const mb = menubar({
    tooltip: 'Plex',
    index: currentUrl,
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