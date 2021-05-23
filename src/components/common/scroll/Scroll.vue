<template>
  <div class="warpper" ref="warpper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "@better-scroll/core";
import PullUp from '@better-scroll/pull-up';
import PullDown from "@better-scroll/pull-down";
Bscroll.use(PullUp)
Bscroll.use(PullDown)
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scroll: null,
      scrollPromisre: null,
    };
  },
  mounted() {
    // console.log(Bscroll);
    // console.log(this.$refs.warpper);
    //创建scroll 对象 使用promise 封装
    // setTimeout(() => {
    //  this.scroll = new Bscroll(this.$refs.warpper, {
    //     probeType: this.probeType,
    //     click: true,
    //   });
    // }, 500);

    this.scrollPromisre = new Promise(
      (resvole) => {
        setTimeout(() => {
          let newScroll = this.scroll;
          newScroll = new Bscroll(this.$refs.warpper, {
            probeType: this.probeType,
            click: true,
            pullUpLoad: this.pullUpLoad,
          });
          resvole(newScroll);
        }, 100);
      },
      (reject) => {
        reject(document.write('加载失败'));
      }
    );
    this.scrollPromisre.then(
      (data) => {
        //监听滚动的位置
        data.on("scroll", (position) => {
          // console.log(position);
          //将位置 发射出去 那个组件想用 直接拿
          this.$emit("scroll", position);
        });
      },
      (err) => {
         document.write(err)
      }
    );
    this.scrollPromisre.then(
      (data) => {
        //上拉加载更多
        data.on("pullingUp", () => {
          this.$emit("pullingUp");
          //继续加载更多
          data.finishPullUp();
        });
      },
      (err) => {
        document.write(err)
      }
    );
  },
  methods: {
    //回到顶部
    scrollto(x, y, time) {
      this.scrollPromisre.then(
        (data) => {
          data.scrollTo(x, y, time);
        },
        (err) => {
           document.write(err)
        }
      );
    },
    //图片加载刷新
    refresh(){
      this.scrollPromisre.then(
        (data) => {
          // console.log('---');
          data.refresh();
        },
        (err) => {
           document.write(err)
        }
      );
    },
    //获取滚动的距离 路由切换时保持不变
    getSaveY(){
      this.scrollPromisre.then(
        (data) => {
          // console.log(data.y);
          data.y
        },
        (err) => {
           document.write(err)
        }
      );
    }
  },
};
</script>

<style scoped>
</style>