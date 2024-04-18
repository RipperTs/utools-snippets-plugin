const initConfig = {
  delimiter: ',',
  delineate_words_delay: 100,
  cursor_movement_delay: 20,
  enter_key_delay: 20,
  reduction_clipboard_delay: 100,
}

const configKey = "config"

// 重置全局配置数据
export function restartData() {
  window.utools.dbStorage.setItem(configKey, initConfig)
  return initConfig
}

// 获取当前全部配置数据
export function getAllConfig() {
  return window.utools.dbStorage.getItem(configKey) || initConfig
}

// 获取指定配置数据
export function getConfig(key) {
  return getAllConfig()[key]
}

export function saveConfig(data) {
  window.utools.dbStorage.setItem(configKey, data)
}
