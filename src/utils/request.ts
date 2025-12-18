// 导入类型定义
import type { ApiResponse, ErrorInfo, RequestInfo, RequestOptions, ResponseInfo } from '@/types/request'
// 网络请求封装
import { useUserStore } from '@/store/user'

import logger from './logger'

// 基础API地址
const baseURL = 'http://192.168.124.16:3300/mock'

/**
 * 网络请求函数
 * @param options 请求配置
 * @returns Promise<T> 返回数据
 */
export default function request<T = any>(options: RequestOptions): Promise<T> {
  const userStore = useUserStore()
  const token = userStore.token

  // 记录请求信息
  const requestInfo: RequestInfo = {
    url: baseURL + options.url,
    method: options.method || 'GET',
    data: options.data || {},
    timestamp: new Date().getTime(),
  }
  logger.debug('发起请求', requestInfo)

  return new Promise((resolve, reject) => {
    uni.request({
      url: requestInfo.url,
      method: requestInfo.method,
      data: requestInfo.data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      success(res: any) {
        // 计算请求耗时
        const duration = new Date().getTime() - requestInfo.timestamp

        // 记录响应信息
        const responseInfo: ResponseInfo = {
          ...requestInfo,
          statusCode: res.statusCode,
          data: res.data,
          duration,
        }

        if (res.statusCode === 200) {
          const apiResponse = res.data as ApiResponse<T>
          if (apiResponse.code === 200) {
            logger.debug('请求成功', responseInfo)
            resolve(apiResponse.data)
          }
          else {
            logger.warn('业务逻辑失败', responseInfo)
            uni.showToast({
              title: apiResponse.message || '请求失败',
              icon: 'none',
            })
            reject(new Error(apiResponse.message || '请求失败'))
          }
        }
        else if (res.statusCode === 401) {
          logger.warn('未授权请求', responseInfo)
          // 未授权，跳转到登录页
          uni.navigateTo({ url: '/pages/user/login' })
          reject(new Error('未授权，请重新登录'))
        }
        else {
          logger.error('请求失败', responseInfo)
          uni.showToast({
            title: (res.data as ApiResponse)?.message || `请求失败(${res.statusCode})`,
            icon: 'none',
          })
          reject(new Error((res.data as ApiResponse)?.message || `请求失败(${res.statusCode})`))
        }
      },
      fail(err: any) {
        // 计算请求耗时
        const duration = new Date().getTime() - requestInfo.timestamp

        // 记录错误信息
        const errorInfo: ErrorInfo = {
          ...requestInfo,
          error: err,
          duration,
        }
        logger.error('网络请求失败', errorInfo)

        uni.showToast({
          title: '网络错误，请检查网络连接',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}

// 导出常用请求方法
export const get = <T = any>(url: string, data?: Record<string, any>): Promise<T> => request({ url, data })
export const post = <T = any>(url: string, data?: Record<string, any>): Promise<T> => request({ url, data, method: 'POST' })
export const put = <T = any>(url: string, data?: Record<string, any>): Promise<T> => request({ url, data, method: 'PUT' })
export const del = <T = any>(url: string, data?: Record<string, any>): Promise<T> => request({ url, data, method: 'DELETE' })
