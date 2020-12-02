import Vue from 'vue'

declare module "vue/types/vue" {
    interface Vue {
        $VWindow: Function;
        $VMessage: Function;
    }
}

declare global {
    interface Window {
        $VWindow: Function;
        $VMessage: Function;
    }
}
