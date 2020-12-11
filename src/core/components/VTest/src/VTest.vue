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
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
        <br />
        {{ 'prop: ' + msg }}
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
}
</script>
