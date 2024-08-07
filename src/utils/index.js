export const collection_prefix = 'collection'
export const snippet_prefix = 'snippet'
import md5 from 'js-md5';

export function checkCmdIsExist(current_cmd) {
  const features = window.utools.getFeatures()
  for (let i = 0; i < features.length; i++) {
    let cmd = features[i].cmds[0]
    if (cmd === current_cmd) {
      return true
    }
  }
  return false
}

/**
 * 检查关键字是否已经存在
 * @param keyword
 * @returns {boolean}
 */
export function checkKeywordIsExist(keyword) {
  const all_docs = window.utools.db.allDocs(snippet_prefix)
  all_docs.map((doc) => {
    if (doc.data.keyword === keyword) {
      return true
    }
  })
  return false
}

/**
 * 随机字符串
 * @param len
 * @returns {string}
 */
export function randomString(len) {
  len = len || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = $chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

/**
 * 生成版本号
 * @returns {string}
 */
export function generateRev(prefix = 1) {
  return `${prefix}-${md5(new Date().getTime() + randomString(32))}`
}
