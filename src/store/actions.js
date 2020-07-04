import {ADD_COUNTER, ADD_TO_CART} from './mutations-types'

export default {
  addCart(context, payload) {

    // 查找数组中是否存在该商品
    let product = context.state.cartList.find(item => item.iid === payload.iid)
    // 判断oldProduct是否有值
    if (product) {
      // console.log(product)
      context.commit(ADD_COUNTER, product)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}