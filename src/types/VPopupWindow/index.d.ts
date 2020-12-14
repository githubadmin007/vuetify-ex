import VPopupWindow from "../../core/components/VPopupWindow"

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
    componentEvents?: Record<string, Function>;
    shade?: any;
    shadeClose?: boolean;
    shadeEvent?: boolean;
    beforeClose?: Function;
    afterClose?: Function;
    elevation?: number;
}

export interface VWindowManager {
    (this: Vue, options: WindowOptions | string): string

    zIndexBase: number
    close(id: string): void
    closeAll(): void
    setTop(id: string): void
    getInstances(): any[]
    getTopWindow(): VPopupWindow | null
    getWindow(id: string): VPopupWindow | null
}