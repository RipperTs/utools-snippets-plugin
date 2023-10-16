import dayjs from "dayjs";
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';

const timingMillisecond = 100 // 延迟时间

/**
 * 上屏动作
 * @param code
 */
function snippets(code) {
  const snippets = window.utools.db.get(code)
  if (snippets) {
    const current_clipboard_content = window.getClipboardContent()
    const cursor_position = getCursorPosition(snippets.data.snippet)
    const content = processingContent(snippets.data.snippet)
    const app_version = parseInt(window.utools.getAppVersion())
    // 兼容旧版本3.x
    if (app_version >= 4) {
      window.utools.hideMainWindowPasteText(content)
    } else {
      window.utools.copyText(content)
      window.utools.hideMainWindow()
      window.utools.simulateKeyboardTap('v', window.utools.isMacOS() ? 'command' : 'ctrl')
    }
    if (cursor_position > 0) {
      setTimeout(() => {
        for (let i = 0; i < cursor_position; i++) {
          window.utools.simulateKeyboardTap('left')
        }
        window.utools.copyText(current_clipboard_content)
        window.utools.outPlugin()
      }, timingMillisecond)
    } else {
      setTimeout(() => {
        window.utools.copyText(current_clipboard_content)
        window.utools.outPlugin()
      }, timingMillisecond)
    }

  } else {
    window.utools.showNotification('未找到该关键字')
    window.utools.hideMainWindow()
    window.utools.outPlugin()
  }
}

/**
 * 处理内容(主要替换占位符)
 * @param content
 * @returns {*}
 */
function processingContent(content) {
  // 将content中的所有 {datetime} 替换为当前时间
  content = content.replace(/{datetime}/g, dayjs().format('YYYY年MM月DD日 HH:mm:ss'))
  content = content.replace(/{date}/g, dayjs().format('YYYY年MM月DD日'))
  content = content.replace(/{time}/g, dayjs().format('HH:mm:ss'))
  // 将content中的所有 {timestamp} 替换为当前时间戳
  content = content.replace(/{timestamp}/g, dayjs().unix())
  // 将content中的所有 {isodate:yyyy-MM-dd HH:mm:ss} 替换为当前时间
  content = content.replace(/{isodate:(.*)}/g, function (match, format) {
    return dayjs().format(format)
  })
  // 将content中的所有 {clipboard} 替换为剪贴板内容
  content = content.replace(/{clipboard}/g, window.getClipboardContent())
  // 将content中的所有 {clipboard:lowercase} 替换为剪贴板内容转小写
  content = content.replace(/{clipboard:lowercase}/g, _.lowerCase(window.getClipboardContent()))
  // 将content中的所有 {clipboard:uppercase} 替换为剪贴板内容转大写
  content = content.replace(/{clipboard:uppercase}/g, _.toUpper(window.getClipboardContent()))
  // 将content中的所有 {clipboard:camelcase} 替换为剪贴板内容转驼峰
  content = content.replace(/{clipboard:camelcase}/g, _.camelCase(window.getClipboardContent()))
  // 将content中的所有 {clipboard:snakecase} 替换为剪贴板内容转下划线
  content = content.replace(/{clipboard:snakecase}/g, _.snakeCase(window.getClipboardContent()))
  // 将content中的所有 {clipboard:trim} 替换为剪贴板内容去掉首尾空格
  content = content.replace(/{clipboard:trim}/g, window.getClipboardContent().trim())
  // 将content中的所有 {clipboard:trim:xxx} 替换为剪贴板内容去掉首尾指定字符
  content = content.replace(/{clipboard:trim:(.*)}/g, function (match, trim) {
    return _.trim(window.getClipboardContent(), trim)
  })
  // 将content中的所有 {uuid} 替换为uuid
  content = content.replace(/{uuid}/g, uuidv4())
  // 将content中的所有 {random:1..10} 替换为随机数
  content = content.replace(/{random:(\d+)..(\d+)}/g, function (match, min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  })
  // 将content中的所有 {cursor} 替换为空字符串
  content = content.replace(/{cursor}/g, '')
  return content
}

/**
 * 获取要移动到光标的位置
 * @param content
 * @returns {number}
 */
function getCursorPosition(content) {
  const index = content.indexOf('{cursor}')
  if (index === -1) {
    return 0;
  }
  return content.length - index - 8
}


export default snippets;
