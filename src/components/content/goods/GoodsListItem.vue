<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="loadImage">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: { 
      // 监听图片加载完成
      loadImage() {
        //使用事件总线发射一个事件到总线中，必须在main.js里进行原型new
        this.$bus.$emit('itemloadImage')
        // if (this.$route.path.indexOf('/home')) {
        //   this.$bus.$emit('itemloadImage')
        // }
        
      },
      itemClick() {
        // console.log(this.goodsItem)
        if (this.goodsItem.iid) {
          this.$router.push('/detail/' + this.goodsItem.iid)
        }else {
          this.$router.push('/detail/' + this.goodsItem.item_id)
        }
         
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>


    //  loadImage() {
    //     //使用事件总线发射一个事件到总线中，必须在main.js里进行原型new
    //     根据路由发出不同地
    //     if (this.$route.path.indexOf('/home')) {
    //       this.$bus.$emit('homeItemloadImage')
    //     }else if (this.$route.indexOf('/detail')) {
    //       this.$bus.$emit('detailItemloadImage')
    //     }
        
    //   },
    //   itemClick() {
    //     console.log(this.goodsItem)
    //     if (this.goodsItem.iid) {
    //       this.$router.push('/detail/' + this.goodsItem.iid)
    //     }else {
    //       this.$router.push('/detail/' + this.goodsItem.item_id)
    //     }
         
    //   }