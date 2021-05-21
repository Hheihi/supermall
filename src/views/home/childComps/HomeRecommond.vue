<template>
  <div class="recommond">
      <div class="recommond-item" v-for="item in recommends" :key=item.sort>
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:'HomeRecommond',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.recommond {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
  }

  .recommond-item {
    flex: 1;
    text-align: center;
  }

  .recommond img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>