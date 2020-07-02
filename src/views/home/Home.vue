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
            :changeClick="true"
            @pullingUp="loadMore"> 
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad' />
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control  :class="{fixed: isTabFixed}" 
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
  // import BackTop from 'components/content/backTop/BackTop'
  //子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  //常用方法
  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  

  export default {
    name: 'Home',
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,
    },
    //利用vue里的混入
    mixins: [itemListenerMixin, backTopMixin],
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
        // isShowBackTop: false,
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
      //利用混入传入如下代码
       //3、监听item中图片加载完成/利用事件总线接收其他组件中发出来的事件
      // let newRefresh = debounce(this.$refs.scroll.refresh, 100)

      // // 对监听的事件进行保存
      // this.itemImageListener = () => {
      //     // console.log('我是混入对象')
      //     newRefresh()
      // }
      // this.$bus.$on('itemloadImage', this.itemImageListener)
        },
    destroyed() {
      console.log('home destroyed')
    },
    activated() {
      //激活回到刚才的位置
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      // console.log(this.saveY)
      //滚动刷新
      
    },
    deactivated() {
      //释放时记录Y轴的位置
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY) 
      // 2、取消全局事件监听
      this.$bus.$off('itemloadImage', this.itemImageListener)
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      //BackTop回到顶部
      // backClick() {
      //   this.$refs.scroll.scrollTo(0, 0, 800)
      // },
      //BackTop组件的显示与隐藏
      contentScroll(position) {
        // 1、判断BackTop是否显示
        this.listenShowBackTop(position)
        
        //2、决定tabControl是否吸顶(position: fixed) 
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //滚动加载更多
      loadMore() {
        // console.log('加载更多')
        //调用网络请求函数并传入当前监听的类型
        this.getHomeGoods(this.currentType)
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
  }
</script>

<style scoped>
  #home {
    /**
    * 有了BS之后，可以不需要这2个 
    * padding-top: 44px;
    * padding-bottom: 49px;
    * 下方BS的.wrapper样式里就有 top44 bottom49
    */
    /* 一定要有home的高度，否则其子对象wrapper无法正确显示 */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 使用浏览器原生滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    height: calc(100% - 44px - 49px);
    position: absolute;
    /* top: 44px;
    bottom: 49px;
    left: 0;
    right: 0; */
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>
