const {clipboard} = require('electron')
const fs = require('fs')
const os = require('os');

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

window.getIPAddress = function (num = 0) {
  try {
    const netInfo = os.networkInterfaces();
    const netInfoNames = Object.keys(netInfo);
    let ips = [];
    netInfoNames.forEach(n => {
      netInfo[n].some(i => {
        if (i.family === 'IPv4' && i.address !== '127.0.0.1') {
          return ips.push({name: n, ip: i.address});
        }
      });
    });
    return ips[num].ip;
  } catch (e) {
    return "";
  }
}
