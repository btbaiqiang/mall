<template>
  <div class="cart-list">
      <cart-list-item v-for="(item, index) in cartList" :itemInfo="item" :key="index" />
  </div>
</template>

<script>

import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'

export default {
  name: 'CartList',
  components: {
    CartListItem
  },
  computed: { 
    ...mapGetters(['cartList']) 
  },

}
</script>

<style scoped>
  .cart-list {
    height: (100% - 44px - 49px);
  }
 
</style>