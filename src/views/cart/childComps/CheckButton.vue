<template>
  <div>
    <div
      class="icon-selector"
      :class="{ 'selector-active': checked }"
      @click="selectItem"
    >
      <img src="~/assets/image/cart/tick.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isCheck: {
      type: Boolean,
    },
  },
  data() {
    return {
      checked: this.isCheck,
    };
  },
  methods: {
    selectItem() {
      this.$emit("checkBtnClick");
      this.$emit("checkAll")
    },
  },
  watch: {
    isCheck(newValue) {
      this.checked = newValue;
    },
  },
};
</script>

<style scoped>
.icon-selector {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}

.selector-active {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>