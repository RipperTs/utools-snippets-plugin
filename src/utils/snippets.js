import dayjs from "dayjs";
import {v4 as uuidv4} from 'uuid';

/**
 * 上屏动作
 * @param code
 */
function snippets(code) {
  const snippets = window.utools.db.get(code)
  if (snippets) {
    const content = processingContent(snippets.data.snippet)
    window.utools.hideMainWindowTypeString(content)
    window.utools.outPlugin()
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
  // 将content中的所有 {time} 替换为当前时间
  content = content.replace(/{time}/g, dayjs().format('YYYY-MM-DD HH:mm:ss'))
  // 将content中的所有 {clipboard} 替换为剪贴板内容
  content = content.replace(/{clipboard}/g, window.getClipboardContent())
  // 将content中的所有 {uuid} 替换为uuid
  content = content.replace(/{uuid}/g, uuidv4())
  // 将content中的所有 {random:1..10} 替换为随机数
  content = content.replace(/{random:(\d+)..(\d+)}/g, function (match, min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  })
  return content
}

export default snippets;
