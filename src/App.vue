<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
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
