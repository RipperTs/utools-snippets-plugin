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
 * @param form_data
 * @returns {{collection_id, snippet: (string|*), is_enter: (boolean|*), is_reduction_clipboard: (number|*), name, id: number, keyword, status: number}}
 */
export function getSnippetsEntity(collection_id, form_data) {
  return {
    collection_id: collection_id,
    name: form_data.name,
    keyword: form_data.keyword,
    snippet: form_data.snippet,
    id: new Date().getTime(),
    status: 1,
    is_reduction_clipboard: form_data.is_reduction_clipboard, // 是否还原粘贴板内容,1:还原,2:不还原 ,默认还原
    is_enter: form_data.is_enter ? 1 : 2, // 是否回车执行,1:回车执行,2:不回车执行 ,默认回车执行
  }
}


/**
 * 改变文本片段状态
 * @param rawData
 * @param status
 * @returns {DbReturn}
 */
export function changeSnippetsStatus(rawData, status = 1) {
  const snippetsEntity = {
    collection_id: rawData.data.collection_id,
    name: rawData.data.name,
    keyword: rawData.data.keyword,
    snippet: rawData.data.snippet,
    id: rawData.data.id,
    status: status,
    is_reduction_clipboard: rawData.data?.is_reduction_clipboard || 1,
    is_enter: rawData.data?.is_enter || 2,
  }

  return saveEntity(rawData, snippetsEntity)
}

/**
 * 修改文本片段实体
 * @param rawData
 * @param formData
 * @returns {DbReturn}
 */
export function editSnippetsEntity(rawData, formData) {
  const snippetsEntity = {
    collection_id: rawData.data.collection_id,
    name: formData.name,
    keyword: formData.keyword,
    snippet: formData.snippet,
    id: rawData.data.id,
    status: rawData.data.status,
    is_reduction_clipboard: formData.is_reduction_clipboard,
    is_enter: formData.is_enter ? 1 : 2,
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

