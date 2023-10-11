function snippets(code) {
  console.log('snippets', code)
  window.utools.hideMainWindowTypeString(`uTools 的插件应用开发给予了开发者最大的自由度，你可以随心所欲的设计页面结构、样式、交互，对于特别擅长前端开发的同学，这没有什么问题，但对于非前端开发者，要做出漂亮的、高质量的前端 UI 是一件困难的事情。

我们发现在 uTools 使用环境中，很多插件应用的场景都有其共性，所以我们抽象出一套体验统一、高质量、高性能的通用模版，如果你想开发的插件应用场景适合使用此模版，那么你只需提供数据并提供一些回调函数即可。`)

  window.utools.outPlugin()

}

export default snippets;
