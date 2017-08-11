import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.px.css';
import LoginAndRegister from '@/components/LoginAndRegister'
import index from '@/components/index'
import Mall from '@/components/Mall'
import person from '@/components/person'
import personalData from '@/components/personalData'
import personalDataChange from '@/components/personalDataChange'
import Collection from '@/components/Collection'
import Detail from '@/components/Detail'
import Order from '@/components/Order'
import shopCar from '@/components/shopCar'

Vue.use(Router)
Vue.use(Resource)
Vue.use(YDUI)

export default new Router({
  routes: [
    {
      path:'/',
      name : 'LoginAndRegister',
      component: LoginAndRegister
    },
    {
      path:'/index',
      name : 'index',
      component: index
    },
    {
      path:'/Mall',
      name : 'Mall',
      component: Mall
    },
    {
      path:'/person',
      name : 'person',
      component: person
    },
    {
      path:'/personalData',
      name : 'personalData',
      component: personalData
    },
    {
      path:'/personalDataChange',
      name : 'personalDataChange',
      component: personalDataChange
    },
    {
      path:'/Collection',
      name : 'Collection',
      component: Collection
    },
    {
      path:'/Detail',
      name : 'Detail',
      component: Detail
    },
    {
      path:'/Order',
      name : 'Order',
      component: Order
    },
    {
      path:'/shopCar',
      name : 'shopCar',
      component: shopCar
    }
  ]
})
