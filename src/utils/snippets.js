import dayjs from "dayjs";
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';
import placeholder_tags from "@/utils/placeholder";
import store from '@/store'

const timingMillisecond = 20 // 延迟时间

// 顺序执行延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 上屏动作
 * @param code
 */
export function snippets(code) {
  const snippets = window.utools.db.get(code)
  if (!snippets) {
    window.utools.showNotification('未找到该关键字')
    window.utools.hideMainWindow()
    window.utools.outPlugin()
    return false;
  }

  // 手动输入内容后上屏
  const is_input_content = checkIsInputContent(snippets.data.snippet)
  if (is_input_content) {
    window.utools.setExpendHeight(0)
    window.utools.setSubInput(({text}) => {
      // 跳转到about页面
      if (text.trim().length > 0) {
        store.state.sharedData = {text, snippets}
      } else {
        store.state.sharedData = {}
      }
    }, `${snippets.data.name}, 回车执行`)
    return true;
  }

  autoSnippets(snippets)
}


/**
 * 执行自动上屏动作
 * @param snippets 关键字数据
 * @param input_content 手动输入的内容
 */
export function autoSnippets(snippets, input_content = '') {
  (async function () {
    store.state.sharedData = {}
    // 获取当前剪贴板内容
    const current_clipboard_content = window.getClipboardContent()
    const is_select_words = checkIsSelectWords(snippets.data.snippet)
    let content = ''
    if (is_select_words) {
      // 需要获取划词选中内容
      window.utools.hideMainWindow()
      window.utools.simulateKeyboardTap('c', window.utools.isMacOS() ? 'command' : 'ctrl')
      await delay(100);
      let select_words = window.getClipboardContent()
      content = processingContent(snippets.data.snippet, current_clipboard_content, select_words, input_content)
    } else {
      content = processingContent(snippets.data.snippet, current_clipboard_content, '', input_content)
    }
    // 获取要移动到光标的位置
    let cursor_position = getCursorPosition(content)
    if (cursor_position > 0) {
      // 将content中的所有 {cursor} 替换为空字符串
      content = content.replace(/{cursor}/g, '')
    }

    // 粘贴文本片段动作
    pasteText(snippets, content)

    if (cursor_position > 0) {
      await delay(timingMillisecond);
      for (let i = 0; i < cursor_position; i++) {
        window.utools.simulateKeyboardTap('left')
      }
    }

    // 执行后置动作
    postAction(snippets, current_clipboard_content)

  })();
}


/**
 * 粘贴文本片段动作
 * @param snippets
 * @param content
 */
function pasteText(snippets, content) {
  const is_reduction_clipboard = snippets.data?.is_reduction_clipboard || 1
  // 仅复制文本片段内容
  if (is_reduction_clipboard === 3) {
    window.utools.copyText(content)
    window.utools.hideMainWindow()
    return false;
  }
  const app_version = parseInt(window.utools.getAppVersion())
  // 兼容旧版本3.x
  if (app_version >= 4) {
    window.utools.hideMainWindowPasteText(content)
  } else {
    window.utools.copyText(content)
    window.utools.hideMainWindow()
    window.utools.simulateKeyboardTap('v', window.utools.isMacOS() ? 'command' : 'ctrl')
  }
}

/**
 * 执行后置动作
 * @param snippets
 * @param current_clipboard_content
 */
function postAction(snippets, current_clipboard_content) {
  (async function () {
    const is_reduction_clipboard = snippets.data?.is_reduction_clipboard || 1
    const is_enter = snippets.data?.is_enter || 2

    if (is_enter === 1) {
      await delay(timingMillisecond);
      window.utools.simulateKeyboardTap('enter')
    }

    if (is_reduction_clipboard === 1) {
      await delay(timingMillisecond);
      window.utools.copyText(current_clipboard_content)
    }

    window.utools.outPlugin()

  })();
}

/**
 * 处理内容(主要替换占位符)
 * @param content
 * @param current_clipboard_content
 * @param select_words
 * @param input_content
 * @returns {*}
 */
function processingContent(content, current_clipboard_content, select_words = '', input_content = '') {
  const replacements = [
    {pattern: /{datetime}/g, replacement: dayjs().format('YYYY年MM月DD日 HH:mm:ss')},
    {pattern: /{date}/g, replacement: dayjs().format('YYYY年MM月DD日')},
    {pattern: /{time}/g, replacement: dayjs().format('HH:mm:ss')},
    {pattern: /{timestamp}/g, replacement: dayjs().unix()},
    {pattern: /{isodate:(.*?)}/g, replacement: (match, format) => dayjs().format(format)},
    {pattern: /{clipboard}/g, replacement: current_clipboard_content},
    {pattern: /{clipboard:lowercase}/g, replacement: _.toLower(current_clipboard_content)},
    {pattern: /{clipboard:uppercase}/g, replacement: _.toUpper(current_clipboard_content)},
    {pattern: /{clipboard:camelcase}/g, replacement: _.camelCase(current_clipboard_content)},
    {pattern: /{clipboard:snakecase}/g, replacement: _.snakeCase(current_clipboard_content)},
    {pattern: /{clipboard:trim}/g, replacement: current_clipboard_content.trim()},
    {
      pattern: /{clipboard:trim:(.*?)}/g,
      replacement: (match, trim) => _.trim(current_clipboard_content, trim)
    },
    {pattern: /{uuid}/g, replacement: uuidv4()},
    {
      pattern: /{random:(\d+)..(\d+)}/g,
      replacement: (match, min, max) => Math.floor(Math.random() * (max - min + 1) + min)
    },
    {pattern: /{selection}/g, replacement: select_words.trim()},
    {pattern: /{selection:lowercase}/g, replacement: _.toLower(select_words.trim())},
    {pattern: /{selection:uppercase}/g, replacement: _.toUpper(select_words.trim())},
    {pattern: /{selection:camelcase}/g, replacement: _.camelCase(select_words.trim())},
    {pattern: /{selection:snakecase}/g, replacement: _.snakeCase(select_words.trim())},
    {pattern: /{input:content}/g, replacement: input_content},
    {pattern: /{ip:(\d+)}/g, replacement: (match, num) => window.getIPAddress(num)},
    {pattern: /{clipboard:file:(\d+)}/g, replacement: (match, num) => getClipboardFiles(num)},
    {pattern: /{clipboard:number}/g, replacement: () => toNumber(current_clipboard_content)},
  ];

  let processedContent = content;
  replacements.forEach(({pattern, replacement}) => {
    processedContent = processedContent.replace(pattern, replacement);
  });

  return processedContent;
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

/**
 * 检查是否需要输入自定义内容
 * @param content
 * @returns {boolean}
 */
function checkIsInputContent(content) {
  const index = content.indexOf('{input:content}')
  return !(index === -1)
}

/**
 * 检查是否需要获取划词选中内容
 * @param content
 * @returns {boolean}
 */
function checkIsSelectWords(content) {
  let isSelectWords = false
  placeholder_tags.forEach((item) => {
    if (item.label === '划词选中') {
      item.value.forEach((item) => {
        if (content.indexOf(item.value) !== -1) {
          isSelectWords = true;
        }
      })
    }
  })
  return isSelectWords
}


/**
 * 获取剪贴板文件路径
 * @param num
 * @returns {string}
 */
function getClipboardFiles(num = 0) {
  try {
    const files = window.utools.getCopyedFiles();
    if (!files || files.length === 0) {
      return "";
    }
    return files[num].path;
  } catch (e) {
    return "";
  }
}

/**
 * 将字符串转换为数字
 * '16,2739.01' -> 162739.01
 * @param value
 * @returns {number|number}
 */
function toNumber(value) {
  value = value.trim();
  const n = parseFloat(value.replaceAll(',', ''))
  if (isNaN(n)) {
    return 0;
  }
  // 查看是否有小数点, 如果有小数点, 则保留与原来相同的小数点位数
  if (value.indexOf('.') !== -1) {
    return n.toFixed(value.split('.')[1].length)
  }
  return n
}
