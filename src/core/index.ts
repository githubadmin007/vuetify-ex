import { VueConstructor } from 'vue'
import * as components from './components'
import * as directives from './directives'
import VuetifyEx from './framework'
import VWindowManager from './components/VPopupWindow/src/VWindowManager'
import VMessageHelper from './components/VMessage/src/VMessageHelper'


// todo: 待改进！！！！！！
for (const name in components) {
    const component = (components as any)[name];
    component.install = function (Vue: VueConstructor) {
        const componentName = component.options && component.options.name || name;
        Vue.component(componentName, component);
    };
}


const install = VuetifyEx.install

VuetifyEx.install = (Vue, args) => {
    install.call(VuetifyEx, Vue, {
        components,
        directives,
        ...args,
    })
    Vue.prototype.$VWindow = VWindowManager;
    Vue.prototype.$VMessage = VMessageHelper;
}

declare global {
    interface Window {
        $VWindow: Function;
        $VMessage: Function;
    }
}  

if (typeof window !== 'undefined'  && window.Vue) {
    window.Vue.use(VuetifyEx)
    window.$VWindow = VWindowManager;
    window.$VMessage = VMessageHelper;
}

export * from './components'
export default VuetifyEx
