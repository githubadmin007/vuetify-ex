<template>
    <div class="v-test">
        {{ "data: " + dMsg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        <v-btn @click="Method3">发送事件3</v-btn>
        <br />
        <v-btn @click="Method2">发送事件2</v-btn>
        <br />
        <v-btn @click="Method1">发送事件1</v-btn>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
    name: "VTest",
})
export default class VTest extends Vue {
    private dMsg = "I am a test component~~!!!";

    @Prop({ default: "msgggg!!!" }) private msg!: string;

    Method1() {
        this.$emit("event1", 11);
    }
    Method2() {
        this.$emit("event2", { name: 123, eman: 321 });
    }
    Method3() {
        this.$emit("event3", "33333");
    }
    mounted(){
        console.log("VTest mounted!");
        this.$emit("mounted")
    }
}
</script>
