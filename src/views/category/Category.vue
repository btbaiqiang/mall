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