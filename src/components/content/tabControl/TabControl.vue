<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" 
        :key="index" class="tab-control-itme" 
        使用动态邦定属性:class
        :class="{active:index === currentIndex}"
        @click = "itemClick(index)">
       <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        //当default返回值为数组或者对象时必须是个函数
        default() {
          return []
        }
      }
    },
    data() {
        return {
          currentIndex: 0
        }
    },
    methods: { 
      itemClick(index) {
        this.currentIndex = index
        //子组件传数据到父组件
        this.$emit('tabClick', index)
      } 
    }  
  }
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-itme {
    flex: 1;
   
  }

  .active {
    color: var(--color-high-text);
  }  

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
  
</style>