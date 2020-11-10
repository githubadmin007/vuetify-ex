## VMessage 消息提示
弹出一个小窗口提示一些简单的信息

### 基本用法
:::demo Message vuetify注册了一个$VMessage方法用于调用，$VMessage可以接收一个字符串或一个VNode作为参数，它会被显示为正文内容。
```html
<template>
    <v-btn @click="open">打开消息提示</v-btn>
    <v-btn @click="openVn">VNode</v-btn>
</template>

<script>
    export default {
        data () {
            return {
                show: false
            }
        },
        methods: {
            open() {
                this.$VMessage('这是一条消息提示');
            },
            openVn() {
                const h = this.$createElement;
                this.$VMessage({
                    message: h('p', null, [
                        h('span', null, '内容可以是 '),
                        h('i', { style: 'color: teal' },'VNode')
                    ])
                });
            }
        }
    }
</script>
```
:::

### 不同状态
:::demo 当需要自定义更多属性时，VMessage 也可以接收一个对象为参数。比如，设置type字段可以定义不同的状态，默认为info。此时正文内容以message的值传入。同时，我们也为 Message 的各种 type 注册了方法，可以在不传入type字段的情况下像open4那样直接调用。
```html
<template>
    <v-btn @click="open2">成功</v-btn>
    <v-btn @click="open3">警告</v-btn>
    <v-btn @click="open1">消息</v-btn>
    <v-btn @click="open4">错误</v-btn>
</template>

<script>
  export default {
    methods: {
        open1() {
            this.$VMessage('这是一条消息提示');
        },
        open2() {
            this.$VMessage({
                message: '恭喜你，这是一条成功消息',
                showClose: true,
                type: 'success'
            });
        },
        open3() {
            this.$VMessage({
                message: '警告哦，这是一条警告消息',
                type: 'warning',
                duration: 0
            });
        },
        open4() {
            this.$VMessage.error('错了哦，这是一条错误消息');
        }
    }
  }
</script>
```
:::

### 文字居中
使用 `center` 属性让文字水平居中。
:::demo 
```html
<template>
    <v-btn @click="openCenter">文字居中</v-btn>
</template>

<script>
    export default {
        methods: {
            openCenter() {
                this.$VMessage({
                    message: '居中的文字',
                    center: true
                });
            }
        }
    }
</script>
```
:::

### 使用 HTML 片段
`message` 属性支持传入 HTML 片段
:::demo 将`dangerouslyUseHTMLString`属性设置为 true，`message` 就会被当作 HTML 片段处理。
```html
<template>
    <v-btn :plain="true" @click="openHTML">使用 HTML 片段</v-btn>
</template>

<script>
    export default {
        methods: {
            openHTML() {
                this.$VMessage({
                    dangerouslyUseHTMLString: true,
                    message: '<strong>这是 <i>HTML</i> 片段</strong>'
                });
            }
        }
    }
</script>
```
:::

:::warning
`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。
:::


此时调用方法为 `$VMessage(options)`。我们也为每个 type 定义了各自的方法，如 `$VMessage.success(options)`。并且可以调用 `$VMessage.closeAll()` 手动关闭所有实例。

### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message | 消息文字 | string / VNode | — | — |
| type | 主题 | string | success/warning/info/error | info |
| iconClass | 自定义图标的类名，会覆盖 `type` | string | — | — |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | boolean | — | false |
| customClass | 自定义类名 | string | — | — |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 2000 |
| showClose | 是否显示关闭按钮 | boolean | — | true |
| center | 文字是否居中 | boolean | — | false |
| onClose | 关闭时的回调函数, 参数为被关闭的 message 实例 | function | — | — |
| offset | Message 距离窗口顶部的偏移量 | number | — | 20 |

### 方法
调用 `VMessage` 或 `this.$VMessage` 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Message |

