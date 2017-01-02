import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../app'
import Index from '../page/index'
import Home from '../page/home'
import Article from '../page/article'
import HomeUserInfo from '../page/homeUserInfo'
import AddMsg from '../page/addMsg'
import SearchResult from '../page/resultList'
import Login from '../page/login'
import Register from '../page/register'
import Modifi from '../page/modifiPsw'
import Admin from '../page/admin'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {path: '/index/:type', name: 'index', component: Index},
      {path: '/home', name: 'home', component: Home,
        beforeEnter: (to,from,next)=>{
          //登陆验证
          if(localStorage.getItem('userMsg')){
            next()
          } else {
            next({ path: '/login' })
          }
      }},
      {path: '/HomeUserInfo', name: 'homeUserInfo', component: HomeUserInfo},
      {path: '/article/:id', name: 'article', component: Article},//分享内容详情页
      {path: '/addmsg', name: 'addMsg', component: AddMsg},//新增分享
      {path: '/search/:type', name: 'searchresult', component: SearchResult},//搜索分享内容
      {path: '/login', name: 'login', component: Login},//登陆
      {path: '/register', name: 'register', component: Register},//注册
      {path: '/modif', name: 'Modifi', component: Modifi},
      {path: '/admin', name: 'Admin', component: Admin},
    ]
  }
]
const router = new VueRouter({
  routes: routes, // short for routes: routes
  linkActiveClass: 'active',  // router-link的选中状态的class，也有一个默认的值
  history: true
})

export default router
