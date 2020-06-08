<template>
  <div id="home">
    <nav-bar  class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends" />
    <feature-view/>
    <tab-control  class="tab-control" :titles="['流行','新款','精选']" />
    <goods-list :goods="goods['pop'].list " />
    <ul>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
      <li>列表清单</li>
    </ul>  
  </div>
</template>

<script>
  //公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  //子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  //常用方法
  import {getHomeMultidata, getHomeGoods} from 'network/home'
  

  export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    // 他用data()接收promise返回的数据
    data() {
      return {
        //轮播图
        banners: [],
        //推荐
        recommends: [],
        //商品
        goods: {
          'pop': {page: 0 , list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        }
      }
    },
    //页面创建时使用生命周期函数发起请求
    created() {
      //1、请求多个数据(返回promise)
      // getHomeMultidata().then(res => {
      //   console.log(res);
      //   //将promise返回的res赋值给result
      //   this.banners = res.data.banner.list;
      //   this.recommends = res.data.recommend.list;
      // }),
      // //请求商品数据
      // getHomeGoods('pop', 1).then(res => {
      //   console.log(res)
      // })
      //1、请求多个数据(返回promise)
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
       //1、请求多个数据(返回promise)
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        // console.log(res);
        //将promise返回的res赋值给result
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        })
      }, 
      //请求商品数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
        //他用push压将一个列表压入到另一个列表
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
      }
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

  .tab-control {
    position: sticky;
    top: 44px;
  }

</style>