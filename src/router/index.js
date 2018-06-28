import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: '/index', name: '首页', component: () => import('@/views/index/Index') },
      ]
    },
    {
      path: '/',
      name: 'Ablity',
      component: Home,
      children: [
        { path: '/ablity', name: '能力模块库', component: () => import('@/views/ablity/Ablity') },
        { path: '/ablitymanagement', name: '能力分类管理', component: () => import('@/views/ablity/AblityManagement') },
        { path: '/ablity/:id', name: '编辑能力', component: () => import('@/views/ablity/AblityDetail'), hidden: true },
      ]
    },
    {
      path: '/',
      name: 'Question',
      component: Home,
      children: [
        { path: '/question', name: '面试问题列表', component: () => import('@/views/question/Question') },
        { path: '/question/:id', name: '编辑问题', component: () => import('@/views/question/QuestionDetail') },
      ]
    },
  ]
})
