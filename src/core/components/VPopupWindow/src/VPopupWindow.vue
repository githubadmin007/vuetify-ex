<template>
    <div
        :id="id"
        v-if="dShow"
        class="popup-window-container"
        :style="[cZIndexStyle]"
    >
        <div
            class="popup-window-shade"
            :style="[cShadeStyle]"
            v-if="!dIsMinimize"
            @click="ShadeClick"
        ></div>
        <div
            :class="['popup-window-window', `elevation-${elevation}`]"
            :style="[cPositionStyle]"
            @mousedown="SetTop"
        >
            <!-- 头部 -->
            <div
                class="popup-window-head"
                :style="[cTitleStyle]"
                @mousedown="TitleMouseDown"
            >
                <!-- 图标 -->
                <div class="icon" v-if="icon || iconimg">
                    <v-icon v-if="icon">{{ icon }}</v-icon>
                    <v-avatar v-else :size="30" tile>
                        <v-img :src="iconimg"></v-img>
                    </v-avatar>
                </div>
                <!-- 标题 -->
                <div class="title" :title="title">{{ title }}</div>
                <!-- 按钮 -->
                <div class="btns">
                    <v-icon class="btn" v-if="cMinimize" @click="Minimize"
                        >mdi-window-minimize</v-icon
                    >
                    <v-icon class="btn" v-if="cNormalizate" @click="Maximize">
                        {{
                            (dIsMinimize && !dIsMaximize) ||
                            (!dIsMinimize && dIsMaximize)
                                ? "mdi-window-restore"
                                : "mdi-window-maximize"
                        }}
                    </v-icon>
                    <v-icon class="btn" v-if="closeAble" @click.stop="Close"
                        >mdi-window-close</v-icon
                    >
                </div>
            </div>
            <!-- 内容 -->
            <div
                v-show="!dIsMinimize"
                class="popup-window-content"
                :style="{ 'pointer-events': dWindowMoving ? 'none' : 'all' }"
            >
                <slot>
                    <iframe v-if="src" :src="src"></iframe>
                    <component
                        v-else-if="component"
                        v-bind:is="component"
                        v-bind="componentProps"
                        @closewindow="Close"
                    >
                    </component>
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import VWindowManager from "./VWindowManager";

@Component({
    name: "VPopupWindow",
})
export default class VPopupWindow extends Vue {
    @Prop() private id!: string; // id
    @Prop({ default: false }) private value!: boolean; // 是否显示窗体
    @Prop({ default: "" }) private title!: string; // 标题
    @Prop() private icon?: string; // 图标
    @Prop() private iconimg?: string; // 图标图片
    @Prop({ default: "50%" }) private width!: string; // 宽
    @Prop({ default: "50%" }) private height!: string; // 高
    @Prop({ type: [String, Array], default: "auto" }) private position: any; // 弹窗位置
    @Prop({ type: [String, Array], default: "10px" }) private margin: any; // 外间距（仅在position为r、b、l等字符时生效）
    @Prop({ default: false }) private minimize!: boolean; // 允许最小化
    @Prop({ default: false }) private maximize!: boolean; // 允许最大化
    @Prop({ default: true }) private closeAble!: boolean; // 关闭按钮
    @Prop({ default: false }) private moveAble!: boolean; // 允许拖动
    @Prop({ default: false }) private fullscreen!: boolean; // 全屏
    @Prop({ default: "" }) private src!: string; // 要打开的链接
    @Prop({ type: [Object, Function], default: null }) private component?: any; // 组件
    @Prop({
        default: () => {
            /*空默认值*/
        },
    })
    private componentProps?: Record<string, any>; // 组件参数
    @Prop({ type: [String, Number], default: 0 }) private shade: any; // 遮罩
    @Prop({ default: false }) private shadeClose!: boolean; // 点击遮罩是否关闭(仅在shadeEvent为true时生效)
    @Prop({ default: false }) private shadeEvent!: boolean; // 是否屏蔽鼠标事件
    @Prop() private beforeClose!: Function; // 关闭前的回调
    @Prop() private afterClose!: Function; // 关闭前的回调
    @Prop({ default: 2 }) private elevation!: number; // 窗体悬浮高度

    dWindowMoving = false; // 窗体是否在拖动中
    dTopMoved = ""; // 移动后的top
    dLeftMoved = ""; // 移动后的left
    dIsMaximize = false; // 是否处于最大化状态
    dIsMinimize = false; // 是否处于最小化状态
    dShow = this.value; // 窗体是否可见，value是参数不能直接修改
    instances = VWindowManager.getInstances();

    // 外间距（按css的规则进行处理，返回一个长度为4的数组）
    get cMargin() {
        const arr = new Array(4);
        const margin = this.margin;
        if (typeof margin === "object") {
            switch (margin.length) {
                case 1:
                    arr.fill(margin[0]);
                    break;
                case 2:
                    arr[0] = arr[2] = margin[0];
                    arr[1] = arr[3] = margin[1];
                    break;
                default:
                    arr.map((item, index) => {
                        arr[index] = margin[index] || "0px";
                    });
                    break;
            }
        } else {
            arr.fill(margin);
        }
        return arr;
    }
    // 宽度
    get cWidth() {
        return this.width;
    }
    // 高度
    get cHeight() {
        return this.height;
    }
    // 窗体位置--top
    get cTop() {
        if (this.dTopMoved) return this.dTopMoved;
        const position = this.position;
        if (typeof position === "object") {
            if (position.length === 2) {
                return position[0];
            }
        } else {
            switch (position) {
                case "t":
                case "lt":
                case "rt":
                    return `${this.cMargin[0]}`;
                case "b":
                case "lb":
                case "rb":
                    return `calc(100% - ${this.cHeight} - ${this.cMargin[2]})`;
                case "l":
                case "r":
                case "auto":
                    return `calc((100% - ${this.cHeight})/2)`;
                default:
                    return position;
            }
        }
        return `calc((100% - ${this.cHeight})/2)`;
    }
    // 窗体位置--left
    get cLeft() {
        if (this.dLeftMoved) return this.dLeftMoved;
        const position = this.position;
        if (typeof position === "object") {
            if (position.length === 2) {
                return position[1];
            }
        } else {
            switch (position) {
                case "l":
                case "lt":
                case "lb":
                    return `${this.cMargin[3]}`;
                case "r":
                case "rt":
                case "rb":
                    return `calc(100% - ${this.width} - ${this.cMargin[1]})`;
                case "t":
                case "b":
                case "auto":
                    return `calc((100% - ${this.width})/2)`;
            }
        }
        return `calc((100% - ${this.width})/2)`;
    }
    // 窗体位置
    get cPositionStyle() {
        let style;
        if (this.dIsMinimize) {
            style = {
                width: "200px",
                height: "40px",
                bottom: "0px",
                left: "0px",
            };
        } else if (this.dIsMaximize) {
            style = {
                width: "100%",
                height: "100%",
                top: "0px",
                left: "0px",
            };
        } else {
            style = {
                width: this.width,
                height: this.height,
                top: this.cTop,
                left: this.cLeft,
            };
        }
        return style;
    }
    // 标题样式
    get cTitleStyle() {
        let btnCount = 0;
        if (this.minimize && !this.dIsMinimize) btnCount++;
        if (
            this.maximize &&
            ((!this.dIsMinimize && this.dIsMaximize) ||
                (this.dIsMinimize && !this.dIsMaximize))
        )
            btnCount++;
        if (
            this.maximize &&
            ((!this.dIsMinimize && !this.dIsMaximize) ||
                (this.dIsMinimize && this.dIsMaximize))
        )
            btnCount++;
        if (this.closeAble) btnCount++;
        return {
            cursor:
                this.moveAble && !this.dIsMinimize && !this.dIsMaximize
                    ? "move"
                    : "default",
            "padding-left": this.icon || this.iconimg ? "40px" : "10px",
            "padding-right": btnCount * 40 + "px",
        };
    }
    // 遮罩样式
    get cShadeStyle() {
        const style: any = {};
        style["pointer-events"] = this.shadeEvent ? "auto" : "none";
        if (typeof this.shade === "number") {
            style.background = "#000";
            style.opacity = this.shade;
        } else {
            style.background = this.shade;
        }
        return style;
    }
    // 窗体z-index
    get cZIndexStyle() {
        const zIndex = this.instances.findIndex(
            (instance) => instance.id === this.id
        );
        return {
            "z-index": VWindowManager.zIndexBase + zIndex,
        };
    }
    // 是否显示最小化按钮
    get cMinimize() {
        // 允许最小化，且不处于最小化状态
        return this.minimize && !this.dIsMinimize;
    }
    // 是否显示最大化/正常化按钮
    get cNormalizate() {
        if (this.dIsMinimize) {
            // 如果处于最小化状态，允许恢复窗口状态
            return true;
        } else {
            // 如果处于显示状态，根据maximize决定是否允许最大化
            return this.maximize;
        }
    }

    @Watch("value")
    valueWatch(newVal: boolean) {
        this.dShow = newVal;
    }

    // 窗口最小化
    Minimize() {
        this.dIsMinimize = true;
    }
    // 窗口最大化、窗口正常化
    Maximize() {
        if (this.dIsMinimize) {
            this.dIsMinimize = false;
        } else {
            this.dIsMaximize = !this.dIsMaximize;
        }
    }
    // 显示窗口
    Show(): void {
        this.dShow = true;
        this.$emit("input", true);
    }
    // 关闭窗口
    Close(event?: any, data?: any) {
        const close = () => {
            this.dShow = false;
            this.$emit("input", false);
            if (typeof this.afterClose === "function") {
                this.afterClose(data);
            }
        };
        if (typeof this.beforeClose === "function") {
            this.beforeClose(close, data);
        } else {
            close();
        }
    }
    // 移动窗体
    TitleMouseDown(e: any) {
        if (!this.moveAble || this.dIsMinimize || this.dIsMaximize) return;
        this.dWindowMoving = true;
        const elWindow = e.currentTarget.parentNode;
        const disX = e.clientX - elWindow.offsetLeft;
        const disY = e.clientY - elWindow.offsetTop;
        const onmousemove = document.onmousemove;
        const onmouseup = document.onmouseup;
        document.onmousemove = (e) => {
            this.dLeftMoved = e.clientX - disX + "px";
            this.dTopMoved = e.clientY - disY + "px";
        };
        document.onmouseup = () => {
            this.dWindowMoving = false;
            document.onmousemove = onmousemove;
            document.onmouseup = onmouseup;
        };
    }
    // 遮罩点击事件
    ShadeClick() {
        if (this.shadeClose) {
            this.Close();
        }
    }
    // 设为顶级窗口
    SetTop() {
        VWindowManager.setTop(this.id);
    }

    mounted() {
        this.dIsMaximize = this.fullscreen;
    }
}
</script>

<style lang='scss' scoped>
.popup-window-container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    pointer-events: none;
}
.popup-window-shade {
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
}
.popup-window-window {
    background: #f8f8f8;
    position: absolute;
    pointer-events: auto;
    .popup-window-head {
        width: 100%;
        height: 40px;
        background: #f8f8f8;
        border-bottom: 1px solid #eee;
        // padding: 0px 120px 0px 40px;
        user-select: none;
        .icon {
            width: 40px;
            height: 40px;
            position: absolute;
            top: 0px;
            left: 0px;
            padding: 5px;
            .v-icon {
                width: 100%;
                height: 100%;
            }
        }
        .title {
            height: 100%;
            line-height: 40px;
            font-size: 16px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .btns {
            height: 40px;
            position: absolute;
            top: 0px;
            right: 0px;
            .btn {
                width: 40px;
                height: 40px;
                cursor: pointer;
                &:hover {
                    background-color: #ccc;
                }
            }
        }
    }
    .popup-window-content {
        width: 100%;
        height: calc(100% - 40px);
        overflow: auto;
        &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
        }
        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #a3a3a3;
        }
        &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background: #ededed;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: 0px;
        }
    }
}
</style>

