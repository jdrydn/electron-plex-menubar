const { menubar } = require('menubar');

const plex = menubar({
  index: 'https://app.plex.tv/desktop',
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
  showOnAllWorkspaces: true,
  windowPosition: 'trayLeft',
});

plex.on('ready', function () {
  console.log('Webview is ready');
});
