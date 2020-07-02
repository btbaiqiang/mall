<template>
  <div id="home">
    <nav-bar  class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" 
            ref="scroll"
            :probeType="3" 
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore"> 
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control  class="tab-control" 
                    :titles="['流行','新款','精选']"
                    @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>
    <!--他用native监听组件根元素的原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  //公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'
  //子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  //常用方法
  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  

  export default {
    name: 'Home',
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
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
        },
        currentType: 'pop',
        isShowBackTop: false,
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
      //2、请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
       //3、监听item中图片加载完成/利用事件总线接收其他组件中发出来的事件
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('itemloadImage', () => {
        // console.log('***************')
        refresh()
      })
    },
    methods: {
      /**
       *事件监听的相关方法
       */
      
      //监听TabControl组件传过来的事件数据
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      //BackTop回到顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 800)
      },
      //BackTop组件的显示与隐藏
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
        // console.log(this.isShowBackTop)
      },
      //滚动加载更多
      loadMore() {
        // console.log('加载更多')
        //调用网络请求函数并传入当前监听的类型
        this.getHomeGoods(this.currentType)
      },

      /**
       *网络请求相关方法
       */ 

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
        this.$refs.scroll.finishPullUp()
      })
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
  }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
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

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
