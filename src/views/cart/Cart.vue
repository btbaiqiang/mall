<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar
  },

  computed: {
    //getters两种语法
    // ...mapGetters(['cartLength', 'carList'])
    ...mapGetters({
      length: 'cartLength',
      list: 'carList'
    })
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
  }
</style>