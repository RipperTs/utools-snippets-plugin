import dayjs from "dayjs";
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';
import placeholder_tags from "@/utils/placeholder";
import store from '@/store'
import {getConfig} from "@/utils/config";
import generatePassword from 'z-generate-password';

// 顺序执行延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 程序开始执行的剪贴板内容
let start_clipboard_content = ''

/**
 * 上屏动作
 * @param code
 */
export function snippets(code) {
  // 获取最开始的剪贴板内容, 用于后续的还原等操作
  start_clipboard_content = window.getClipboardContent()

  const snippets = window.utools.db.get(code)
  if (!snippets) {
    window.utools.hideMainWindow()
    window.utools.outPlugin()
    return false;
  }

  // 手动输入内容后上屏
  if (checkIsInputContent(snippets.data.snippet)) {
    window.utools.setExpendHeight(0)
    window.utools.setSubInput(({text}) => {
      // 监听手动输入的文本内容
      if (text.trim().length > 0) {
        store.state.sharedData = {text, snippets}
      } else {
        store.state.sharedData = {}
      }
    }, `${snippets.data.name} · 多个参数使用“${getConfig('delimiter')}”分隔 · 回车确认`)
    return true;
  }

  // 其他情况直接上屏
  autoSnippets(snippets)
}


/**
 * 执行自动上屏动作
 * @param snippets 关键字数据
 * @param input_content 手动输入的内容
 */
export async function autoSnippets(snippets, input_content = '') {
  try {
    store.state.sharedData = {}
    // 检查是否有获取划词选中内容的占位符
    let content = ''
    if (await checkIsSelectWords(snippets.data.snippet)) {
      // 需要获取划词选中内容
      window.utools.hideMainWindow()
      window.utools.simulateKeyboardTap('c', window.utools.isMacOS() ? 'command' : 'ctrl')
      await delay(parseInt(getConfig('delineate_words_delay')));
      let select_words = window.getClipboardContent()
      content = await processingContent(snippets.data.snippet, start_clipboard_content, select_words, input_content)
    } else {
      content = await processingContent(snippets.data.snippet, start_clipboard_content, '', input_content)
    }

    const paste_method = snippets.data?.paste_method || 1
    // 打开终端执行命令
    if (paste_method === 3) {
      window.utools.hideMainWindow()
      const terminal_type = snippets.data?.terminal_type || 'default'
      window.openTerminal(content, terminal_type, parseInt(getConfig('warp_activate_delay')))
      window.utools.outPlugin()
      return false;
    }

    // 获取要移动到光标的位置
    let cursor_position = await getCursorPosition(content)
    if (cursor_position > 0) {
      // 将content中的所有 {cursor} 替换为空字符串
      content = content.replace(/{cursor}/g, '')
    }

    // 粘贴文本内容
    await pasteText(snippets, content)

    if (cursor_position > 0) {
      await delay(parseInt(getConfig('cursor_movement_delay')));
      for (let i = 0; i < cursor_position; i++) {
        window.utools.simulateKeyboardTap('left')
      }
    }

    // 执行后置动作
    await postAction(snippets, start_clipboard_content)
  } catch (e) {
    window.utools.showNotification(`出现了错误: ${e}`)
    window.utools.outPlugin()
  }
}


/**
 * 粘贴文本片段动作
 * @param snippets
 * @param content
 */
async function pasteText(snippets, content) {
  const is_reduction_clipboard = snippets.data?.is_reduction_clipboard || 1
  window.utools.hideMainWindow()

  const delay_value = parseInt(getConfig('paste_clipboard_delay'))
  if (delay_value > 0) {
    await delay(delay_value);
  }

  // 仅复制文本片段内容
  if (is_reduction_clipboard === 3) {
    window.utools.copyText(content)
    return false;
  }

  const paste_method = snippets.data?.paste_method || 1

  // 使用正则表达式匹配所有特殊标记
  const tokens = content.match(/({sleep:\d+}|{enter}|{tab}|[^{]+)|({[^}]*})/g) || []

  let currentText = ''

  for (const token of tokens) {
    // 处理 sleep
    if (token.startsWith('{sleep:')) {
      if (currentText) {
        // 先输出累积的文本
        if (paste_method === 1) {
          window.utools.hideMainWindowPasteText(currentText)
        } else if (paste_method === 2) {
          window.utools.hideMainWindowTypeString(currentText)
        }
        currentText = ''
      }
      const sleepTime = parseInt(token.match(/\d+/)[0]) * 1000
      await delay(sleepTime)
      continue
    }

    // 处理 enter
    if (token === '{enter}') {
      if (currentText) {
        // 先输出累积的文本
        if (paste_method === 1) {
          window.utools.hideMainWindowPasteText(currentText)
        } else if (paste_method === 2) {
          window.utools.hideMainWindowTypeString(currentText)
        }
        currentText = ''
      }
      await delay(parseInt(getConfig('enter_key_delay')))
      window.utools.simulateKeyboardTap('enter')
      continue
    }

    // 处理 tab
    if (token === '{tab}') {
      if (currentText) {
        // 先输出累积的文本
        if (paste_method === 1) {
          window.utools.hideMainWindowPasteText(currentText)
        } else if (paste_method === 2) {
          window.utools.hideMainWindowTypeString(currentText)
        }
        currentText = ''
      }
      await delay(parseInt(getConfig('enter_key_delay')))
      window.utools.simulateKeyboardTap('tab')
      continue
    }

    // 累积普通文本
    currentText += token
  }

  // 输出最后累积的文本
  if (currentText) {
    if (paste_method === 1) {
      window.utools.hideMainWindowPasteText(currentText)
    } else if (paste_method === 2) {
      window.utools.hideMainWindowTypeString(currentText)
    }
  }

  return true;
}

/**
 * 执行后置动作
 * @param snippets
 * @param start_clipboard_content
 */
async function postAction(snippets, start_clipboard_content) {
  try {
    const is_reduction_clipboard = snippets.data?.is_reduction_clipboard || 1
    const is_enter = snippets.data?.is_enter || 2

    if (is_enter === 1) {
      await delay(parseInt(getConfig('enter_key_delay')));
      window.utools.simulateKeyboardTap('enter')
    }

    if (is_reduction_clipboard === 1) {
      await delay(parseInt(getConfig('reduction_clipboard_delay')));
      window.utools.copyText(start_clipboard_content)
    }
  } catch (e) {
    window.utools.showNotification(`出现了错误: ${e}`)
  } finally {
    window.utools.outPlugin()
  }

}

/**
 * 处理内容(主要替换占位符)
 * @param content
 * @param start_clipboard_content
 * @param select_words
 * @param input_content
 * @returns {*}
 */
async function processingContent(content, start_clipboard_content, select_words = '', input_content = '') {
  try {
    const now = dayjs();
    const replacements = [
      {pattern: /{datetime}/g, replacement: now.format('YYYY年MM月DD日 HH:mm:ss')},
      {pattern: /{date}/g, replacement: now.format('YYYY年MM月DD日')},
      {pattern: /{time}/g, replacement: now.format('HH:mm:ss')},
      {pattern: /{timestamp}/g, replacement: now.unix()},
      {pattern: /{isodate:(.*?)}/g, replacement: (match, format) => now.format(format)},
      {pattern: /{clipboard}/g, replacement: start_clipboard_content},
      {pattern: /{clipboard:lowercase}/g, replacement: _.toLower(start_clipboard_content)},
      {pattern: /{clipboard:uppercase}/g, replacement: _.toUpper(start_clipboard_content)},
      {pattern: /{clipboard:camelcase}/g, replacement: _.camelCase(start_clipboard_content)},
      {pattern: /{clipboard:snakecase}/g, replacement: _.snakeCase(start_clipboard_content)},
      {pattern: /{clipboard:trim}/g, replacement: start_clipboard_content.trim()},
      {
        pattern: /{clipboard:trim:(.*?)}/g,
        replacement: (match, trim) => _.trim(start_clipboard_content, trim)
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
      {pattern: /{ip:(\d+)}/g, replacement: (match, num) => window.getIPAddress(num)},
      {pattern: /{clipboard:file:(\d+)}/g, replacement: (match, num) => getClipboardFiles(num)},
      {
        pattern: /{clipboard:wslfile:(\d+)}/g,
        replacement: (match, num) => getClipboardFilesToWsl(num)
      },
      {pattern: /{clipboard:number}/g, replacement: () => toNumber(start_clipboard_content)},
      {
        pattern: /{timeoffset:add:(\d+):(.*?):(.*?)}/g,
        replacement: (match, num, type, format) => now.add(num, type).format(format)
      },
      {
        pattern: /{timeoffset:subtract:(\d+):(.*?):(.*?)}/g,
        replacement: (match, num, type, format) => now.subtract(num, type).format(format)
      },
      {
        pattern: /{password:(\d+)}/g, replacement: (match, num) => { // 生成随机数字密码
          return generatePassword({
            length: num
          });
        }
      }
    ];

    // 检查是否含有多参数的占位符
    let multiple_parameters_pattern = /{input:content:(\d+)}/g
    if (multiple_parameters_pattern.test(content)) {
      let input_content_list = input_content.split(getConfig('delimiter'))
      if (input_content_list.length > 1) {
        for (let i = 1; i <= input_content_list.length; i++) {
          replacements.push({
            pattern: new RegExp(`{input:content:${i}}`, 'g'),
            replacement: input_content_list[i - 1]
          })
        }
      } else {
        replacements.push({pattern: /{input:content}/g, replacement: input_content})
      }
    } else {
      replacements.push({pattern: /{input:content}/g, replacement: input_content})
    }

    let processedContent = content;
    for (const item of replacements) {
      processedContent = processedContent.replace(item.pattern, item.replacement);
    }

    processedContent = processedContent.replace(/{input:content:(.*?)}/g, '')
    return processedContent;
  } catch (e) {
    return `出现了错误: ${e}`;
  }

}

/**
 * 获取要移动到光标的位置
 * @param content
 * @returns {number}
 */
async function getCursorPosition(content) {
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
  const index_more = content.indexOf('{input:content:')
  if (index === -1 && index_more === -1) {
    return false;
  }
  return true;
}

/**
 * 检查是否需要获取划词选中内容
 * @param content
 * @returns {boolean}
 */
async function checkIsSelectWords(content) {
  let isSelectWords = false
  for (const item of placeholder_tags) {
    if (item.label === '划词选中') {
      for (const i of item.value) {
        if (content.indexOf(i.value) !== -1) {
          isSelectWords = true;
        }
      }
    }
  }
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

function convertToWslPath(windowsPath) {
  try { // 将反斜杠替换为正斜杠
    let wslPath = windowsPath.replace(/\\/g, '/');
    // 去除驱动器号和冒号
    wslPath = wslPath.replace(/^[A-Za-z]:/, '');
    // 在路径前面添加"/mnt/"和小写的驱动器号
    const driveLetter = windowsPath.charAt(0).toLowerCase();
    wslPath = `/mnt/${driveLetter}${wslPath}`;
    return wslPath;
  } catch (e) {
    return "";
  }
}

function getClipboardFilesToWsl(num = 0) {
  if (!window.utools.isWindows()) {
    return ""
  }
  try {
    const files = window.utools.getCopyedFiles();
    if (!files || files.length === 0) {
      return "";
    }
    return convertToWslPath(files[num].path);
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
