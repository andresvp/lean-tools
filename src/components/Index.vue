<template>
    <q-layout>
        <app-Header></app-Header>
        <router-view class="layout-view"></router-view>
    </q-layout>
</template>

<script>
import Header from './Header.vue'

export default {
  components: {
    appHeader: Header
  }
}
</script>

<style>

</style>
