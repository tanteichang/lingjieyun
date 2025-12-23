import type { RouteDefinition, RouteHandler } from '../router.js'

interface AgreementLinks {
  serviceAgreementUrl: string
  privacyPolicyUrl: string
}

const handleAgreementLinks: RouteHandler<AgreementLinks> = () => {
  return {
    statusCode: 200,
    body: {
      code: 200,
      message: '获取协议链接成功',
      data: {
        serviceAgreementUrl: '/mock/html/service.html',
        privacyPolicyUrl: '/mock/html/privacy.html',
      },
    },
    delay: 200,
  }
}

const API_PREFIX = '/mock/api/v1/user'

export const userRoutes: RouteDefinition[] = [
  { method: 'GET', path: `${API_PREFIX}/agreement-links`, handler: handleAgreementLinks },
]
