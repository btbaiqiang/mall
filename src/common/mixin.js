import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null
    }
  },
  mounted() {
    //3、监听item中图片加载完成/利用事件总线接收其他组件中发出来的事件
   this.newRefresh = debounce(this.$refs.scroll.refresh, 100)

   // 对监听的事件进行保存
   this.itemImageListener = () => {
      // console.log('我是混入对象')
      this.newRefresh()
   }
   this.$bus.$on('itemloadImage', this.itemImageListener)
 },
}

export const backTopMixin = {
  components: {BackTop},
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 800)
    },

    listenShowBackTop(position) {
       // 1、判断BackTop是否显示
       this.isShowBackTop = (-position.y) > 1000
    }
  }
}