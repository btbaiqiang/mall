import {request} from './request'

//根据传入的iid请求数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: { iid }
  })
}

//请求详情页推荐商品数据
export function getRecommend() {
  return request({
     url: '/recommend' 
  })
}

//封装一个类保存商品的信息
export class Goods {
  constructor(itemInfo, columens, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.lowPrice
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    
    this.columens = columens
    this.services = services
  }
}

//商家店铺信息
