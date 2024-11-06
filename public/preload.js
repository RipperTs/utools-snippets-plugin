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


// 处理命令中的特殊字符
function escapeCommand(command) {
  // 针对Windows和Mac的不同转义处理
  if (window.utools.isWindows()) {
    return command.replace(/([&|<>^])/g, '^$1');
  }
  return command.replace(/"/g, '\\"');
}

// Windows系统
function openTerminalWindows(command) {
  // 对于包含空格的路径，需要确保正确引用
  exec(`start cmd /K "${command}"`);
}

// MacOS系统默认终端
function openTerminalMac(command) {
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

  exec(`osascript -e '${script.replace(/'/g, "'\\''")}'`);
}

// Warp 专用的 AppleScript 命令
function openWarpTerminalMac(command, warp_activate_delay) {
  const script = `
    set the clipboard to "${command}"

    tell application "Warp"
        activate
        tell application "System Events"
            keystroke "t" using command down
            delay ${warp_activate_delay}
            keystroke "v" using command down
            delay 0.5
            key code 36
        end tell
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
 * @param warp_activate_delay Warp激活延迟, 默认为3秒
 */
window.openTerminal = function (command, terminalType, warp_activate_delay = 3) {
  // 处理可能的错误情况
  if (!command) {
    window.utools.showNotification('命令不能为空');
    return;
  }

  try {
    const escapedCommand = escapeCommand(command);
    if (window.utools.isWindows()) {
      openTerminalWindows(escapedCommand);
      return;
    }

    if (window.utools.isLinux()) {
      openTerminalLinux(escapedCommand);
      return;
    }

    if (!window.utools.isMacOS()) {
      window.utools.showNotification('未知的操作系统, 无法打开终端');
      return;
    }

    if (terminalType === 'default') {
      openTerminalMac(escapedCommand);
      return;
    }

    if (terminalType === 'iterm2') {
      openITerminal2Mac(escapedCommand);
      return;
    }

    if (terminalType === 'warp') {
      openWarpTerminalMac(escapedCommand, warp_activate_delay);
      return;
    }

    window.utools.showNotification('未知的终端类型, 无法打开终端');
  } catch (error) {
    window.utools.showNotification(`执行命令时出错: ${error.message}`);
  }

}
