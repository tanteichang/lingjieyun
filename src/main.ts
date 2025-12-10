import { createSSRApp } from 'vue'
import App from './App.vue'
import { requestInterceptor } from './http/interceptor'
// Mock功能导入
import { addMocks, setMockEnabled } from './mock'
import { jobMocks } from './mock/api/job'

import { userMocks } from './mock/api/user'
import { routeInterceptor } from './router/interceptor'
import store from './store'

import logger from './utils/logger'
import '@/style/index.scss'
import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(routeInterceptor)
  app.use(requestInterceptor)

  app.config.globalProperties.$logger = logger
  logger.info('Vue3应用启动', { version: '1.0.0' })

  // 开发环境启用Mock功能
  if (process.env.NODE_ENV === 'development') {
    setMockEnabled(true)
    addMocks([...userMocks, ...jobMocks])
    logger.info('Mock功能已启用')
  }
  else {
    setMockEnabled(false)
  }

  return {
    app,
  }
}
