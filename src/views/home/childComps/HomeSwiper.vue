<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isImg:true
    }
  },
  methods: {
    imgLoad(){
      if(this.isImg){
        // console.log('---');
        this.$emit('swiperImgLoad')
        this.isImg=false
      }
      
    }
  },
};
</script>

<style scoped>
</style>
