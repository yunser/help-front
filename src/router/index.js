import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const UserHome = resolve => require(['@/views/UserHome'], resolve)
const ArticleDetail = resolve => require(['@/views/ArticleDetail'], resolve)
const ArticleEdit = resolve => require(['@/views/ArticleEdit'], resolve)
const Admin = resolve => require(['@/views/Admin'], resolve)

const About = resolve => require(['@/views/About'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        // redirect: '/simple'
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/u/:id/articles',
        component: Home
    },
    {
        path: '/users/:id/articles',
        component: UserHome
    },
    {
        path: '/articles/:id',
        component: ArticleDetail
    },
    {
        path: '/admin/article/add',
        component: ArticleEdit
    },
    {
        path: '/admin/articles/:id',
        component: ArticleEdit
    },
    {
        path: '/admin2',
        component: Admin
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
