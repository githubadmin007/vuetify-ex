<template>
    <component
        v-bind:is="`v-${mode}`"
        offset-y
        v-model="dShow"
        :close-on-content-click="false"
        :nudge-right="40"
        :disabled="disabled"
        transition="scale-transition"
        width="290px"
        min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                v-on="on"
                v-bind:value="value"
                :label="label"
                :disabled="disabled"
                :clearable="clearable"
                :dense="dense"
                :outlined="outlined"
                :readonly="readonly"
                :rules="rules"
            >
            </v-text-field>
        </template>
        <v-date-picker v-bind:value="value" @input="Input"></v-date-picker>
    </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
    name: "VDateTime",
})
export default class VDateTime extends Vue {
    @Prop({ default: "menu" }) private mode!: string; // 弹出模式(menu、dialog)
    @Prop() private value!: string;
    @Prop() private disabled!: boolean;
    @Prop({ default: true }) private clearable!: boolean;
    @Prop({ default: true }) private dense!: boolean;
    @Prop({ default: true }) private outlined!: boolean;
    @Prop({ default: true }) private readonly!: boolean;
    @Prop() private label!: string; // 文字标签
    @Prop() private rules!: Array<any>; // 限制规则

    dShow = false;

    Input(value: string) {
        this.dShow = false;
        this.$emit("input", value);
    }
}
</script>
