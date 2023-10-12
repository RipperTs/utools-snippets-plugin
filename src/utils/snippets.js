function snippets(code) {
  const snippets = window.utools.db.get(code)
  if (snippets) {
    window.utools.hideMainWindowTypeString(snippets.data.snippet)
    window.utools.outPlugin()
  } else {
    window.utools.showNotification('未找到该关键字')
    window.utools.hideMainWindow()
    window.utools.outPlugin()
  }

}

export default snippets;
