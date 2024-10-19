import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sharedData: {},
    inputContent: '',
    detach_window: false,
    mainPushParams: {},
    fastAddSnippets: {
      show: false,
      snippetContent: ''
    },
  }
})
