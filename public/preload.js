const { contextBridge, ipcRenderer, clipboard } = require('electron')

contextBridge.exposeInMainWorld('electron', {
	jsonRPC: 'http://localhost:8421/_jsonRPC_',
	platform: process.platform,
  copyText: (text) => clipboard.writeText(text),
	on: (channel, listener) => ipcRenderer.on(channel, listener),
	send: (channel, ...args) => ipcRenderer.send(channel, args),
	sendSync: (channel, ...args) => ipcRenderer.sendSync(channel, args),
	removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
})