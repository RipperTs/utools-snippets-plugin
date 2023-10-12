/**
 * 创建分组实体
 * @param name
 * @param prefix
 * @returns {{prefix, num: number, name, id: number}}
 */
export function getCollectionEntity(name, prefix) {
  return {
    name: name,
    prefix: prefix,
    id: new Date().getTime(),
    num: 0,
  }

}

/**
 * 修改分组实体
 * @param rawData
 * @param name
 * @param prefix
 * @param num
 * @returns {DbReturn}
 */
export function editCollectionEntity(rawData, name, prefix, num = 0) {
  const collectionEntity = {
    name: name,
    prefix: prefix,
    id: rawData.data.id,
    num: num === 0 ? rawData.data.num : num,
  }

  return saveEntity(rawData, collectionEntity)
}


/**
 * 改变分组中文本片段数量
 * @param rawData
 * @param type
 * @param num
 * @returns {DbReturn}
 */
export function changeCollectionNum(rawData, type = 1, num = 1) {
  let set_num = type === 1 ? rawData.data.num + num : rawData.data.num - num
  const collectionEntity = {
    name: rawData.data.name,
    prefix: rawData.data.prefix,
    id: rawData.data.id,
    num: set_num,
  }

  return saveEntity(rawData, collectionEntity)
}


/**
 * 创建文本片段实体
 * @param collection_id
 * @param name
 * @param keyword
 * @param snippet
 * @returns {{collection_id, snippet, name, id: number, keyword, status: number}}
 */
export function getSnippetsEntity(collection_id, name, keyword, snippet) {
  return {
    collection_id: collection_id,
    name: name,
    keyword: keyword,
    snippet: snippet,
    id: new Date().getTime(),
    status: 1,
  }
}


export function changeSnippetsStatus(rawData, status = 1) {
  const snippetsEntity = {
    collection_id: rawData.data.collection_id,
    name: rawData.data.name,
    keyword: rawData.data.keyword,
    snippet: rawData.data.snippet,
    id: rawData.data.id,
    status: status,
  }

  return saveEntity(rawData, snippetsEntity)
}

/**
 * 保存实体数据
 * @param rawData
 * @param entity
 * @returns {DbReturn}
 */
function saveEntity(rawData, entity) {
  return window.utools.db.put({
    _id: rawData._id,
    data: entity,
    _rev: rawData._rev
  })
}

