<template>
  <div id="detail">
    <DetailTitle @titleClick="titleClick" ref="title"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="titleScroll">
      <DetailSwiper ref="base" :topImage="topImage" />
      <DetailBaseInfo :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-image-info
        :imageInfo="imageInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommand" :GoodsList="recommand" />
    </scroll>
    <!-- 回到顶部按钮 -->
    <Backtop @click.native="backClick" v-show="isShow"></Backtop>

    <DetailBottomBar @addCart="addCart"/>

  </div>
</template>

<script>
import DetailTitle from "./childComps/DetailTitle";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
// import DetailRecommandInfo from './childComps/DetailRecommandInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodsList from "components/content/goods/GoodsList.vue";

import Scroll from "components/common/scroll/Scroll.vue";
import { getDetails, getRecommand, Goods, Shop } from "network/detail.js";
import { itemListener ,backTop} from "../../common/utils/mixin";
import { debounce } from "../../common/utils/debounce";

export default {
  name: "Detail",
  data() {
    return {
      id: null, //传入的id
      topImage: [], //轮播图
      goods: {}, //商品信息
      shop: {}, //店铺信息
      imageInfo: {}, //商品图片信息
      paramInfo: {}, //商品参数信息
      commentInfo: {}, //商品评论信息
      recommand: [], //推荐信息
      themeTops: [], //详情页面 标题对应高度
      getThemeTopY: null,
    };
  },
  components: {
    DetailTitle,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    // DetailRecommandInfo,
    GoodsList,
    Scroll,
  },
  mixins: [itemListener,backTop],
  created() {
    //1.保存传入的iid
    this.id = this.$route.query.iid;
    //发送网络请求
    getDetails(this.id)
      .then((res) => {
        // console.log(res);
        const data = res.result;
        //轮播图
        this.topImage = data.itemInfo.topImages;
        //商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //店铺信息
        this.shop = new Shop(data.shopInfo);
        //商品照片展示
        this.imageInfo = data.detailInfo;
        //商品参数信息
        this.paramInfo = data.itemParams;
        //商品评论信息
        this.commentInfo = data.rate;
      })
      .catch((err) => {
        console.log(err);
      });
    //获取推荐信息
    getRecommand()
      .then((result) => {
        // console.log(result);
        this.recommand = result.data.list;
      })
      .catch((err) => {
        console.log(err);
      });
    this.getThemeTopY = debounce(() => {
      this.themeTops = [];
      this.themeTops.push(this.$refs.base.$el.offsetTop);//i = 0
      this.themeTops.push(this.$refs.params.$el.offsetTop);//i=1
      this.themeTops.push(this.$refs.comment.$el.offsetTop);//i=2
      this.themeTops.push(this.$refs.recommand.$el.offsetTop);//i=3
      this.themeTops.push(Number.MAX_VALUE)
      // console.log( this.themeTops);
    }, 100);
  },
  destroyed() {
    this.$bus.$off("imgItemLoad", this.imgItemLoadListener);
  },
  methods: {
    detailImageLoad() {
      // console.log("11111");
      this.refresh();
      this.getThemeTopY();
    },
    //点击标题跳转到对应的页面
    titleClick(index) {
      this.$refs.scroll.scrollto(0, -this.themeTops[index], 200);
    },
    //滑动页面 标题对应改变
    titleScroll(position){
      let positionY = -position.y;
      let length = this.themeTops.length
      for (let i = 0; i < length-1; i++) {
        if (positionY >= this.themeTops[i] && positionY < this.themeTops[i+1]) {
            //将i 赋值给 title 中的currentIndex
            this.$refs.title.currentIndex = i;
          }
      }
      //回到顶部按钮的显示和隐藏
      this.isShow = (-position.y) > 1000;

    },
    //将商品加入到购物车
    addCart(){
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.id;
        obj.imgURL = this.topImage[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;
        // 3.添加到Store中
        this.$store.dispatch('addCart', obj)
    }
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
}

.back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
}
</style>