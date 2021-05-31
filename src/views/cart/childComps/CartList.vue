<template>
    <Scroll class="content">
        <cart-list-item v-for="item in cartList" :key="item.id" :productItem="item"></cart-list-item>
    </Scroll>

</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import CartListItem from './CartListItem'
export default {
name:"CartList",
props:{
    cartList:{
        type:Array,
        default(){
            return []
        }
    }
},
components:{
    Scroll,
    CartListItem
}
}
</script>

<style scoped>
</style>