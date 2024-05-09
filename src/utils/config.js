const initConfig = {
  delimiter: ',',
  delineate_words_delay: 100,
  cursor_movement_delay: 20,
  enter_key_delay: 20,
  reduction_clipboard_delay: 100,
  paste_clipboard_delay: 20, // 粘贴(上屏)内容延迟
}

const configKey = "config"

// 重置全局配置数据
export function restartData() {
  window.utools.dbStorage.setItem(configKey, initConfig)
  return initConfig
}

// 获取当前全部配置数据
export function getAllConfig() {
  const cacheData = window.utools.dbStorage.getItem(configKey)
  if (cacheData) {
    // 检查是否有新增的配置项
    const newConfig = Object.assign({}, initConfig)
    const keys = Object.keys(newConfig)
    for (let i = 0; i < keys.length; i++) {
      if (!cacheData[keys[i]] && cacheData[keys[i]] !== 0) {
        cacheData[keys[i]] = newConfig[keys[i]]
      }
    }
    return cacheData
  }

  return initConfig
}

// 获取指定配置数据
export function getConfig(key) {
  return getAllConfig()[key]
}

export function saveConfig(data) {
  window.utools.dbStorage.setItem(configKey, data)
}
