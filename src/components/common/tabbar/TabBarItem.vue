<template>
<div class="tab-bar-item" @click="itemClick">
    <!-- 每一个item的图片和文字 动态添加 -->
    <div v-if="isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div> 
    <div :style="activeStyle"><slot name="item-text"></slot></div> 
</div>
   
</template>

<script>
export default {
name:'TabBarItem',
props:{
    path:{
        type:String
    },
    activeColor:{
        type:String,
        default:'red'
    }
},
 data() {
    return {
      
    }
  },
  computed:{
      isActive(){
        return  this.$route.path.indexOf(this.path) ===-1
      },
      activeStyle(){
          return this.isActive ? {} : {'color':this.activeColor}
      }
  },
  methods:{
      itemClick(){
          this.$router.push(this.path)
      }

  }
}
</script>

<style>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
    widows: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: 3px;
}

</style>