const {clipboard} = require('electron')

window.getClipboardContent = function () {
  return clipboard.readText('selection');
}
