<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
      
    <!-- 底部数据汇总 -->
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'

import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
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
    console.log('--------------')
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
    background-color: #fff;
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>