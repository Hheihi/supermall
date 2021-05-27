<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <TabCortrol
        :title="['流行', '新款', '精选']"
        class="tab-cortrol"
        @tabClick="tabClick"
        ref="tabCortrol1"
        v-show="isShowTabCortrol"
      ></TabCortrol>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad = 'swiperImgLoad'></home-swiper>
      <home-recommond :recommends="recommends"></home-recommond>
      <feature-view></feature-view>
      <TabCortrol
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabCortrol2"
      ></TabCortrol>
      <goods-list :GoodsList="goodsList[currentType].list"></goods-list>
    </scroll>
    <!-- .native  监听原生组件的点击事件  回到顶部按钮-->
    <Backtop @click.native="backClick" v-show="isShow"></Backtop>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/Navbar.vue";
import TabCortrol from "components/content/tabCortrol/TabCortrol.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import Backtop from "components/content/backtop/Backtop.vue";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommond from "./childComps/HomeRecommond";
import FeatureView from "./childComps/Featureview";

import { getHomeMultidata, getGoodsList } from "network/home.js";
import {itemListener} from '../../common/utils/mixin'
export default {
  name: "Home",
  components: {
    NavBar,
    TabCortrol,
    GoodsList,
    Scroll,
    Backtop,

    HomeSwiper,
    HomeRecommond,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      //商品数据
      goodsList: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop", //点击切换 pop new sell,
      isShow: false, //回到顶部按钮的隐藏或显示  默认隐藏
      tabCortrolTop:0 ,//计算 TabCortrolTop 滚动的高度
      isShowTabCortrol:false,//投机取巧之术  默认隐藏
      saveY:0, //路由切换时 保持不变 保存当前位置
    };
  },
  created() {
    //组件构建完成时 发送网络请求
    this.getHomeMultidata(),
      //请求商品数据
      this.getGoodsList("pop"),
      this.getGoodsList("new"),
      this.getGoodsList("sell");
  },
  mounted() {

  },
  methods: {
    /**
     * 事件监听相关的方法
     */

    //类型切换
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabCortrol1.currentIndex = index
      this.$refs.tabCortrol2.currentIndex = index
    },
    //回到顶部
    backClick() {
      //直接调用这个组件
      this.$refs.scroll.scrollto(0, 0, 500);
      // console.log(this.$refs.scroll.scroll);
    },
    //回到顶部按钮的隐藏与显示
    contentScroll(position) {
      // console.log(position);
      //1.计算回到顶部按钮的隐藏与显示 大于1000px时 显示
      this.isShow = (-position.y) > 1000;
        // 2.计算tabCortrolTop 滚动的高度
      this.isShowTabCortrol = (-position.y) > this.tabCortrolTop
    },
    //上拉加载更多
    loadMore() {
      this.getGoodsList(this.currentType);
      //刷新 加载更多
      this.$refs.scroll.refresh();
    },
    swiperImgLoad(){
      this.tabCortrolTop = this.$refs.tabCortrol2.$el.offsetTop
    },
    /**
     * 网络请求相关的 方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((result) => {
        // console.log(result);
        (this.banners = result.data.banner.list),
          (this.recommends = result.data.recommend.list);
      });
    },
    getGoodsList(type) {
      const page = this.goodsList[type].page + 1;
      getGoodsList(type, page).then((result) => {
        //将请求来的数据 保存到对应type 的list中  es6语法往数组中遍历添加数据
        this.goodsList[type].list.push(...result.data.list);
        //每次请求完之后page + 1
        this.goodsList[type].page += 1;
      });
    },
  },
  activated() {
    //路由活跃 调用scroll组件中的scrollto 方法
     this.$refs.scroll.scrollto(0,this.saveY,0)
     this.$refs.scroll.refresh()
  },
  mixins:[itemListener],
  deactivated() {
    //路由销毁
    //拿到切换 之前 的滑动的Y值
    // console.log(this.$refs.scroll.scroll);
    this.$bus.$off("imgItemLoad",this.imgItemLoadListener)
    this.saveY = this.$refs.scroll.getSaveY()
  }
};
</script>

<style scoped>
#home {
  /* position: relative; */
  height: 100vh;
}
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.tab-control{
  position: relative;
  top: 0;
  right: 0;
  left: 0;
}
</style>