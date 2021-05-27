<template>
<div>
    <goods-list :GoodsList="recommand"></goods-list>
</div>
  
</template>

<script>
import GoodsList from "components/content/goods/GoodsList.vue";
export default {
  name: "DetailRecommandInfo",
  props: {
    recommand: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsList,
  },
};
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>