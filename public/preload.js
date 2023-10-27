const {clipboard} = require('electron')
const fs = require('fs')

window.getClipboardContent = function () {
  return clipboard.readText('selection');
}

window.saveFile = function (path, content, func, errFunc) {
  fs.writeFile(path, content, function (err) {
    if (err) {
      errFunc && errFunc(err)
      return false;
    }
    func && func()
  });
}

window.readFile = function (path) {
  var data = fs.readFileSync(path);
  return data.toString();
}
