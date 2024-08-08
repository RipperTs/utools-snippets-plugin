import {snippet_prefix} from "@/utils";

/**
 * 获取全部文本片段列表
 * @returns {DbDoc[]|*[]}
 */
export function getAllSnippetList() {
  const snippet_list = window.utools.db.allDocs(snippet_prefix)
  if (!snippet_list || snippet_list.length === 0) {
    return []
  }
  return snippet_list.map((doc, index) => {
    doc.data.sort = doc.data.sort || (index + 1);
    return doc;
  })
    .sort((a, b) => a.data.sort - b.data.sort);
}


/**
 * 通过集合ID获取文本片段
 * @param collection_id
 * @returns {number}
 */
export function getSnippetListCountByCollectionId(collection_id) {
  const snippet_list = window.utools.db.allDocs(`${snippet_prefix}/${collection_id}`)
  if (!snippet_list || snippet_list.length === 0) {
    return 0
  }
  return snippet_list.length
}

/**
 * 通过集合ID获取文本片段列表
 * @param collection_id
 * @returns {DbDoc[]|*[]}
 */
export function getSnippetListByCollectionId(collection_id) {
  const snippet_list = window.utools.db.allDocs(`${snippet_prefix}/${collection_id}`)
  if (!snippet_list || snippet_list.length === 0) {
    return []
  }
  return snippet_list.map((doc, index) => {
    doc.data.sort = doc.data.sort || (index + 1);
    return doc;
  })
    .sort((a, b) => a.data.sort - b.data.sort);
}

/**
 * 重新排序文本片段
 * @param snippet_list
 * @returns {*[]}
 */
export function reorderSnippet(snippet_list) {
  const reorderSnippet = []
  // 重排序
  snippet_list.map((doc, index) => {
    doc.data.sort = (index + 1);
    reorderSnippet.push(doc)
  });
  return reorderSnippet;
}
