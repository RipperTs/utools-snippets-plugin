export function getCollectionEntity(name, prefix, num = 0) {
  var timestamp = new Date().getTime();
  return {
    name: name,
    prefix: prefix,
    id: timestamp,
    num: num,
  }

}

export function getSnippetsEntity(collection_id, name, keyword, snippet) {
  var timestamp = new Date().getTime();
  return {
    collection_id: collection_id,
    name: name,
    keyword: keyword,
    snippet: snippet,
    id: timestamp,
    status: 1,
  }
}

