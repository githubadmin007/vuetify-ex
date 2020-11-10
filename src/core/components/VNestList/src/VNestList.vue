<template>
    <div class="v-nest-list">
        <v-sheet :elevation="cSheetElevation" :width="cSheetWidth">
            <template v-for="(item, index) in items">
                <!-- 分割线 -->
                <v-divider v-if="item == null" :key="index"></v-divider>
                <!-- 数组节点 -->
                <NestNode
                    v-else
                    :item="item"
                    :data="dData"
                    :key="index"
                    v-bind="$props"
                    @itemclick="ItemClick"
                ></NestNode>
            </template>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { isMobile } from "../../../platform";
import NestNode from "./VNestNode.vue";

@Component({
    name: "VNestList",
    components: {
        NestNode,
    },
})
export default class VNestList extends Vue {
    @Prop({ default: [] }) private items!: Array<any>; // 全部数据
    @Prop({ default: true }) private isRoot!: boolean; // 是否为根
    @Prop({ type: [Number, String], default: "200px" }) private width: any; // 宽度
    @Prop({ default: 24 }) private iconSize!: number; // 图标大小
    @Prop({ default: "text" }) private textField!: string; // 文字字段名
    @Prop({ default: "icon" }) private iconField!: string; // 图标字段名
    @Prop({ default: "sublist" }) private sublistField!: string; // 子列表字段名
    @Prop({ default: "click" }) private clickField!: string; // 点击回调函数字段名

    dData: any = null; // 附加数据
    dIsMobile: boolean = isMobile; // 是否移动端

    // sheet组件的elevation值
    get cSheetElevation() {
        // 移动端的非根列表为0
        if (this.dIsMobile && !this.isRoot) {
            return 0;
        }
        return 10;
    }
    // sheet组件的宽度值
    get cSheetWidth() {
        // 根列表或PC端宽度始终为传入的width值
        if (this.isRoot || !this.dIsMobile) {
            return this.width;
        }
        return "100%";
    }

    // 设置附加数据
    SetData(data: any) {
        this.dData = data;
    }
    // NestNode点击事件
    ItemClick(event: any) {
        this.$emit("itemclick", event);
    }
}
</script>

<style lang='scss' scoped>
.v-nest-list {
    width: 100%;
    height: 100%;
    background-color: white;
}
</style>
