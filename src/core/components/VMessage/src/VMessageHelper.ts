import { VNode } from 'vue/types/umd';
import VMessage from './VMessage.vue';
import { MessageOptions } from '../../../../types/VMessage'


const instances: any[] = [];
let seed = 1;

function isVNode(node: string | VNode) {
    return node !== null && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, 'componentOptions');
}

function VMessageHelper(this: any, options: MessageOptions | string): string {
    const _options: MessageOptions = typeof options === 'string' || typeof options === 'number' ? { message: options } : options;
    const id = (typeof options === 'string' ? undefined : options.id) || 'message_' + seed++;
    _options.id = id;
    const onClose = _options.onClose;
    _options.onClose = function () {
        VMessageHelper.close(id, onClose);
    };
    // 实例化一个新对象
    const instance: any = new VMessage({
        data: _options,
        parent: this
    });
    if (isVNode(instance.message)) {
        instance.$slots.default = [(instance.message as VNode)];
        instance.message = ""; // instance.message = null;
    }
    instance.$mount();
    document.body.appendChild(instance.$el);
    let verticalOffset = _options.offset || 20;
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16;
    });
    instance.verticalOffset = verticalOffset;
    instance.visible = true;
    instance.$el.style.zIndex = 2000; // PopupManager.nextZIndex();
    instances.push(instance);
    return id;
}

const keys = ['success', 'warning', 'info', 'error'];
keys.forEach(type => {
    (VMessageHelper as any)[type] = (options: MessageOptions | string) => {
        if (typeof options === 'string' || typeof options === 'number') {
            options = {
                message: options
            };
        }
        options.type = type;
        return VMessageHelper(options);
    };
});

VMessageHelper.close = function (id: string, userOnClose?: Function): void {
    const len = instances.length;
    let index = -1;
    let removedHeight;
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {
            removedHeight = instances[i].$el.offsetHeight;
            index = i;
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
    if (len <= 1 || index === -1 || index > instances.length - 1) return;
    for (let i = index; i < len - 1; i++) {
        const dom = instances[i].$el;
        dom.style['top'] =
            parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
    }
};

VMessageHelper.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};

export default VMessageHelper;
