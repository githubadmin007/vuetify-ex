import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VuetifyEx from '../core'
import DemoBlock from "./components/demo-block.vue";
import router from './router'
import hljs from 'highlight.js';

Vue.use(Vuetify);
Vue.use(VuetifyEx);
const vuetify = new Vuetify({});

Vue.component('demo-block', DemoBlock);

Vue.config.productionTip = false

router.afterEach(route => {
    Vue.nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    });
});

new Vue({
    vuetify,
    router,
    render: h => h(App),
}).$mount('#app')
