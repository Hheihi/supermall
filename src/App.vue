<template>
  <div id="app">
    <router-view></router-view>
    <maintabbar></maintabbar>
  </div>
</template>
<script>

import Maintabbar from './components/content/tabbar/Maintabbar'
export default {
  components: { Maintabbar},
}
</script>
<style>

</style>
