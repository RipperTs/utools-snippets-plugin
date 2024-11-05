const {clipboard} = require('electron')
const fs = require('fs')
const os = require('os');
const {exec} = require('child_process');

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

    for (const n of netInfoNames) {
      netInfo[n].some(i => {
        if (i.family === 'IPv4' && i.address !== '127.0.0.1') {
          return ips.push({name: n, ip: i.address});
        }
      });
    }

    return ips[num].ip;
  } catch (e) {
    return "";
  }
}


// Windows系统
function openTerminalWindows(command) {
  // 添加 /MAX 参数最大化窗口并置前
  exec(`start /MAX cmd /K ${command}`);
}

// MacOS系统默认终端
function openTerminalMac(command) {
  // 使用 osascript 激活终端窗口
  exec(`osascript -e 'tell app "Terminal" to do script "${command}"' -e 'tell app "Terminal" to activate'`);
}

// iTerm2 专用的 AppleScript 命令
function openITerminal2Mac(command) {
  const script = `
    tell application "iTerm"
        create window with default profile
        activate
        tell current session of current window
            write text "${command}"
        end tell
    end tell`;

  exec(`osascript -e '${script}'`);
}

// Warp 专用的 AppleScript 命令
function openWarpTerminalMac(command) {
  const script = `
    tell application "Warp"
        activate
        tell application "System Events"
            keystroke "t" using command down
            delay 0.5
        end tell
        do shell script "sleep 0.5"
        tell application "System Events" to keystroke "${command}"
        tell application "System Events" to key code 36
    end tell`;

  exec(`osascript -e '${script}'`);
}

// Linux系统
function openTerminalLinux(command) {
  exec(`gnome-terminal --active -- bash -c '${command}; exec bash'`);
}

/**
 * 打开终端并执行命令
 * @param command 执行的命令
 * @param terminalType 终端类型, 暂定为MacOS的终端类型, default: Terminal, iterm2: iTerm2, warp: Warp
 */
window.openTerminal = function (command, terminalType) {
  if (window.utools.isWindows()){
    openTerminalWindows(command);
    return;
  }

  if (window.utools.isLinux()){
    // todo: linux 未做测试
    openTerminalLinux(command);
    return;
  }

  if (!window.utools.isMacOS()){
    window.utools.showNotification('未知的操作系统, 无法打开终端');
    return;
  }

  if(terminalType === 'default'){
    openTerminalMac(command);
    return;
  }

  if (terminalType === 'iterm2') {
    openITerminal2Mac(command);
    return;
  }

  if (terminalType === 'warp') {
    openWarpTerminalMac(command);
    return;
  }

  window.utools.showNotification('未知的终端类型, 无法打开终端');

}
