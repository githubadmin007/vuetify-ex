import PopupWindow from './VPopupWindow.vue';

export interface WindowOptions {
    id?: string;
    title?: string;
    src?: string;
}

const instances: any[] = [];
let seed = 1;

function VWindowManager(this: any, options: WindowOptions | string): string {
    const _options: WindowOptions = typeof options === 'string' ? { src: options } : options;
    const id = (typeof options === 'string' ? undefined : options.id) || 'window_' + seed++;
    _options.id = id;
    // 删除可能存在的同id对象
    VWindowManager.close(id);
    // 实例化一个新对象
    const instance: any = new PopupWindow({
        propsData: _options,
        parent: this // 不加parent，此对象将成为一个根实例。使子类无法正常使用在父类注册的一些vuetify组件
    });
    instance.$mount();
    instance.parent = this ? this.$el : this;
    this && this.$el ? this.$el.appendChild(instance.$el) : document.body.appendChild(instance.$el);
    instance.Show();
    const close = instance.Close;
    instance.Close = () => close(() => VWindowManager.close(id));
    instances.push(instance);
    return id;
}

// z-index初始值
VWindowManager.zIndexBase = 1000;

// 关闭指定窗口
VWindowManager.close = function (id: string | void): void {
    const index = id ? instances.findIndex(instance => instance.id === id) : instances.length - 1;
    if (index > -1) {
        const instance = instances[index];
        instance.$destroy();
        instance.parent && instance.parent.removeChild ? instance.parent.removeChild(instance.$el) : document.body.removeChild(instance.$el);
        instances.splice(index, 1);
    }
}

// 关闭所有窗口
VWindowManager.closeAll = function (): void {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].Close();
        // close();
    }
}

// 将指定窗口设为最顶层
VWindowManager.setTop = function (id: string): void {
    const index = instances.findIndex(instance => instance.id === id);
    if (index > -1) {
        const arr = instances.splice(index, 1);
        instances.push(arr[0]);
    }
}

// 获取所有实例
VWindowManager.getInstances = function (): any[] {
    return instances;
}

// 获取最顶的窗口
VWindowManager.getTopWindow = function () {
    if (instances.length > 0) {
        return instances[instances.length - 1];
    }
    return null;
}

// 获取窗口实例
VWindowManager.getWindow = function (id: string) {
    return instances.find(instance => instance.id === id);
}

export default VWindowManager
