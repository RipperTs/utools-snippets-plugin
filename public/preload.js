const shell = require('electron').shell

const {clipboard} = require('electron')

window.openExternal = function (url) {
  shell.openExternal(url)
}

window.getClipboardContent = function () {
  return clipboard.readText('selection');
}
