<template>
 
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control  class="tab-control" 
              :titles="['流行','新款','精选']"
              @tabClick="tabClick" 
              ref="tabControl1" v-show="isTabFixed" />
    <scroll class="content" 
            ref="scroll"
            :probeType="3" 
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore"> 
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad' />
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control  class="tab-control" 
                    :titles="['流行','新款','精选']"
                    @tabClick="tabClick" 
                    ref="tabControl2" />
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
      FeatureView,
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
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
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
      const refresh = this.debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemloadImage', () => {
        refresh()
      })
    },
    methods: {
      /**
       *事件监听的相关方法
       */
      debounce(func, delay) {
        let timer = null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this,args)     
          }, delay)
        }
      },
      
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      //BackTop回到顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 800)
      },
      //BackTop组件的显示与隐藏
      contentScroll(position) {
        // 1、判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        
        //2、决定tabControl是否吸顶(position: fixed) 
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //滚动加载更多
      loadMore() {
        // console.log('加载更多')
        //调用网络请求函数并传入当前监听的类型
        this.getHomeGoods(this.currentType)

        // this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad() {
         //2、获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroyed')
    },
    activated() {
      //激活回到刚才的位置
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      //滚动刷新
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //释放时记录Y轴的位置
      this.saveY = this.$refs.scroll.getScrollY()
    },
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
    /** 使用浏览器原生滚动使用的样式。*/
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

  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>
