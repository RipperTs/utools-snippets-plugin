// 该文件由gen-router.js自动生成，请勿手动修改
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
var routes = [
  {path: '/', component: ()=> import(/* webpackChunkName: "home" */ "@/views/home.vue")  },

];

const router = new VueRouter({
  mode: 'hash',
  routes
})
export default router

