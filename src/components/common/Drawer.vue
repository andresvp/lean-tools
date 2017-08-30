<template>
  <div>
  <!--
    Use <q-side-link> component 
    instead of <q-item> for 
    internal vue-router navigation
  -->  
    <q-list no-border link inset-delimiter>
      <div class="row flex-center bg-white" style="width: 100%; height: 110px;"><img src="~assets/L.png" style="height: 75px;"> <div style="margin-left: 15px;">Lean Tools</div></div>
      <q-list-header>Essential Links</q-list-header>
      <q-side-link item to="/home">
        <q-item-side icon="home" />
        <q-item-main label="Home" sublabel="General Information" />
      </q-side-link>
      <q-side-link item to="/takt">
        <q-item-side icon="school" />
        <q-item-main label="Takt Time" sublabel="Simple Takt Calc" />
      </q-side-link>
      <q-side-link item to="/pareto">
        <q-item-side icon="message" />
        <q-item-main label="Pareto" sublabel="80 / 20 Chart" />
      </q-side-link>
    </q-list>
  </div>
</template>

<script>

import {
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QSideLink
} from 'quasar'

export default {
  name: 'drawer',
  components: {
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink
  }
}
</script>

<style>

</style>
