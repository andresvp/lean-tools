<template>
    <q-layout>
        <app-header slot="header"></app-header>
        <app-drawer></app-drawer>
        <router-view class="layout-view"></router-view>
    </q-layout>
</template>

<script>
import Header from './modules/Common/Header.vue'
import Drawer from './modules/Common/Drawer.vue'

export default {
  components: {
    appHeader: Header,
    appDrawer: Drawer
  }
}
</script>

<style lang="stylus">

</style>
