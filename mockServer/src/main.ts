import type { IncomingMessage, ServerResponse } from 'node:http'
import type { ApiResponse, RouteDefinition, RouteHandler, RouteResult } from './router.js'
import http from 'node:http'
import { readFileSync } from 'node:fs'
import { URL } from 'node:url'
import { jobRoutes } from './job/index.js'
import { userRoutes } from './user/index.js'
import { createRouteKey } from './router.js'
import { authRoutes } from './auth/index.js'

const PORT = Number(process.env.MOCK_SERVER_PORT || 3300)
const HOST = process.env.MOCK_SERVER_HOST || '0.0.0.0'
const DEFAULT_DELAY = Math.max(0, Number(process.env.MOCK_SERVER_DELAY || 0))
const HTML_ROUTES = new Map([
  ['/mock/html/service.html', readFileSync(new URL('./user/html/service.html', import.meta.url), 'utf8')],
  ['/mock/html/privacy.html', readFileSync(new URL('./user/html/privacy.html', import.meta.url), 'utf8')],
])

function setCommonHeaders(res: ServerResponse): void {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function sendJson<T>(res: ServerResponse, statusCode: number, payload: ApiResponse<T>): void {
  res.statusCode = statusCode
  res.end(JSON.stringify(payload))
}

function sendHtml(res: ServerResponse, statusCode: number, html: string): void {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(html)
}

const routeTable = new Map<string, RouteHandler>()

function registerRoutes(routeDefs: RouteDefinition[]): void {
  routeDefs.forEach((route) => {
    const key = createRouteKey(route.method, route.path)
    routeTable.set(key, route.handler)
  })
}

registerRoutes(jobRoutes)
registerRoutes(userRoutes)
registerRoutes(authRoutes)

function routeRequest(req: IncomingMessage, res: ServerResponse): void {
  if (!req.url) {
    sendJson(res, 404, {
      code: 404,
      message: '未找到请求地址',
      data: null,
    })
    return
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  const { pathname, searchParams } = requestUrl
  const htmlPayload = HTML_ROUTES.get(pathname)

  if (htmlPayload) {
    sendHtml(res, 200, htmlPayload)
    return
  }

  const method = (req.method || 'GET').toUpperCase()
  const routeKey = createRouteKey(method, pathname)
  const handler = routeTable.get(routeKey)

  if (!handler) {
    sendJson(res, 404, {
      code: 404,
      message: '接口不存在',
      data: null,
    })
    return
  }

  try {
    const result: RouteResult = handler(searchParams)
    const hasCustomDelay = typeof result.delay === 'number' && Number.isFinite(result.delay)
    const delay = hasCustomDelay ? Math.max(0, Number(result.delay)) : DEFAULT_DELAY
    const respond = () => sendJson(res, result.statusCode, result.body)

    if (delay > 0) {
      setTimeout(respond, delay)
    }
    else {
      respond()
    }
  }
  catch (error) {
    console.error(`处理请求 ${routeKey} 时出错:`, error)
    sendJson(res, 500, {
      code: 500,
      message: '服务器内部错误',
      data: null,
    })
  }
}

const server = http.createServer((req, res) => {
  setCommonHeaders(res)

  if (req?.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  routeRequest(req, res)
})

server.listen(PORT, HOST, () => {
  console.log(`Mock server is running at http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`)
})
