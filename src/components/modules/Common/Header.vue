<template>
        <div class="toolbar">
          <!-- opens drawer using its ref -->
          <button class="hide-on-drawer-visible" @click="drawer.open()">
            <i>menu</i>
          </button>
          <q-toolbar-title :padding="2">
            Lean App Tools
          </q-toolbar-title>
          <button>
            <i>mail</i>
          </button>
          <button>
            <i>alarm</i>
          </button>
        </div>
</template>

<script>
  export default {
    computed: {
      drawer () {
        return this.$parent.$children[1].$refs.leftDrawer
      }
    }
  }
</script>

<style lang="stylus">
  
</style>
