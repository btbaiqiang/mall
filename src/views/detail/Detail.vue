<template>
  <div class="detail" ref="detail">
    <detail-nav-bar @titleClick="titleClick"  ref="nav"/>
    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scroll="contentScrool"> 
      <detail-swiper :top-images="topImages" />
      <detail-goods :goods="goods"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detailInfo="detailInfo" 
                          @itemloadImage="loadImg"/>
      <detail-params-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info  ref="comment" :comment="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll> 
    <detail-bottom-bar @addEvent="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

import DetailNavBar from './childComps/DetaiINavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailGoods from './childComps/DetailGoods'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

// import BackTop from 'components/content/backTop/BackTop'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, getRecommend, Goods} from 'network/detail'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoods,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // isShowBackTop: false,
    }
  },
  created() {
    // console.log(this.$route.params)
    //1、保存传入的iid
    this.iid = this.$route.params.id

    //2、根据iid取出详情页全部数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      let data = res.result
      // 1、获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages
      
      //2、获取商品详细信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3、获取商家信息
      this.shopInfo = data.shopInfo

      //4、取出商品详情页图片
      this.detailInfo = data.detailInfo;
      
      //5、取出商品的参数信息
      this.paramInfo = data.itemParams;

      //6、抽取评论信息
      if (data.rate.cRate != 0) {
         this.commentInfo = data.rate.list[0]
      }

      this.getThemeTopY = debounce(() => {
        
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs)
      }, 200)
    })
    
    //请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommend = res.data.list
    })

    this.$nextTick(() => {
   
    })
  },
  mounted() {
      //引用混入如下代码
      // let newRefresh = debounce(this.$refs.scroll.refresh, 100)

      // // 对监听的事件进行保存
      // this.itemImageListener = () => {
      //     // console.log('我是混入对象')
      //     newRefresh()
      // }
      // this.$bus.$on('itemloadImage', this.itemImageListener)   
  },
  updated() {
  },
  destroyed() {
    //this.itemImageListener通过混入传过来的值
    this.$bus.$off('itemloadImage', this.itemImageListener)
  },
  methods: {
    loadImg() {
      this.newRefresh()
      // this.$refs.scroll.refresh()
      this.getThemeTopY()
    },

    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index] - 46), 300)
      // console.log(index)

    },
    
    contentScrool(position) {
      // 1、获取scrool借坐标Y值
      const positionY = -position.y
      
      //positionY和主主题中值进行对比
      let length = this.themeTopYs.length
      for (let i=0; i<length; i++) {
        if(this.currentIndex !== i ) {
          if ((i < length && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length -1 && positionY >=this.themeTopYs[i])) {
            this.currentIndex = i
          }
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 1、判断BackTop是否显示
      this.listenShowBackTop(position)
    },
    //监听添加商品到购物车
    addToCart() {
      //1、获取购物车商品信息
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      // console.log(product)
      // 2、将商品添加到购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product)
    }

    //BackTop回到顶部
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 800)
    // },
  }
}
</script>

<style scoped>
  .detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 44px - 49px);
  }
</style>