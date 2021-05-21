<template>
  <div class="tab-control" >
      <div class="tab-control-item" 
            v-for="(item,index) in title " :key="index" 
            :class="{active: index === currentIndex}"
            @click="itemClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'TabCortrol',
    props:{
        title:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            //记录当前的index
            currentIndex:0
        }
    },
    methods: {
        itemClick(index){
            this.currentIndex =index,
            this.$emit('tabClick',index)//向父组件发送 方法 点击['流行','新款','精选'] 进行切换
        }
    },
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>