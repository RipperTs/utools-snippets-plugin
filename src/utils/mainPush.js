import {snippets} from "@/utils/snippets";
import {snippet_prefix} from "@/utils/index";
import _ from "lodash";
import store from "@/store";

export function callback({code, type, payload}) {
  // 搜索文本片段
  if (code === 'search') {
    // 获取所有的文本片段列表
    const snippet_list = window.utools.db.allDocs(snippet_prefix)
    if (snippet_list.length === 0) {
      return [];
    }

    let search_snippet = []
    for (let i = 0; i < snippet_list.length; i++) {
      let item = snippet_list[i]
      if ((_.toLower(item.data.snippet).indexOf(_.toLower(payload)) !== -1) ||
        (_.toLower(item.data.keyword).indexOf(_.toLower(payload)) !== -1) ||
        (_.toLower(item.data.name).indexOf(_.toLower(payload)) !== -1)) {
        search_snippet.push({
          title: item.data.keyword,
          text: item.data.name,
          snippets: item.data,
          code: item._id
        })
      }
    }

    return search_snippet
  }

  // 单文本片段匹配显示注释内容
  const snippets = window.utools.db.get(code)
  if (!snippets) {
    return []
  }

  return [
    {
      title: snippets.data.keyword,
      text: snippets.data.name,
      snippets: snippets.data
    }
  ]
}


export function selectCallback({code, type, payload, option}) {
  if (code === 'search') {
    store.state.mainPushParams = option
  } else {
    snippets(code)
  }
  return true
}
