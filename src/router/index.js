import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import BodyWrapper from '@/components/BodyWrapper'
import FilmDetails from '@/components/FilmDetails'
import CinemaDetails from '@/components/CinemaDetails'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BodyWrapper',
      component: BodyWrapper,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'Filmdetails',
          name: 'FilmDetails',
          component: FilmDetails
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'CinemaDetails',
          name: 'CinemaDetails',
          component: CinemaDetails
        }
      ]
    },
    // {
    //   path: '/Filmdetails',
    //   name: 'FilmDetails',
    //   component: FilmDetails
    // },
    // {
    //   path: '/CinemaDetails',
    //   name: 'CinemaDetails',
    //   component: CinemaDetails
    // },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
