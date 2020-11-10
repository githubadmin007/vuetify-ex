## VContextMenu 右键菜单

### 基本用法

#### 最简单的右键弹框
:::demo 最简单的右键弹框
```html
<template>
    <div style="padding:20px;" v-contextmenu="{menuId:'menu1',RefName:'contextmenu1'}">最简单的右键弹框</div>
    <v-context-menu ref="contextmenu1">
        <v-sheet elevation="5"><p style="padding:10px;">我是最简单的右键弹框的内容</p></v-sheet>
    </v-context-menu>
</template>

<script>
    export default {
        data () {
            return {}
        },
        components: {
            VContextMenu: () => import('../../core/components/VContextMenu')
        },
    }
</script>
```
:::

#### 复杂一点的
:::demo 复杂一点的
```html
<template>
    <div style="padding:20px;" v-contextmenu="{menuId:'menu2',RefName:'contextmenu2'}">复杂一点的</div>
    <v-context-menu ref="contextmenu2">
        <v-sheet elevation="5">
            <v-btn @click="ShowMessage('点击了按钮1','success')">按钮1</v-btn>
            <v-btn @click="ShowMessage('点击了按钮2','error')">按钮2</v-btn>
            <v-btn @click="ShowMessage('点击了按钮3','warning')">按钮3</v-btn>
        </v-sheet>
    </v-context-menu>
</template>
<script>
    export default {
        data () {
            return {}
        },
        components: {
            VContextMenu: () => import('../../core/components/VContextMenu')
        },
        methods: {
            ShowMessage (msg, type) {
                this.$VMessage({
                    type: type, // 主题（success、info、warning、error）
                    message: msg // 消息文字
                });
            },
        }
    }
</script>
```
:::

#### 与NestList结合
:::demo 与NestList结合
```html
<template>
    <div style="padding:20px;" v-contextmenu="{menuId:'menu3',RefName:'contextmenu3',Data:999}">与NestList结合</div>
    <v-context-menu ref="contextmenu3">
        <template slot-scope="{data}">
            <v-nest-list :items="menuItems" @itemclick="itemclick($event, data)"></v-nest-list>
        </template>
    </v-context-menu>
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
                            { 
                                text:'子菜单1', 
                                icon: 'https://randomuser.me/api/portraits/men/31.jpg',
                                sublist: [
                                    { text:'子菜单1-1', icon: 'https://randomuser.me/api/portraits/men/31.jpg'},
                                    { text:'子菜单1-2', icon: 'https://randomuser.me/api/portraits/men/32.jpg'}
                                ]
                            },
                            { 
                                text:'子菜单2',
                                icon: 'https://randomuser.me/api/portraits/men/32.jpg',
                                sublist: [
                                    { text:'子菜单2-1', icon: 'https://randomuser.me/api/portraits/men/31.jpg'},
                                    { text:'子菜单2-2', icon: 'https://randomuser.me/api/portraits/men/32.jpg'}
                                ]
                            }
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
                            { 
                                text:'工作了', 
                                icon: 'https://randomuser.me/api/portraits/men/55.jpg', 
                                click: function (event) {
                                    this.$VMessage.success(event.item.text);
                                }
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            VContextMenu: () => import('../../core/components/VContextMenu')
        },
        methods: {
            itemclick (event, index) {
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
            },
        }
    }
</script>
```
:::


#### data的使用示例
:::demo data的使用示例
```html
<template>
    <v-row>
        <v-col cols="3" v-for="i in 4" :key="'data'+i">
            <v-sheet elevation="5">  
                <div style="padding:20px;" v-contextmenu="{menuId:'menu4',RefName:'contextmenu4',Data:i}">
                    data的使用：{{i}}
                </div>
            </v-sheet>
        </v-col>
    </v-row>
    <v-context-menu ref="contextmenu4">
        <template slot-scope="{data}">
            <v-sheet elevation="5">
                <v-btn @click="ShowMessage(data,'success')">查看序号</v-btn>
            </v-sheet>
        </template>
    </v-context-menu>
</template>

<script>
    export default {
        data () {
            return {}
        },
        components: {
            VContextMenu: () => import('../../core/components/VContextMenu')
        },
        methods: {
            ShowMessage (msg, type) {
                this.$VMessage({
                    type: type, // 主题（success、info、warning、error）
                    message: msg // 消息文字
                });
            },
        }
    }
</script>
```
:::

#### items的使用示例
:::demo items的使用示例
```html
<template>
    <v-row>
        <v-col cols="3" v-for="i in 4" :key="'items'+i">
            <v-sheet elevation="5">  
                <div style="padding:20px;" v-contextmenu="{menuId:'menu5',items:menuItems,click:itemclick,Data:i}">
                    items的使用示例: {{i}}
                </div>
            </v-sheet>
        </v-col>
    </v-row>
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
                            { 
                                text:'子菜单1', 
                                icon: 'https://randomuser.me/api/portraits/men/31.jpg',
                                sublist: [
                                    { text:'子菜单1-1', icon: 'https://randomuser.me/api/portraits/men/31.jpg'},
                                    { text:'子菜单1-2', icon: 'https://randomuser.me/api/portraits/men/32.jpg'}
                                ]
                            },
                            { 
                                text:'子菜单2',
                                icon: 'https://randomuser.me/api/portraits/men/32.jpg',
                                sublist: [
                                    { text:'子菜单2-1', icon: 'https://randomuser.me/api/portraits/men/31.jpg'},
                                    { text:'子菜单2-2', icon: 'https://randomuser.me/api/portraits/men/32.jpg'}
                                ]
                            }
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
                            { 
                                text:'工作了', 
                                icon: 'https://randomuser.me/api/portraits/men/55.jpg', 
                                click: function (event) {
                                    this.$VMessage.success(event.item.text);
                                }
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            VContextMenu: () => import('../../core/components/VContextMenu')
        },
        methods: {
            itemclick (event, index) {
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
            },
        }
    }
</script>
```
:::
