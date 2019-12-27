import axios from 'axios'

const ERR_OK = 0

export function get(url) {
  // 对 axios 进行一次封装, 提高函数的复用性
  // 函数的柯里话, 将多参函数变为接受单一参数(第一个参数)的函数, 返回接收余下参数并返回结果的新函数
  return function (params) { // 可查看 axios 的参数
    return axios.get(url, {
      params
    }).then((res) => {
      const { data, error } = res.data
      if (error === ERR_OK) {
        return data
      }
    }).catch(() => {
      // 在这里捕获错误
    })
  }
}
