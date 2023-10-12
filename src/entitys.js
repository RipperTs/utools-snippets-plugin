export function getCollectionEntity(name, prefix) {
  return {
    name: name,
    prefix: prefix,
    id: new Date().getTime(),
    num: 0,
  }

}

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

export function editCollectionEntity(rawData, name, prefix, num = 0) {
  const collectionEntity = {
    name: name,
    prefix: prefix,
    id: rawData.data.id,
    num: num === 0 ? rawData.data.num : num,
  }

  return saveEntity(rawData, collectionEntity)
}

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

function saveEntity(rawData, entity) {
  return window.utools.db.put({
    _id: rawData._id,
    data: entity,
    _rev: rawData._rev
  })
}

