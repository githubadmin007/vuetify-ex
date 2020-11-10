## VPopupWindow 弹窗
弹出一个窗口用于展示页面，支持iframe、组件等

### 基本用法
:::demo 基本用法，类似一个iframe，使用src设置要打开的页面，通过value来控制弹窗的显示与否
```html
<template>
    <v-sheet>
        <v-btn @click="open">打开</v-btn>
        <v-popup-window v-if="show" :close-able="true" :move-able="true"
            v-model="show" 
            title="我是标题"
            src="http://www.baidu.com">
        </v-popup-window>
    </v-sheet>
</template>

<script>
    export default {
        data () {
            return {
                show: false
            }
        },
        components: {
            VPopupWindow: () => import('../../core/components/VPopupWindow')
        },
        methods: {
            open () {
                console.log('open click');
                console.log(this.show);
                this.show = true;
                console.log(this.show);
            }
        }
    }
</script>
```
:::

### 调用VPopupWindow对象的方法
:::demo 通过ref等方式获取到对象，并调用对象的Show、Close等方法打开或关闭弹窗
```html
<template>
    <v-sheet>
        <v-btn @click="toggle">{{ open?'关闭':'打开' }}</v-btn>
        <v-popup-window ref="window" :close-able="true" :move-able="true"
            title="我是标题"
            src="http://www.baidu.com">
        </v-popup-window>
    </v-sheet>
</template>

<script>
    export default {
        data () {
            return {
                open: false
            }
        },
        components: {
            VPopupWindow: () => import('../../core/components/VPopupWindow')
        },
        methods: {
            toggle () {
                if(this.open) {
                    this.$refs.window.Close();
                } else {
                    this.$refs.window.Show();
                }
                this.open = !this.open;
            }
        }
    }
</script>
```
:::

### 使用插槽
:::demo 将要弹出的内容当成插槽，用VPopupWindow组件将内容包裹起来
```html
<template>
    <v-sheet>
        <v-btn @click="open">打开</v-btn>
        <v-popup-window :close-able="true" :move-able="true"
            v-model="show" 
            title="我是标题">
            <div>
                <p>这就是插槽，可以包括各种组件。比如</p>
                <v-btn>按钮</v-btn>
                <iframe src="http://www.baidu.com"></iframe>
            </div>
        </v-popup-window>
    </v-sheet>
</template>

<script>
    export default {
        data () {
            return {
                show: false
            }
        },
        components: {
            VPopupWindow: () => import('../../core/components/VPopupWindow')
        },
        methods: {
            open () {
                this.show = true;
            }
        }
    }
</script>
```
:::




### 使用全局函数调用
:::demo 使用挂接在Vue对象上的$VWindow方法打开弹窗
```html
<template>
    <v-sheet>
        直接打开一条链接
        <v-btn @click="openLink">打开链接</v-btn>
        <br/>
        传入一些配置，以适应不同的需求。此处仅使用了部分参数，完整的参数列表请查看本文末尾的“组件参数”
        <v-btn @click="openLink2">打开链接</v-btn>
        <br/>
        传入一个组件及组件参数
        <v-btn @click="openComp">弹出组件</v-btn>
    </v-sheet>
</template>

<script>
    export default {
        data () {
            return {}
        },
        methods: {
            openLink () {
                this.$VWindow('http://www.baidu.com');
            },
            openLink2 () {
                this.$VWindow({
                    src: 'http://www.baidu.com',
                    width: '80%',
                    height: '80%',
                    moveAble: true,
                    minimize: true,
                    maximize: true,
                    shade: 0.5,
                    shadeClose: true,
                    shadeEvent: true
                });
            },
            openComp () {
                this.$VWindow({
                    // 此处是动态引用组件，也可以在vue文件的头部import VTest from '../VTest'进来后使用
                    component: () => import('../../core/components/VTest'),
                    componentProps: {
                        msg: '传入一个组件及组件参数'
                    },
                    moveAble: true,
                    shade: 0.5
                });
            }
        }
    }
</script>
```
:::


### 组件参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| id | id | string | - | - |
| value | 是否显示窗体 | boolean | - | false |
| title | 标题 | string | - | - |
| icon | 图标 | string | - | - |
| iconimg | 图标图片 | string | - | - |
| width | 宽 | string | - | 50% |
| height | 高 | string | - | 50% |
| position | 弹窗位置 | string/array | - | auto |
| margin | 外间距（仅在position为r、b、l等字符时生效） | string/array | - | 10px |
| minimize | 允许最小化 | boolean | - | false |
| maximize | 允许最大化 | boolean | - | false |
| closeAble | 关闭按钮 | boolean | - | true |
| moveAble | 允许拖动 | boolean | - | false |
| fullscreen | 全屏 | boolean | - | false |
| src | 要打开的链接 | string | - | - |
| component | 组件 | Object/Function | - | - |
| componentProps | 组件参数 | Object | - | - |
| shade | 遮罩 | String/Number | - | 0 |
| shadeClose | 点击遮罩是否关闭(仅在shadeEvent为true时生效) | boolean | - | - |
| shadeEvent | 是否屏蔽鼠标事件 | boolean | - | false |
| beforeClose | 关闭前的回调 | Function | - | false |
| elevation | 窗体悬浮高度 | number | - | 2 |


### 插槽

| name | 说明 |
|------|------|
| -- | 默认插槽，需要弹窗展示的内容 |


### 方法
| 方法名 | 说明 | 参数 |
|------|------|------|
| Minimize | 窗口最小化 | - |
| Maximize | 窗口最大化、窗口正常化 | - |
| Show | 显示窗口 | - |
| Close | 关闭窗口 | Function(after: Function()) |
| SetTop | 设为顶级窗口 | - |




