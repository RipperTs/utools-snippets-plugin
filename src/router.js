import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
var routes = [
  {path: '/', component: ()=> import(/* webpackChunkName: "home" */ "@/views/home.vue")  },
  {path: '/more', component: ()=> import(/* webpackChunkName: "about" */ "@/views/more.vue") },

];

const router = new VueRouter({
  mode: 'hash',
  routes
})
export default router

