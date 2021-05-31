<template>
  <Navbar class="detail-nav">
    <div class="back" slot="left" @click="backClick">
      <img src="~assets/image/common/back.svg" alt="" />
    </div>
    <div slot="center" class="title">
      <div
        class="title-item"
        v-for="(item, index) in titles"
        :key="index"
        @click="itemClick(index)"
        :class="{ active: index === currentIndex }"
      >
        {{ item }}
      </div>
    </div>
  </Navbar>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";

export default {
  name: "DetailTitle",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick",index)
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.detail-nav {
  background-color: #fff;
  font-weight: normal;
}

.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.back img {
  position: absolute;
  top: 50%;
  transform: translateY(50%);
}
.back {
  position: relative;
}

.active {
  color: var(--color-high-text);
}
</style>