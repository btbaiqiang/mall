<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :isChecked="isSelectAll" />
    <span>全选</span>
    <span class="total-price">合计: {{totalPrice}}</span>
    <span class="buy-product">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  computed: {
    //将cartList映射过来
    ...mapGetters(["cartList"]),

    // 合计
    totalPrice() {
      return (
        "¥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.count * item.price;
          }, 0)
          .toFixed(2)
      );
    },
    // 去计算
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    // 是否全选中
    isSelectAll() {
      // return this.cartList.find(item => item.checked === false).length === undefined;
      if (this.cartList.length === 0) {
        return undefined;
      }
      return this.cartList.find(item => item.checked === false) ? false : true;
    }
  },
  methods: {
    checkBtnClick() {
      // 1.判断是否有未选中的按钮
      let isSelectAll = this.cartList.find(item => !item.checked);
      // 2.有未选中的内容, 则全部选中
      if (isSelectAll) {
        this.cartList.forEach(item => {
          item.checked = true;
        });
      } else {
        this.cartList.forEach(item => {
          item.checked = false;
        });
      }
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}
.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}
.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 14px;
  color: #666;
}
.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>