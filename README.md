# 超级文本片段 (`uTools` 插件)
> 原名称: `Automatic snippets`, 旨在帮助您随时随地地使用最有用的文本（代码）片段。在任意位置键入关键字，即可将对应的文本片段内容插入到指定位置。

如果您在 Mac 平台上使用过 Alfred 中的 Snippets 功能，那么您会发现这个插件的用法与其相似。  
借助 uTools 的跨平台特性，现在还可以在 Windows 和 Linux 上使用这个功能了，同时功能也更加丰富。  

希望此插件能够帮助您提高工作效率，如果您在使用过程中遇到任何问题，欢迎提 issue 或者 PR。    


**更详细的介绍和教程可以查看: [项目文档](https://github.com/RipperTs/utools-snippets-plugin/wiki)**  

## 功能
- [x] 允许设置每一个片段状态、后置动作、多个关键字等。
- [x] 文本片段支持多种动态占位符，主要类型有（日期时间、剪贴板、随机数、划词选中、光标位置、手动输入内容），所有占位符请查看插件截图。
- [x] uTools 会员支持自动同步数据到其他设备。
- [x] 支持全量数据的导入和导出。

## 特别说明
- 如果您需要关闭全部的关键词指令，直接完全退出此插件即可。
- 【注意】 请不要设置此插件为：“退出到后台立即结束运行”，否则将会出现上述情况。
- 【注意】 请不要设置此插件【独立窗口】运行，否则将无法正常使用。
- 如果您是 uTools 会员，插件数据可以自动同步到 uTools 官方，除此之外插件本身不会上报任何数据。

## 常见问题
- 手动切换了 uTools 的外观颜色但是插件没有改变，请完全结束运行插件后再次打开即可！
- Xshell软件可能无法正常使用？在文本片段中的 “粘贴选项” 设置为 【键盘输入】 ！

## 如何开发
你需要使用 `Utools开发者工具` 插件来调试此插件，具体步骤如下：
- 安装依赖：`npm install`
- 开发调试：`npm run dev`
- 引入插件：`Utools开发者工具` -> `开发` -> 选择 `data/plugin.json` 文件 -> `开启运行`
