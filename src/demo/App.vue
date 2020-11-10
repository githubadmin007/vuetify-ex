<template>
    <v-app id="app">
        <v-navigation-drawer app>
            <v-list-item v-for="(doc,index) in dDocList" :key="index" :to="doc.path">{{doc.name}}</v-list-item>
        </v-navigation-drawer>
        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import navConfig from "./nav.config.json";


@Component
export default class App extends Vue {
    dDocList = navConfig;
}
</script>
