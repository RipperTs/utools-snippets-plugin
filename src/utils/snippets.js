import dayjs from "dayjs";
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';
import placeholder_tags from "@/utils/placeholder";
import store from '@/store'

const timingMillisecond = 100 // 延迟时间

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
  content = content.replace(/{clipboard}/g, current_clipboard_content)
  // 将content中的所有 {clipboard:lowercase} 替换为剪贴板内容转小写
  content = content.replace(/{clipboard:lowercase}/g, _.lowerCase(current_clipboard_content))
  // 将content中的所有 {clipboard:uppercase} 替换为剪贴板内容转大写
  content = content.replace(/{clipboard:uppercase}/g, _.toUpper(current_clipboard_content))
  // 将content中的所有 {clipboard:camelcase} 替换为剪贴板内容转驼峰
  content = content.replace(/{clipboard:camelcase}/g, _.camelCase(current_clipboard_content))
  // 将content中的所有 {clipboard:snakecase} 替换为剪贴板内容转下划线
  content = content.replace(/{clipboard:snakecase}/g, _.snakeCase(current_clipboard_content))
  // 将content中的所有 {clipboard:trim} 替换为剪贴板内容去掉首尾空格
  content = content.replace(/{clipboard:trim}/g, current_clipboard_content.trim())
  // 将content中的所有 {clipboard:trim:xxx} 替换为剪贴板内容去掉首尾指定字符
  content = content.replace(/{clipboard:trim:(.*)}/g, function (match, trim) {
    return _.trim(current_clipboard_content, trim)
  })
  // 将content中的所有 {uuid} 替换为uuid
  content = content.replace(/{uuid}/g, uuidv4())
  // 将content中的所有 {random:1..10} 替换为随机数
  content = content.replace(/{random:(\d+)..(\d+)}/g, function (match, min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  })

  content = content.replace(/{selection}/g, select_words.trim())
  content = content.replace(/{selection:lowercase}/g, _.lowerCase(select_words.trim()))
  content = content.replace(/{selection:uppercase}/g, _.toUpper(select_words.trim()))
  content = content.replace(/{selection:camelcase}/g, _.camelCase(select_words.trim()))
  content = content.replace(/{selection:snakecase}/g, _.snakeCase(select_words.trim()))

  // 将content中的所有 {input:content} 替换为输入的内容
  content = content.replace(/{input:content}/g, input_content)
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
