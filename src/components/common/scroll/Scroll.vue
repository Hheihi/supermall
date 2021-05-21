<template>
 <div class="warpper" ref="warpper">
     <slot></slot>
 </div>
          
 
</template>

<script>
import Bscroll from 'better-scroll'
export default {
    name:'Scroll',
    mounted() {
        console.log(Bscroll);
        // console.log(this.$refs.warpper);
        new Bscroll(this.$refs.warpper,{

        })
    },
}
</script>

<style scoped>

</style>