import Vue, { VNode, PluginFunction } from 'vue'

export default VuetifyEx
export class VuetifyEx {
    static install: PluginFunction<any>
}

declare module "vue/types/vue" {
    export interface Vue {
        $VWindow(this: Vue, options: WindowOptions | string): string
        $VMessage(this: any, options: MessageOptions): string
    }
}

export interface MessageOptions {
    id?: string;
    type?: string;
    message: string | VNode;
    onClose?: Function;
    offset?: number;
    visible?: boolean;
    duration?: number;
    customClass?: string;
    onClose?: Function;
    showClose?: boolean;
    closed?: boolean;
    verticalOffset?: number;
    timer?: number;
    dangerouslyUseHTMLString?: boolean;
    center?: boolean;
}

export interface WindowOptions {
    id?: string;
    title?: string;
    src?: string;
    value?: boolean;
    icon?: string;
    iconimg?: string;
    width?: string;
    height?: string;
    position?: string | Array<any>;
    margin?: string | Array<any>;
    minimize?: boolean;
    maximize?: boolean;
    closeAble?: boolean;
    moveAble?: boolean;
    fullscreen?: boolean;
    component?: any;
    componentProps?: Record<string, any>;
    shade?: any;
    shadeClose?: boolean;
    shadeEvent?: boolean;
    beforeClose?: Function;
    elevation?: number;
}
