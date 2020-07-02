<template>
  <div id="detail-nav-bar">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" 
              class="title-item" 
              :class="{active: index === currentIndex}"
              @click="titleClick(index)">
            {{ item }}
      </div>
    </div>
  </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: { 
    titleClick(index) {
      this.currentIndex = index
      //发出点击事件监听顶部标题的变化 
      // console.log(index)
      this.$emit('titleClick', index)
    },
    backClick() {
      //使用$router返回上一页
      this.$router.back()
    } 
  }
}
</script>

<style scoped>
  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text)
  }

  .back img {
    margin-top: 12px;
  }
</style>

