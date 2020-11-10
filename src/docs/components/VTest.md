:::demo 这是一个测试组件，没什么用
```html
    <template>
        <div>
            <v-text-field v-model="msg"></v-text-field>
            <input v-model="msg"/>
            <v-btn @click="alertMsg">click</v-btn>
        </div>
    </template>

    <script>
        export default {
            data () {
                return {
                    msg: 'var demo 1234'
                }
            },
            methods: {
                alertMsg() {
                    alert(this.msg);
                }
            }
        }
    </script>
```
:::