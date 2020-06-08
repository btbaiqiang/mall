import axios from 'axios'


export function request(config) {
  //1、创建axios的实例对象
  const instance = axios.create({
    baseURL: "http://152.136.185.210:8000/api/n3",
    timeout: 5000,
  })

  //2、创建请求拦截器
  instance.interceptors.request.use(
    config => {
      return config
    },
    err => {
      console.log(err)
    }
  )

  //3、创建响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  
  //4、发送网络请求
  return instance(config)
}