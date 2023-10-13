export const collection_prefix = 'collection'
export const snippet_prefix = 'snippet'

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
