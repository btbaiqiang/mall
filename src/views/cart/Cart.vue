<template>
  <div class="cart">
    <!-- 购物导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品的列表 可滚动区域-->
    <scroll class="content" ref="scroll" :changeClick=true>
      <cart-list></cart-list>
    </scroll>
      
    <!-- 底部数据汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartButtonBar'

import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
  },

  computed: {
    //getters两种语法
    // ...mapGetters(['cartLength', 'carList'])
    ...mapGetters({
      length: 'cartLength',
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: relative;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
  }

   .content {
    /* background-color: #fff; */
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>