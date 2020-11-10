<template>
    <div class="v-context-menu" v-show="Visible">
        <div class="menu" ref="menu">
            <slot v-bind:data="data">
                <NestList
                    ref="nestList"
                    v-if="NestListCfg"
                    v-bind="NestListCfg"
                    @itemclick="ItemClick"
                ></NestList>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NestList from "../../VNestList/src/VNestList.vue";

@Component({
    name: "VContextMenu",
    components: {
        NestList,
    },
})
export default class VNestList extends Vue {
    Visible = false; // 菜单是否可见
    data: any = null; // 附加数据
    NestListCfg: any = null; // NestList配置

    // 显示菜单
    Show() {
        this.Visible = true;
    }
    // 隐藏菜单
    Hide() {
        this.Visible = false;
    }
    // 设置附加数据
    SetData(data: any) {
        this.data = data;
        const nestList = this.$refs.nestList as any;
        if (nestList && nestList.SetData) {
            nestList.SetData(data);
        }
    }
    // 设置菜单位置
    SetPosition(x: number, y: number) {
        const menu = this.$refs.menu as any;
        const $el = this.$el as any;
        let left = 0,
            top = 0;
        const pWidth = $el.offsetWidth;
        const sWidth = menu.offsetWidth;
        if (sWidth + x > pWidth) {
            left = pWidth - sWidth;
        } else {
            left = x;
        }
        const pHeight = $el.offsetHeight;
        const sHeight = menu.offsetHeight;
        if (sHeight + y > pHeight) {
            top = pHeight - sHeight;
        } else {
            top = y;
        }
        menu.style.left = left + "px";
        menu.style.top = top + "px";
    }
    // 将菜单显示在指定位置
    ShowAt(x: number, y: number) {
        this.Show();
        this.$nextTick(() => {
            this.SetPosition(x, y);
        });
    }
    // NestList点击事件
    ItemClick(event: any) {
        if (this.NestListCfg.click) {
            this.NestListCfg.click(event, this.data);
        }
    }

    mounted() {
        this.$nextTick(function () {
            document.addEventListener("click", this.Hide);
        });
    }
    beforeDestroy() {
        document.removeEventListener("click", this.Hide);
    }
}
</script>

<style scoped>
.v-context-menu {
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
}
.v-context-menu .menu {
    min-width: 100px;
    min-height: 100px;
    top: 0px;
    left: 0px;
    position: fixed;
    pointer-events: auto;
}
</style>
