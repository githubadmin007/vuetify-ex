<template>
    <!-- 数据项 -->
    <div class="v-nest-node" :width="width">
        <!-- 节点容器 -->
        <div
            class="node-panel"
            @mouseenter.prevent="ShowSubList"
            @mouseleave="HideSubList"
            @click="NodeClick"
        >
            <!-- 图标 -->
            <v-avatar :size="iconSize">
                <v-img :src="item[iconField]"></v-img>
            </v-avatar>
            <!-- 文字 -->
            <div class="content" :style="[cContentStyle]">
                {{ cContent }}
            </div>
            <!-- 如果有子列表 -->
            <v-icon v-show="cHasSubList">{{ cArrowIcon }}</v-icon>
        </div>
        <!-- 子列表容器 -->
        <div
            v-if="dNodeOpen"
            :class="['sub-list-panel' + (dIsMobile ? '-mobile' : '-pc')]"
            @mouseenter="ShowSubList"
            @mouseleave="HideSubList"
            ref="SubList"
        >
            <v-nest-list
                class="sub-list"
                v-bind="$props"
                :items="cSubList"
                :is-root="false"
                @itemclick="ItemClick"
            ></v-nest-list>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { isMobile } from "../../../platform";

@Component({
    name: "VNestNode",
})
export default class VNestNode extends Vue {
    @Prop() private item!: Record<string, any>; // 数据对象
    @Prop({ type: [Object, Number, String, Array], default: null })
    private data?: any; // 附加数据
    @Prop({ type: [Number, String], default: "200px" }) private width!: any; // 宽度
    @Prop({ default: 24 }) private iconSize!: number; // 图标大小
    @Prop({ default: "text" }) private textField!: string; // 文字字段名
    @Prop({ default: "icon" }) private iconField!: string; // 图标字段名
    @Prop({ default: "sublist" }) private sublistField!: string; // 子列表字段名
    @Prop({ default: "click" }) private clickField!: string; // 点击回调函数字段名

    dNodeOpen = false; // 节点是否展开
    dIsMobile: boolean = isMobile; // 是否移动端

    // 图标图片路径
    get cIconSrc() {
        if (this.item && this.item[this.iconField]) {
            return this.item[this.iconField];
        }
        return "";
    }
    // 文字内容
    get cContent() {
        if (this.item && this.item[this.textField]) {
            return this.item[this.textField];
        }
        return "";
    }
    // 是否有子列表
    get cHasSubList() {
        if (this.item && this.item[this.sublistField]) {
            return this.item[this.sublistField].length > 0;
        }
        return false;
    }
    // 子列表数据
    get cSubList() {
        return this.item[this.sublistField];
    }
    // 点击回调函数
    get cClick() {
        return this.item[this.clickField];
    }
    // 内容样式
    get cContentStyle() {
        return {
            width:
                "calc(100% - " +
                (this.iconSize + (this.cHasSubList ? 34 : 10)) +
                "px)",
        };
    }
    // 箭头图标
    get cArrowIcon() {
        if (this.dIsMobile) {
            return this.dNodeOpen ? "mdi-chevron-down" : "mdi-chevron-right";
        }
        return "mdi-chevron-right";
    }

    // 打开子列表（PC端）
    ShowSubList() {
        if (this.cHasSubList && !this.dIsMobile) {
            this.dNodeOpen = true;
            this.$nextTick(() => {
                const SubList: any = this.$refs.SubList as Element;
                if (SubList) {
                    // 获取屏幕大小
                    const screenRect = this.$root.$el.getBoundingClientRect();
                    // 父节点大小
                    const parentRect = this.$el.getBoundingClientRect();
                    // 子列表大小
                    const sublstRect = SubList.getBoundingClientRect();
                    // 确定水平位置
                    if (
                        parentRect.right + sublstRect.width >
                        screenRect.width
                    ) {
                        SubList.style.left = -sublstRect.width + "px";
                    } else {
                        SubList.style.left = parentRect.width + "px";
                    }
                    // 确定垂直位置
                    if (
                        parentRect.top + sublstRect.height >
                        screenRect.height
                    ) {
                        SubList.style.top =
                            (this.$el as any).offsetTop +
                            parentRect.height -
                            sublstRect.height +
                            "px";
                    } else {
                        SubList.style.top = (this.$el as any).offsetTop + "px";
                    }
                }
            });
        }
    }
    // 关闭子列表（PC端）
    HideSubList() {
        if (!this.dIsMobile) {
            this.dNodeOpen = false;
        }
    }
    // 节点点击事件
    NodeClick(event: any) {
        if (this.cHasSubList) {
            // 移动端点击有子列表的节点，toggle列表
            if (this.dIsMobile) {
                this.dNodeOpen = !this.dNodeOpen;
            }
            event.stopPropagation();
        } else {
            event.item = this.item;
            // 优先触发数据中带的回调函数
            if (this.cClick) {
                this.cClick(event, this.data);
            } else {
                this.$emit("itemclick", event);
            }
        }
    }
    // 子列表的节点点击事件
    ItemClick(event: any) {
        this.$emit("itemclick", event);
    }
}
</script>

<style lang='scss' scoped>
.v-nest-node {
    /* 节点 */
    .node-panel {
        width: 100%;
        padding-left: 5px;
        &:hover {
            background-color: #ddd;
        }
        .content {
            display: inline-block;
            padding: 10px;
            cursor: default;
        }
    }
    /* 子列表（移动） */
    .sub-list-panel-mobile {
        margin-left: 24px;
        width: calc(100% - 24px);
        .sub-list {
            color: green;
        }
    }
    /* 子列表（PC） */
    .sub-list-panel-pc {
        position: absolute;
        .sub-list {
            color: blue;
        }
    }
}
</style>
