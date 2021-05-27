<template>
    <div id="tab-bar">
        <!-- 插槽 存放所有的tabbaritem -->
        <slot></slot>
    </div>
</template>

<script>
export default {
name:'TabBar'
}
</script>

<style>
@import '~assets/css/base.css';
#tab-bar{
  background-color: #f6f6f6;
  box-shadow: 0px -1px 1px rgba(150, 150,150,.2);
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
}

</style>