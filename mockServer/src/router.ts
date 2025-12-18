export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T | null
}

export interface RouteResult<T = any> {
  statusCode: number
  body: ApiResponse<T>
  delay?: number
}

export type RouteHandler<T = any> = (params: URLSearchParams) => RouteResult<T>

export interface RouteDefinition<T = any> {
  method: string
  path: string
  handler: RouteHandler<T>
}

export function createRouteKey(method: string, path: string): string {
  return `${method.toUpperCase()} ${path}`
}
