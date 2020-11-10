import Vue from 'vue'
import { VNode } from 'vue/types/vnode'
import VContextMenu from '../../components/VContextMenu';

const cacheMenu: Array<VContextMenu> = []; // 缓存菜单对象

// 获取缓存的菜单
function _GetContextMenuCache(options: Record<string, any>) {
    if (options.menuId) {
        return cacheMenu[options.menuId];
    }
    return null;
}

// 创建菜单
function _CreateContextMenu(options: Record<string, any>, vnode: VNode) {
    const NestListCfg = {
        items: options.items, // 全部数据
        width: options.width || '200px', // 宽度
        iconSize: options.iconSize || 24, // 图标大小
        textField: options.textField || 'text', // 文字字段名
        iconField: options.iconField || 'icon', // 图标字段名
        sublistField: options.sublistField || 'sublist', // 子列表字段名
        clickField: options.clickField || 'click', // 点击回调函数字段名
        click: options.click  // 点击回调函数
    }
    const ContextMenu = new VContextMenu({
        data: {
            NestListCfg // NestList配置
        },
        parent: vnode.context
    });
    ContextMenu.$mount();
    const apps = document.querySelectorAll(".v-application");
    if (apps && apps.length > 0) {
        apps[0].appendChild(ContextMenu.$el);
    }
    return ContextMenu;
}

// 判断父元素是否已销毁
function _isParentDestroyed(menu: VContextMenu) {
    const parent: any = menu.$parent;
    return parent._isDestroyed;
}


function GetContextMenu(options: Record<string, any>, vnode: VNode) {
    let ContextMenu: any = _GetContextMenuCache(options);
    // 为空或父元素已销毁则创建
    if (!ContextMenu || _isParentDestroyed(ContextMenu)) {
        if (options.RefName) {
            ContextMenu = vnode.context ? vnode.context.$refs[options.RefName] as VContextMenu : null;
        } else {
            ContextMenu = _CreateContextMenu(options, vnode);
        }
    }
    if (options.menuId && ContextMenu) {
        cacheMenu[options.menuId] = ContextMenu;
    }
    return ContextMenu;
}

// 隐藏所有菜单
function HideAll() {
    for (const key in cacheMenu) {
        const menu = cacheMenu[key] as any;
        if (menu.Hide) {
            menu.Hide();
        }
    }
}

export default {
    GetContextMenu,
    HideAll
}
