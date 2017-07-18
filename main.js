const menubar = require('menubar');

const plex = menubar({
  index: 'https://app.plex.tv/web',
	tooltip: 'Plex',
	height: 250,
	width: 400,
	alwaysOnTop: true,
  windowPosition: 'trayLeft',
  webPreferences: {
    nodeIntegration: false,
    zoomFactor: 0.5,
  },
});

plex.on('ready', function () {
  console.log('Webview is ready');
});
