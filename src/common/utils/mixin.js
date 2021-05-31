import {debounce} from './debounce'
import Backtop from "components/content/backtop/Backtop.vue";

export const itemListener = {
    data() {
        return {
            imgItemLoadListener:null,
            refresh:null
        }
    },
    mounted() {
        //监听图片加载 加载一张就刷新  使用防抖函数之后
      this.refresh =  debounce(this.$refs.scroll.refresh,200)
      this.imgItemLoadListener = () => {
        this.refresh();
    }
      this.$bus.$on("imgItemLoad", this.imgItemLoadListener);
      // console.log("12112");
    }
}

export const backTop = {
  data() {
    return {
      isShow: false, //回到顶部按钮的隐藏或显示  默认隐藏
      
    }
  },
  components:{
    Backtop
  },
  methods: {
    //回到顶部
  backClick() {
    //直接调用这个组件
    this.$refs.scroll.scrollto(0, 0, 500);
    // console.log(this.$refs.scroll.scroll);
  },
  },
  
}