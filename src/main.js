import Vue from "vue";
import App from "./App.vue";
import axios from 'axios'
import 'mavon-editor/dist/css/index.css'
import {UTools} from "./utils/utools.js";
import Vant from "./vant.js";
import router from './router';
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import './style.css';
import "./assets/css/tailwindcss.css"
import './assets/icons' // icon
import ElementUI from 'element-ui';
import dayjs from 'dayjs'
import snippets from "@/utils/snippets";

if (process.env.NODE_ENV !== "production") {
  window.utools = window.utools || UTools;
}

Vue.config.productionTip = false;

Vue.prototype.$http = axios

Vue.use(Vant);
Vue.use(ElementUI, {size: 'small'});

Vue.prototype.utools = window.utools;
Vue.prototype.$dayjs = dayjs;

window.utools.onPluginEnter(({code, type, payload}) => {

  console.log('用户进入插件应用', `code:${code}`, `type:${type}`, `关键字:${payload}`)

  console.log(parseInt(window.utools.getAppVersion()))

  if (window.utools.isDarkColors()) {
    // 加载深色模式样式
    import('./assets/css/dark-theme.css')
  }

  Vue.prototype.$pluginCode = code
  Vue.prototype.$pluginType = type
  Vue.prototype.$pluginPayload = payload

  if (window.utools.db.replicateStateFromCloud()) {
    window.utools.showNotification('数据可能不完整，还在从云端复制中')
  }

  if (code !== 'snippets') snippets(code)

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');

});

window.utools.onPluginDetach(() => {
  console.log('分离插件')
  Vue.prototype.$pluginDetach = true
})
