import {snippet_prefix} from "@/utils";
import {getAllCollectionCount} from "@/db/collection";
import {getSnippetListCountByCollectionId} from "@/db/snippet";

/**
 * 创建分组实体
 * @param name
 * @param prefix
 * @returns {{prefix, num: number, name, id: number}}
 */
export function getCollectionEntity(name, prefix) {
  const sort = getAllCollectionCount() + 1
  return {
    name: name,
    prefix: prefix,
    id: new Date().getTime(),
    num: 0,
    sort: sort
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
 * @param sort
 * @returns {DbReturn}
 */
export function changeCollectionNum(rawData, type = 1, num = 1, sort = 100) {
  let set_num = type === 1 ? rawData.data.num + num : rawData.data.num - num
  const collectionEntity = {
    name: rawData.data.name,
    prefix: rawData.data.prefix,
    id: rawData.data.id,
    num: set_num,
    sort: rawData.data?.sort || sort
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
  const sort = getSnippetListCountByCollectionId(collection_id) + 1
  return {
    collection_id: collection_id,
    name: form_data.name,
    keyword: form_data.keyword,
    snippet: form_data.snippet,
    id: new Date().getTime(),
    status: 1,
    is_reduction_clipboard: form_data.is_reduction_clipboard, // 是否还原粘贴板内容,1:还原,2:不还原 ,默认还原
    is_enter: form_data.is_enter ? 1 : 2, // 是否回车执行,1:回车执行,2:不回车执行 ,默认回车执行
    paste_method: form_data.paste_method, // 粘贴方式,1:模拟快捷键,2:键盘输入
    sort: sort
  }
}


/**
 * 改变文本片段状态
 * @param rawData
 * @param status
 * @param sort
 * @returns {DbReturn}
 */
export function changeSnippetsStatus(rawData, status = 1, sort = 100) {
  const snippetsEntity = {
    collection_id: rawData.data.collection_id,
    name: rawData.data.name,
    keyword: rawData.data.keyword,
    snippet: rawData.data.snippet,
    id: rawData.data.id,
    status: status,
    is_reduction_clipboard: rawData.data?.is_reduction_clipboard || 1,
    is_enter: rawData.data?.is_enter || 2,
    paste_method: rawData.data?.paste_method || 1,
    sort: rawData.data?.sort || sort
  }

  return saveEntity(rawData, snippetsEntity)
}

/**
 * 修改文本片段实体
 * @param rawData
 * @param formData
 * @param collection_id
 * @returns {DbReturn}
 */
export function editSnippetsEntity(collection_id, rawData, formData) {
  const snippetsEntity = {
    collection_id: collection_id,
    name: formData.name,
    keyword: formData.keyword,
    snippet: formData.snippet,
    id: rawData.data.id,
    status: rawData.data.status,
    is_reduction_clipboard: formData.is_reduction_clipboard,
    is_enter: formData.is_enter ? 1 : 2,
    paste_method: formData.paste_method,
    sort: formData.sort
  }

  let result = window.utools.db.remove(rawData)
  if (result.ok) {
    return window.utools.db.put({
      _id: `${snippet_prefix}/${collection_id}/${rawData.data.id}`,
      data: snippetsEntity
    })
  }
  return result;

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

