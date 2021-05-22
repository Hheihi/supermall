<template>
  <div id='home'>
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <!-- <scroll class="content"> -->
      <div>
        <home-swiper :banners="banners"></home-swiper>
        <home-recommond :recommends="recommends"></home-recommond>
        <feature-view></feature-view>
        <TabCortrol :title="['流行','新款','精选']" class="tab-cortrol" @tabClick='tabClick'></TabCortrol>
        <goods-list :GoodsList="goodsList[currentType].list" ></goods-list>
      </div>
    <!-- </scroll> -->
  <!-- <ul>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
    <li>16</li>
    <li>17</li>
    <li>18</li>
    <li>19</li>
    <li>110</li>
    <li>111</li>
    <li>112</li>
    <li>113</li>
    <li>114</li>
    <li>115</li>
    <li>116</li>
    <li>117</li>
    <li>118</li>
    <li>119</li>
    <li>120</li>
    <li>121</li>
    <li>122</li>
    <li>123</li>
    <li>124</li>
    <li>125</li>
    <li>126</li>
    <li>127</li>
    <li>128</li>
    <li>129</li>
    <li>130</li>
    <li>131</li>
    <li>132</li>
    <li>133</li>
    <li>134</li>
    <li>135</li>
    <li>136</li>
    <li>137</li>
    <li>138</li>
    <li>139</li>
    <li>140</li>
    <li>141</li>
    <li>142</li>
    <li>143</li>
    <li>144</li>
    <li>145</li>
    <li>146</li>
    <li>147</li>
    <li>148</li>
    <li>149</li>
    <li>150</li>
    <li>151</li>
    <li>152</li>
    <li>153</li>
    <li>154</li>
    <li>155</li>
    <li>156</li>
    <li>157</li>
    <li>158</li>
    <li>159</li>
    <li>160</li>
    <li>161</li>
    <li>162</li>
    <li>163</li>
    <li>164</li>
    <li>165</li>
    <li>166</li>
    <li>167</li>
    <li>168</li>
    <li>169</li>
    <li>170</li>
    <li>171</li>
    <li>172</li>
    <li>173</li>
    <li>174</li>
    <li>175</li>
    <li>176</li>
    <li>177</li>
    <li>178</li>
    <li>179</li>
    <li>180</li>
    <li>181</li>
    <li>182</li>
    <li>183</li>
    <li>184</li>
    <li>185</li>
    <li>186</li>
    <li>187</li>
    <li>188</li>
    <li>189</li>
    <li>190</li>
    <li>191</li>
    <li>192</li>
    <li>193</li>
    <li>194</li>
    <li>195</li>
    <li>196</li>
    <li>197</li>
    <li>198</li>
    <li>199</li>
    <li>1100</li>
  </ul> -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/Navbar.vue'
import TabCortrol from 'components/content/tabCortrol/TabCortrol.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
// import Scroll from 'components/common/scroll/Scroll.vue'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommond from './childComps/HomeRecommond'
import FeatureView from './childComps/Featureview'

import {getHomeMultidata,getGoodsList} from 'network/home.js'



  export default {
    name:'Home',
    components:{
      NavBar,
      TabCortrol,
      GoodsList,
      // Scroll,

      HomeSwiper,
      HomeRecommond,
      FeatureView
    },
    data() {
      return {
        banners:[],
        recommends:[],
        //商品数据
          goodsList: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        }, 
        currentType:'pop' //点击切换 pop new sell
      }
    },
    created() {
      //组件构建完成时 发送网络请求
     this.getHomeMultidata(),
     //请求商品数据
     this.getGoodsList('pop')
     this.getGoodsList('new')
     this.getGoodsList('sell')

    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType='pop'
            break;
          case 1:
            this.currentType='new'
            break;
          case 2:
            this.currentType='sell'
            break;
      
        }
      },
      /**
       * 网络请求相关的 方法
       */
      getHomeMultidata(){
         getHomeMultidata().then((result) => {
          // console.log(result);
          this.banners=result.data.banner.list,
          this.recommends = result.data.recommend.list
      })
      },
      getGoodsList(type){
        const page  =  this.goodsList[type].page+1
        getGoodsList(type,page).then(result=>{
          //将请求来的数据 保存到对应type 的list中  es6语法往数组中遍历添加数据 
          this.goodsList[type].list.push(...result.data.list)
          //每次请求完之后page + 1 
          this.goodsList[type].page+=1
        })
      }
    },
  }
</script>

<style scoped>
  #home {
    /* position: relative; */
    height: 100vh;
  }
  .content {
    position: absolute; 
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
  .tab-cortrol{
    position: sticky;
    top: 0px;
    z-index: 9;
  }
</style>