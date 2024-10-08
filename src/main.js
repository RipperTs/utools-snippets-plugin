import Vue from "vue";
import App from "./App.vue";
import axios from 'axios'
import 'mavon-editor/dist/css/index.css'
import Vant from "./vant.js";
import router from './router';
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import './style.css';
import "./assets/css/tailwindcss.css"
import './assets/icons' // icon
import ElementUI from 'element-ui';
import dayjs from 'dayjs'
import {snippets} from "@/utils/snippets";
import {callback, selectCallback} from "@/utils/mainPush";

Vue.config.productionTip = false;

Vue.prototype.$http = axios

Vue.use(Vant);
Vue.use(ElementUI, {size: 'small'});

Vue.prototype.$dayjs = dayjs;

if (window.utools) {
  window.utools.onPluginEnter(({code, type, payload}) => {

    window.utools.onPluginDetach(() => {
      store.state.detach_window = true
    })

    if (window.utools.isDarkColors()) {
      // 加载深色模式样式
      import('./assets/css/dark-theme.css')
    }

    Vue.prototype.$pluginCode = code
    Vue.prototype.$pluginType = type
    Vue.prototype.$pluginPayload = payload

    if (code === 'search') {
      window.utools.showMainWindow()
      window.utools.removeSubInput()
      const code = store.state.mainPushParams?.code || ''
      if (code) {
        snippets(code)
        store.state.mainPushParams = {}
      }
      return
    }

    if (code !== 'snippets') {
      window.utools.removeSubInput()
      snippets(code)
    } else {
      window.utools.setSubInput(({text}) => {
        store.state.inputContent = text
      }, '输入搜索关键字进行模糊搜索文本片段')
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
