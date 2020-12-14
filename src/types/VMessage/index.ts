import Vue, { VNode } from 'vue'

export interface MessageOptions {
    id?: string;
    type?: string;
    message: string | VNode;
    onClose?: Function;
    offset?: number;
    visible?: boolean;
    duration?: number;
    customClass?: string;
    showClose?: boolean;
    closed?: boolean;
    verticalOffset?: number;
    timer?: number;
    dangerouslyUseHTMLString?: boolean;
    center?: boolean;
}

export interface VMessageHelper {
    (this: Vue, options: MessageOptions | string): string

    success(options: MessageOptions | string): void
    warning(options: MessageOptions | string): void
    info(options: MessageOptions | string): void
    error(options: MessageOptions | string): void
    close(id: string, userOnClose?: Function): void
    closeAll(): void
}