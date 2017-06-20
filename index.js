var {app, BrowserWindow, Tray}=require('electron');
const {autoUpdater} = require("electron-updater");

var appIcon;
var fs=require('fs');
  const iconPath = fs.readFile('img287.jpg','UTF-8',function(err,data){
	  if(data){
		  path=__dirname+'/img287.jpg';
  appIcon = new Tray(path)
  console.log(appIcon);
  appIcon.setToolTip('Electron Demo in the tray.')
	  }
})

let template = []
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  })
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for updates...');
})
autoUpdater.on('update-available', (ev, info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (ev, info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
	if(ev){
	  sendStatusToWindow('edo ev anta.',ev);	
	}
  sendStatusToWindow('Error in auto-updater.',err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (ev, info) => {
  sendStatusToWindow('Update downloaded; will install in 5 seconds');
});

autoUpdater.on('update-downloaded', (ev, info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  setTimeout(function() {
    autoUpdater.quitAndInstall();  
  }, 5000)
})

app.on('ready',function(){
var win=new BrowserWindow({width:800,height:800});
win.loadURL('http://vibugbot.mybluemix.net/');

})

app.on('window-all-closed', function () {
  if (appIcon) appIcon.destroy()
})

app.on('ready', function()  {
	const isDev = require('electron-is-dev');

if (isDev) {
	console.log('Running in development');
} else {
	console.log('Running in production');
	  autoUpdater.checkForUpdates();
}
});