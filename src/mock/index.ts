// 反馈码配置接口
export interface FeedbackCodeConfig {
  [code: number]: string // 键为状态码，值为对应的消息
}

// 默认反馈码配置
export const DEFAULT_FEEDBACK_CODES: FeedbackCodeConfig = {
  200: '操作成功',
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求的资源不存在',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

// Mock 数据类型定义
export interface MockRequest {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  params?: any
  data?: any
}

export interface MockResponse {
  code: number
  message: string
  data?: any
  [key: string]: any
}

export interface MockItem {
  request: MockRequest
  response: MockResponse | ((request: MockRequest) => MockResponse)
  delay?: number // 模拟网络延迟，单位ms
  // 可选：指定此接口使用的反馈码配置
  feedbackCodes?: FeedbackCodeConfig
}

// Mock 数据存储
let mockItems: MockItem[] = []
let isMockEnabled = true // Mock默认开启
// 全局反馈码配置
let globalFeedbackCodes: FeedbackCodeConfig = { ...DEFAULT_FEEDBACK_CODES }

// 设置Mock开关
export function setMockEnabled(enabled: boolean): void {
  isMockEnabled = enabled
}

// 获取Mock开关状态
export function getMockEnabled(): boolean {
  return isMockEnabled
}

// 添加单个Mock
export function addMock(mockItem: MockItem): void {
  mockItems.push(mockItem)
}

// 批量添加Mock
export function addMocks(mockItemsToAdd: MockItem[]): void {
  mockItems = [...mockItems, ...mockItemsToAdd]
}

// 配置全局反馈码
export function configureFeedbackCodes(codes: FeedbackCodeConfig): void {
  // 验证输入的反馈码配置
  validateFeedbackCodes(codes)
  globalFeedbackCodes = { ...DEFAULT_FEEDBACK_CODES, ...codes }
}

// 获取全局反馈码配置
export function getFeedbackCodes(): FeedbackCodeConfig {
  return { ...globalFeedbackCodes }
}

// 验证反馈码配置
export function validateFeedbackCodes(codes: FeedbackCodeConfig): void {
  for (const code in codes) {
    // 验证状态码必须是数字
    const codeNumber = Number(code)
    if (isNaN(codeNumber)) {
      throw new TypeError(`Invalid feedback code: ${code} must be a number`)
    }
    // 验证状态码必须是整数
    if (!Number.isInteger(codeNumber)) {
      throw new TypeError(`Invalid feedback code: ${code} must be an integer`)
    }
    // 验证状态码范围
    if (codeNumber < 100 || codeNumber >= 600) {
      throw new Error(`Invalid feedback code: ${code} must be between 100 and 599`)
    }
    // 验证消息必须是非空字符串
    if (typeof codes[codeNumber] !== 'string' || codes[codeNumber].trim() === '') {
      throw new Error(`Invalid message for feedback code ${code}: must be a non-empty string`)
    }
  }
}

// 创建标准响应对象
export function createResponse(code: number, data?: any, customMessage?: string, feedbackCodes?: FeedbackCodeConfig): MockResponse {
  // 优先使用接口级别的反馈码配置，其次是全局配置，最后是默认配置
  const codes = feedbackCodes || globalFeedbackCodes
  const message = customMessage || codes[code] || DEFAULT_FEEDBACK_CODES[code] || '未知错误'

  return {
    code,
    message,
    data,
  }
}

// 清除所有Mock
export function clearMocks(): void {
  mockItems = []
}

// 重置全局反馈码配置为默认值
export function resetFeedbackCodes(): void {
  globalFeedbackCodes = { ...DEFAULT_FEEDBACK_CODES }
}

// 根据请求匹配Mock
export function getMock(request: MockRequest): MockItem | undefined {
  return mockItems.find((item) => {
    // 匹配URL
    const urlMatch = item.request.url === request.url
    // 匹配方法
    const methodMatch = item.request.method === request.method
    // 如果指定了params或data，则进行匹配
    const paramsMatch = !item.request.params || JSON.stringify(item.request.params) === JSON.stringify(request.params)
    const dataMatch = !item.request.data || JSON.stringify(item.request.data) === JSON.stringify(request.data)

    return urlMatch && methodMatch && paramsMatch && dataMatch
  })
}

// 模拟Mock响应
export function mockResponse(request: MockRequest): Promise<MockResponse> {
  const mockItem = getMock(request)

  if (!mockItem) {
    return Promise.reject(new Error(`No mock found for request: ${request.method} ${request.url}`))
  }

  // 计算延迟时间
  const delay = mockItem.delay || 300

  return new Promise((resolve) => {
    setTimeout(() => {
      if (typeof mockItem.response === 'function') {
        resolve(mockItem.response(request))
      }
      else {
        resolve(mockItem.response)
      }
    }, delay)
  })
}
