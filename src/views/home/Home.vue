<template>
  <div id="home">
    <nav-bar  class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends" />
    <feature-view/>
    <tab-control  class="tab-control" :titles="['流行','新款','精选']" />
    <ul>
      <li>cccccccccc</li>
      <li>b</li>
      <li>c</li>
      <li>c</li>
      <li>c</li>
      <li>c</li>
      <li>c</li>
      <li>c</li>
      <li>c</li>
      <li>c</li>
      <li>c</li>
      <li>c</li>
      <li>c</li>
      <li>cc</li>
      <li></li>
      <li>cc</li>
      <li>dd</li>
      <li>dd</li>
      <li>dd</li>
      <li>dd</li>
      <li>dd</li>
      <li>dd</li>
      <li>dd</li>
      <li>bbbb</li>
      <li>bbbbbbbbbb</li>
      <li>aaa</li>
    </ul>  
  </div>
</template>

<script>
  //公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  //子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  //常用方法
  import {getHomeMultidata} from 'network/home'
  

  export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    // 他用data()接收promise返回的数据
    data() {
      return {
        banners: [],
        recommends: [],
      }
    },
    //页面创建时使用生命周期函数发起请求
    created() {
      //1、请求多个数据(返回promise)
      getHomeMultidata().then(res => {
        console.log(res);
        //将promise返回的res赋值给result
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

</style>