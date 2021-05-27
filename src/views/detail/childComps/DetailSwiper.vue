<template>
  <swiper class="detail-swiper">
    <swiper-item  class="item" v-for="(item, index) in topImage" :key="index">
        <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props:{
    topImage:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>

<style scoped>
 .item {
    text-align: center;
    height: 300px;
  }
</style>
