import Vue from "vue";
import App from "./App.vue";
import 'mavon-editor/dist/css/index.css'
import Vant from "./vant.js";
import router from './router';
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import './style.css';
import "./assets/css/tailwindcss.css"
import './assets/icons' // icon
import ElementUI from 'element-ui';
import {snippets} from "@/utils/snippets";
import {callback, selectCallback} from "@/utils/mainPush";
import {addSnippet} from "@/utils/fastAddSnippets";

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.use(ElementUI, {size: 'small'});


if (window.utools) {
  window.utools.onPluginEnter(({code, type, payload, option}) => {

    window.utools.onPluginDetach(() => {
      store.state.detach_window = true
    })

    if (window.utools.isDarkColors()) {
      // 加载深色模式样式
      import('./assets/css/dark-theme.css')
    }

    if (code === 'search') {
      window.utools.showMainWindow()
      // 判断是否超级面板进来的
      if (option === undefined) {
        window.utools.setSubInput(({text}) => {
          store.state.inputContent = text
        }, store.state.utoolsInputPlaceholder)
        store.state.inputContent = payload
        window.utools.setSubInputValue(payload)
        window.utools.subInputSelect()
        return
      }

      window.utools.removeSubInput()
      const code = store.state.mainPushParams?.code || ''
      if (code) {
        snippets(code)
        store.state.mainPushParams = {}
      }
      return
    }

    if (code === "add") {
      addSnippet(type, payload)
      return;
    }

    if (code !== 'snippets') {
      window.utools.removeSubInput()
      snippets(code)
    } else {
      window.utools.setSubInput(({text}) => {
        store.state.inputContent = text
      }, store.state.utoolsInputPlaceholder)
    }

  });

  // 主面板推送消息
  window.utools.onMainPush(callback, selectCallback)

  window.utools.onPluginDetach(() => {
    Vue.prototype.$pluginDetach = true
  })

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');

}
