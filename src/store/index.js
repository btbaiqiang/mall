import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

//创建State对象
const state = {
  cartList: []
}

//创建Store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

