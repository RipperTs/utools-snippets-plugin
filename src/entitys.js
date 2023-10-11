export function getCollectionEntity(name, prefix, num = 0) {
  var timestamp = new Date().getTime();
  return {
    name: name,
    prefix: prefix,
    id: timestamp,
    num: num,
  }

}

