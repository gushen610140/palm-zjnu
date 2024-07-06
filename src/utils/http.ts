// 请求基地址
const baseURL = 'http://127.0.0.1:8080'

// 拦截器
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    // 非 http 开头拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    options.timeout = 10000
    // 添加小程序端请求头标识
    options.header = {
      'source-client': 'miniapp',
      ...options.header,
    }
    const token = uni.getStorageSync('token')
    if (token) {
      options.header.Authorization = token
    }
  },
}

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)

import type { Result } from "@/types/Result"

/**
 * 
 * @param options uni.request的请求参数
 * @returns Promise对象 已经封装为Result类型
 * 
 * 泛型需要传入Result中返回的data的数据类型
 * 
 */
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Result<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // res是uni封装的返回类型，直接提取data是服务器定义的返回类型Result，as类型断言成前端定义的类型Result
          resolve(res.data as Result<T>)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Result<T>).message || '请求错误',
          })
          reject(res)
        }
      },
      // 后端服务器无响应
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}