<template>
<div class="goods-list">
    <goods-list-item v-for="(item,index) in GoodsList" :key="index" :GoodsListItem='item'></goods-list-item>
</div>
  
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
name:'GoodsList',
components:{
    GoodsListItem
},
props:{
    GoodsList:{
        type:Array,
        default(){
            return []
        }
    }
}
}
</script>

<style>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}
</style>