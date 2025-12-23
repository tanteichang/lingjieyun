import type { RouteDefinition, RouteHandler } from '../router.js'

interface WxLoginResponse {
  accessToken: string
  refreshToken: string
  accessExpiresIn: number
  refreshExpiresIn: number
}

const handleWxLogin: RouteHandler<WxLoginResponse> = () => {
  return {
    statusCode: 200,
    body: {
      code: 200,
      message: '微信登录成功',
      data: {
        accessToken: 'mock-wx-access-token',
        refreshToken: 'mock-wx-refresh-token',
        accessExpiresIn: 7200,
        refreshExpiresIn: 2592000,
      },
    },
    delay: 300,
  }
}

const API_PREFIX = '/mock/api/v1/auth'

export const authRoutes: RouteDefinition[] = [
  { method: 'POST', path: `${API_PREFIX}/wxLogin`, handler: handleWxLogin },
]
