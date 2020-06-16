<template>
  <div id="detail">
    <detail-nav-bar />
    <detai-swiper :top-images="topImages" />
    <detai-goods :goods="goods"/>
  </div>
</template>

<script>

import DetailNavBar from './childComps/DetaiINavBar'
import DetaiSwiper from './childComps/DetailSwiper'
import DetaiGoods from './childComps/DetailGoods'

import {getDetail, Goods} from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetaiSwiper,
    DetaiGoods
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {}
    }
  },
  created() {
    // console.log(this.$route.params)
    //1、保存传入的iid
    this.iid = this.$route.params.id

    //2、根据iid请求详情页数据
    getDetail(this.iid).then(res => {
      console.log(res)
      let data = res.result
      // 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages
      
      //获取商品详细信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
  }
}
</script>

<style>

</style>