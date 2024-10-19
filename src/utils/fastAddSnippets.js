import {Message} from 'element-ui';
import {getConfig} from "@/utils/config";
import store from '@/store'

// 顺序执行延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 快速添加文本片段
 * @param type
 * @param payload
 * @returns {boolean}
 */
export async function addSnippet(type, payload = "") {
  let snippet = payload;
  // 重置数据
  initStoreData();

  if ("添加文本片段" === snippet.trim()) {
    snippet = "";
  }

  if (snippet.trim().length === 0) {
    snippet = await delineateWords();
  }

  if (snippet.trim().length === 0) {
    actionMessage("未找到要添加的文本片段内容");
    return false;
  }

  store.state.fastAddSnippets = {
    show: true,
    snippetContent: snippet
  }
  window.utools.showMainWindow();

}


/**
 * 划词获取文本片段
 * @returns {*}
 */
async function delineateWords() {
  window.utools.hideMainWindow();
  window.utools.simulateKeyboardTap('c', window.utools.isMacOS() ? 'command' : 'ctrl')
  await delay(parseInt(getConfig('delineate_words_delay')));
  return window.getClipboardContent()
}


/**
 * 操作消息提示
 * @param message
 */
function actionMessage(message) {
  window.utools.showMainWindow();
  Message({
    message: message,
    type: 'warning'
  });
}

/**
 * 重置数据
 */
function initStoreData() {
  store.state.fastAddSnippets = {
    show: false,
    snippetContent: ''
  }
}
