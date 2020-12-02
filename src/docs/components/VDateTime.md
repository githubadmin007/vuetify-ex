## VDateTime 日期时间选择器
在页面上显示一个文本框，点击文本框弹出日期时间选择器。

### 菜单模式
:::demo 菜单模式
```html
<template>
    <v-date-time v-model="time"></v-date-time>
</template>

<script>
    export default {
        data () {
            return {
                time: '2020-10-10'
            }
        }
    }
</script>
```
:::

### 对话框模式
:::demo 对话框模式
```html
<template>
    <v-date-time v-model="time" mode="dialog"></v-date-time>
</template>

<script>
    export default {
        data () {
            return {
                time: '2020-10-10'
            }
        }
    }
</script>
```
:::
