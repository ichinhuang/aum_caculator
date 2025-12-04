import Vue from 'vue'
import VueRouter from 'vue-router'
import AUMView from '../views/HomeView.vue'
import YYYView from "@/views/YYYView.vue";
import YYYQTCKView from "@/views/YYYQTCKView.vue";
import YYYDQCKView from "@/views/YYYDQCKView.vue";
import NewYYYView from "@/views/NewYYYView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: NewYYYView
  },
  {
    path: '/c/newyyy',
    name: 'newyyy',
    component: NewYYYView
  },
  {
    path: '/c/aum',
    name: 'aum',
    component: AUMView
  },
  {
    path: '/c/yyy',
    name: 'yyy',
    component: YYYView
  },
  {
    path: '/c/yyyqtck',
    name: 'yyyqtck',
    component: YYYQTCKView
  },
  {
    path: '/c/yyydqck',
    name: 'yyydqck',
    component: YYYDQCKView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
