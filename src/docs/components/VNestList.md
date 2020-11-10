## VNestList 嵌套列表
通过一个数组生成一个嵌套的列表，一般与`v-context-menu`组件一起使用

### 基本用法
:::demo 通过一个数组生成一个嵌套的列表
```html
<template>
    <v-nest-list :items="menuItems" @itemclick="itemclick($event, 222)"></v-nest-list>
</template>

<script>
    export default {
        data () {
            return {
                menuItems: [
                    { 
                        text:'当你', 
                        icon: 'https://randomuser.me/api/portraits/men/1.jpg', 
                        click: function (event, index) {
                            let msg = '我的编号为' + index + '。' + 'item:' + event.item.text;
                            this.$VMessage.success(msg);
                        }
                        },
                        { 
                            text:'看到', 
                            icon: 'https://randomuser.me/api/portraits/men/2.jpg'
                        },
                        null,
                        { 
                            text:'这段', 
                            icon: 'https://randomuser.me/api/portraits/men/3.jpg',
                            sublist: [
                                { text:'子菜单1', icon: 'https://randomuser.me/api/portraits/men/31.jpg',
                                sublist: [
                                { text:'子菜单1-1', icon: 'https://randomuser.me/api/portraits/men/31.jpg'},
                                { text:'子菜单1-2', icon: 'https://randomuser.me/api/portraits/men/32.jpg'}
                                ]},
                                { text:'子菜单2', icon: 'https://randomuser.me/api/portraits/men/32.jpg',
                                sublist: [
                                { text:'子菜单2-1', icon: 'https://randomuser.me/api/portraits/men/31.jpg'},
                                { text:'子菜单2-2', icon: 'https://randomuser.me/api/portraits/men/32.jpg'}
                            ]}
                        ]
                        },
                        { text:'文字', icon: 'https://randomuser.me/api/portraits/men/4.jpg'},
                        { 
                            text:'时，',
                            icon: 'https://randomuser.me/api/portraits/men/5.jpg',
                            sublist: [
                                { text:'说明', icon: 'https://randomuser.me/api/portraits/men/51.jpg'},
                                { text:'VNestList组件', icon: 'https://randomuser.me/api/portraits/men/52.jpg'},
                                { text:'可以', icon: 'https://randomuser.me/api/portraits/men/53.jpg'},
                                { text:'正常', icon: 'https://randomuser.me/api/portraits/men/54.jpg'},
                                { text:'工作了', icon: 'https://randomuser.me/api/portraits/men/55.jpg', 
                                click: function (event) {
                                    this.$VMessage.success(event.item.text);
                                }
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            itemclick(event, index) {
                let msg = 'data:' + index + '。' + 'item:' + event.item.text;
                let i = index % 4;
                if (i === 0) this.$VMessage.success(msg);
                if (i === 1) this.$VMessage.info(msg);
                if (i === 2) this.$VMessage.warning(msg);
                if (i === 3) this.$VMessage({
                    duration:0,// 显示时间, 毫秒。默认2000，设为 0 则不会自动关闭
                    type: 'error', // 主题（success、info、warning、error）
                    message: msg, // 消息文字
                    customClass: '', // 自定义类名
                    onClose: null, // 关闭时的回调函数, 参数为被关闭的 message 实例
                    showClose: TextTrackCueList, // 是否显示关闭按钮
                    dangerouslyUseHTMLString: false, // 是否将 message 属性作为 HTML 片段处理
                    center: true // 是否居中
                });
            }
        }
    }
</script>
```
:::

### 测试
:::demo test
```html
<template>
    <v-btn>测试</v-btn>
</template>
```
:::