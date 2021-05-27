import {debounce} from './debounce'
export const itemListener = {
    data() {
        return {
            imgItemLoadListener:null
        }
    },
    mounted() {
        //监听图片加载 加载一张就刷新  使用防抖函数之后
      let refresh =  debounce(this.$refs.scroll.refresh,200)
      this.imgItemLoadListener = () => {
        refresh();
    }
      this.$bus.$on("imgItemLoad", this.imgItemLoadListener);
      console.log("12112");
    }
      
}