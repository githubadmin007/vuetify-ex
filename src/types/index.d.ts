import Vue, { PluginFunction } from 'vue'
import { VWindowManager } from './VPopupWindow'
import { VMessageHelper } from './VMessage'

export default VuetifyEx
export class VuetifyEx {
    static install: PluginFunction<any>
}

declare module "vue/types/vue" {
    export interface Vue {
        $VWindow: VWindowManager
        $VMessage: VMessageHelper
    }
}
