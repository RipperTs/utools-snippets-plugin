export function checkCmdIsExist(current_cmd) {
  const features = window.utools.getFeatures()
  for (let i = 0; i < features.length; i++) {
    let cmd = features[i].cmds[0]
    if (cmd === current_cmd) {
      return true
    }
  }
  return false
}
