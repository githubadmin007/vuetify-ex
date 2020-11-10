import { VueConstructor } from 'vue'

export function install (Vue: VueConstructor, args: any) {
    if ((install as any).installed) return;
    (install as any).installed = true;

    const components = args.components || {}
    const directives = args.directives || {}

    for (const name in directives) {
        const directive = directives[name];
        Vue.directive(name, directive);
    }

    for (const name in components) {
        const component = components[name];
        Vue.use(component);
    }
}