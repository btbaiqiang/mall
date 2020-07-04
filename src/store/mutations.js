import {ADD_COUNTER, ADD_TO_CART} from './mutations-types'

export default {
    //mutations唯一的目的就是修改state中状态
  // mutations中的第个方法尽可以完成的事件比较单一化
  [ADD_COUNTER](state, payload) {
    payload.count ++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}