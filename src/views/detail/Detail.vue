<template>
  <div id="detail">
    <DetailTitle />
    <scroll class="content" ref="scroll">
      <DetailSwiper :topImage="topImage" />
      <DetailBaseInfo :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-image-info :imageInfo="imageInfo" />
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo"/>
      <goods-list :GoodsList="recommand"/>
    </scroll>
  </div>
</template>

<script>
import DetailTitle from "./childComps/DetailTitle";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from './childComps/DetailCommentInfo'
// import DetailRecommandInfo from './childComps/DetailRecommandInfo'


import GoodsList from "components/content/goods/GoodsList.vue";

import Scroll from "components/common/scroll/Scroll.vue";
import { getDetails, getRecommand,Goods, Shop } from "network/detail.js";
import {itemListener} from '../../common/utils/mixin'

export default {
  name: "Detail",
  data() {
    return {
      id:null,//传入的id
      topImage: [], //轮播图
      goods: {}, //商品信息
      shop: {}, //店铺信息
      imageInfo: {}, //商品图片信息
      paramInfo: {}, //商品参数信息
      commentInfo:{},//商品评论信息
      recommand:[]//推荐信息
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
    // DetailRecommandInfo,
    GoodsList,
    Scroll,
  },
  mixins:[itemListener],
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

      getRecommand().then((result) => {
        // console.log(result);
        this.recommand = result.data.list
      }).catch((err) => {
        console.log(err);
      });
  },
  destroyed() {
    this.$bus.$off("imgItemLoad",this.imgItemLoadListener)
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
  bottom: 60px;
}

.back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
}
</style>