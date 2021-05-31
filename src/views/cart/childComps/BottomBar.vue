<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :isCheck="isSelectAll" @click.native="checkAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: {{ totalPrice }}</span>
    <span class="buy-product">去计算({{ totalCount }})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "BottomBar",
  components: {
    CheckButton,
  },
  computed: {
    //计算总价格
    totalPrice() {
      return this.$store.getters.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.newPrice;
        }, 0)
        .toFixed(2);
    },
    //计算选中的数量
    totalCount() {
      return this.$store.getters.cartList.filter(item => item.checked).length;
    },
    //判断是否全选
    isSelectAll(){
      if(this.$store.getters.cartList.length===0) return false
      return !this.$store.getters.cartList.find(item=>!item.checked)
    }
  },
  methods: {
    checkAll(){
      if(this.isSelectAll){//全部选中  点击之后全部不选中
          this.$store.getters.cartList.forEach(item => item.checked=false);
      }else{
          this.$store.getters.cartList.forEach(item => item.checked=true);

      }
    }
  },
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

 .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>

