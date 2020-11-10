import { VNodeDirective, VNode } from 'vue/types/vnode'
import MenuManager from './ContextMenuManager'

export const contextmenu = {
    bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
        const Data = binding.value.Data;
        let ContextMenu: any = null;
        el.oncontextmenu = function (evt) {
            if (!ContextMenu) {
                ContextMenu = MenuManager.GetContextMenu(binding.value, vnode);
            }
            MenuManager.HideAll();
            ContextMenu.SetData(Data); // 将数据传给ContextMenu控件
            ContextMenu.ShowAt(evt.clientX, evt.clientY);
            return false;
        };
    }
}