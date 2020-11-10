import Vue from 'vue'
import VueRouter from 'vue-router';
import navConfig from './nav.config.json'

Vue.use(VueRouter)

const routes: any[] = navConfig.map(nav => {
    return {
        path: nav.path,
        name: nav.name,
        component: () => import(`../docs/components/${nav.component}.md`)
    }
});

if (routes.length > 0) {
    routes.push({
        path: '/',
        name: '',
        redirect: routes[0].path
    })
}

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router;
