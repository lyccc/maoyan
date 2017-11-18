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
      component: BodyWrapper
    },
    {
      path: '/Filmdetails',
      name: 'FilmDetails',
      component: FilmDetails
    },
    {
      path: '/CinemaDetails',
      name: 'CinemaDetails',
      component: CinemaDetails
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
