import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import PageHeader from '@/header'

import Hello from '@/components/Hello'
import About from '@/components/About'

import ComponentSlot from '@/components/demo-component/slot'
import ComponentAction from '@/components/demo-component/action'
import ComponentMeta from '@/components/demo-component/meta-menu'
import Component2Ways from '@/components/demo-component/two-way'
import ComponentTravel from '@/components/demo-component/data-travel-between-2-child-by-bus'

import TransationSudoku from '@/components/transation/transation-sudoku'
import ChoiceTransation from '@/components/transation/choice-transation'
import Filter from '@/components/filter-mixin'

import WatcherYesNo from '@/components/yes-no-wtf/watcher-yesno.wtf'
import ComputedYesNo from '@/components/yes-no-wtf/computed-yesno.wtf'
import ClickYesNo from '@/components/yes-no-wtf/click-yesno.wtf'

import FormOrderPage from '@/components/order/form-order-page'

import LoginPage from '@/components/login/login-page'
import RegistPage from '@/components/login/regist-page'

import MixVuex from '@/components/vuex-demo/mix-getters-mutations-actions.vue'

import * as CONST from '@/components/util/const.js'
import { homedir } from 'os';

const User = {
  template: `
    <div class="user">
      <router-view></router-view>
      <h2>User {{ $route.params.id }}</h2>
    </div>
  `
}
const UserHome = { template: '<h1>Home</h1>' }
const UserProfile = { template: '<h1>Profile</h1>' }
const UserPosts = { template: '<h1>Posts</h1>' }

var router = new Router({
  mode: 'history',
  routes: [
    // { path: '/', name: 'Hello', components: { default: Hello, 'header-layout': PageHeader } },
    { path: '/', name: 'Hello', component: Hello },
    { path: '/about', component: About },
    { path: '/filter', component: Filter },

    { path: '/transation', component: {template: '<div><h1 class="mb-5">Transation</h1><router-view/></div>'},
      children: [
        { path: 'sudoku', component: TransationSudoku },
        { path: 'choice-transation', component: ChoiceTransation },
      ]
    },

    {
      path: '/component',
      component: {template: '<div><h1 class="mb-5">Component</h1><router-view/></div>'},
      children: [
        { path: 'component0', component: ComponentSlot },
        { path: 'component1', component: ComponentAction },
        { path: 'component2', component: ComponentMeta },
        { path: 'component3', component: Component2Ways },
        { path: 'component4', component: ComponentTravel }
      ]
    },

    {
      path: '/yesnowtf',
      component: {template: '<div><h1 class="mb-5">Axios</h1><router-view/></div>'},
      children: [
        { path: 'watcher', component: WatcherYesNo },
        { path: 'computed', component: ComputedYesNo },
        { path: 'click', component: ClickYesNo },
      ]
    },

    { path: '/form-order', name: 'Form_Order', component: FormOrderPage, meta: { requiresAuth: true, adminRole: true } },
    { path: '/form-login', name: 'Form_Login', component: LoginPage },
    { path: '/form-regist', name: 'Form_Regist', component: RegistPage },
    { path: '/form-logout', name: 'Form_Logout', 
      component: {
        template: '<div></div>',
        data: function () {
          return {
            count: 0
          }
        },
        mounted() {
            localStorage.removeItem(CONST.HTTP_ACCESS_TOKEN);
            this.$router.push({ name: 'Form_Order' });
        }
      }
    },

    {path: '/mix-vuex', component: MixVuex},
    
    { path: '/404', component: {template: '<div><h1>404 Error</h1></div>'}},
    { path: '*', redirect: '/404'},


  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem(CONST.HTTP_ACCESS_TOKEN)) {
      next({
        name: 'Form_Login',
        query: { redirect: to.fullPath }
      })
    }
  // } else if (to.matched.some(record => record.meta.customerRole)) {
  //   // const authUser = store.getters['user/getUserRole']
  //   if (authUser === 'CUSTOMER') {
  //     next()
  //   } else {
  //     next({ name: 'Admin' })
  //   } 
    else {
      next() // make sure to always call next()!
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
