import {collection_prefix} from "@/utils";

/**
 * 获取所有集合列表数据
 */
export function getAllCollectionList() {
  const collection_list = window.utools.db.allDocs(collection_prefix)
  if (!collection_list || collection_list.length === 0) {
    return []
  }
  return collection_list.map((doc, index) => {
    doc.data.sort = doc.data.sort || (index + 1);
    return doc;
  })
    .sort((a, b) => a.data.sort - b.data.sort);
}

/**
 * 获取所有集合数量
 * @returns {number}
 */
export function getAllCollectionCount() {
  const collection_list = window.utools.db.allDocs(collection_prefix)
  if (!collection_list || collection_list.length === 0) {
    return 0
  }
  return collection_list.length
}

/**
 * 重排序集合列表
 * @param collection_list
 * @returns {*}
 */
export function reorderCollection(collection_list) {
  const reorderCollection = []
  // 重排序
  collection_list.map((doc, index) => {
    doc.data.sort = (index + 1);
    reorderCollection.push(doc)
  });
  return reorderCollection;
}

