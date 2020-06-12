<template>
  <div class="wrapper" ref="wrapper">
    <div>
      
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Category',
    data() {
      return{
        scroll: null
      }
    },
    created() {
   
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'), {
        probeType: 3,
        pullUpload: true
      })
      this.scroll.on('scroll', (position) => {
        // console.log(position)
      })

      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多')
      })
    },
  
  }  
</script>

<style>
  
  .wrapper {
    height: 150px;
    background-color: red;

   

    /*overflow-y: scroll;*/
  }

</style>