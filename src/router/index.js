import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import newuser from '@/components/newuser'
import api from '@/components/api'
import about from '@/components/about'
import register from '@/components/register'
import login from '@/components/login'
import all from '@/components/homelist/all'
import cream from '@/components/homelist/cream'
import share from '@/components/homelist/share'
import questionAnswers from '@/components/homelist/questionAnswers'
import invite from '@/components/homelist/invite'
import test from '@/components/homelist/test'
import strictpags from '@/components/homelist/alllist/strictpags'
import noRead from '@/components/noRead'
import setting from '@/components/setting'
import unitMessage from '@/components/homelist/alllist/unitMessage'
import theme from '@/components/homelist/theme'
import edit from '@/components/homelist/edit'
import shoucang from '@/components/homelist/shoucang'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '/',
          name: 'all',
          component: all
        },
        {
          path: 'all',
          name: 'all',
          component: all
        },
        {
          path: 'share',
          name: 'share',
          component: share
        },
        {
          path: 'cream',
          name: 'cream',
          component: cream
        },
        {
          path: 'questionAnswers',
          name: 'questionAnswers',
          component: questionAnswers
        },
        {
          path: 'invite',
          name: 'invite',
          component: invite
        },
        {
          path: 'test',
          name: 'test',
          component: test
        }
      ]
    },
    {
      path: '/newuser',
      name: 'newuser',
      component: newuser
    },
    {
      path: '/api',
      name: 'api',
      component: api
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/strictpags/:id',
      name: 'strictpags',
      component: strictpags
    },
    {
      path: '/noRead',
      name: 'noRead',
      component: noRead
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/unitMessage/:data',
      name: 'unitMessage',
      component: unitMessage
    },
    {
      path: '/theme',
      name: 'theme',
      component: theme
    },
    {
      path: '/edit/:name',
      name: 'edit',
      component: edit
    },
    {
      path: '/shoucang/:Cname',
      name: 'shoucang',
      component: shoucang
    }
  ]
})
