/**
 * 日志工具类
 * 支持不同级别的日志输出和环境控制
 */

// 日志级别枚举
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

// 环境配置
export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

// 日志选项接口
export interface LoggerOptions {
  moduleName?: string
  logLevel?: LogLevel
  env?: Environment
  enableFileLog?: boolean
}

// 日志数据接口
export interface LogData {
  [key: string]: any
}

// 日志颜色配置
const LogColors = {
  DEBUG: '\x1B[36m', // 青色
  INFO: '\x1B[32m', // 绿色
  WARN: '\x1B[33m', // 黄色
  ERROR: '\x1B[31m', // 红色
  RESET: '\x1B[0m', // 重置颜色
  MODULE: '\x1B[35m', // 紫色模块名
  TIMESTAMP: '\x1B[90m', // 灰色时间戳
}

// 日志工具类
export class Logger {
  private moduleName: string
  private logLevel: LogLevel
  private env: Environment
  private enableFileLog: boolean
  private enableColor: boolean

  constructor(options: LoggerOptions = {}) {
    this.moduleName = options.moduleName || 'APP'
    this.logLevel = options.logLevel || LogLevel.DEBUG
    this.env = options.env || (process.env.NODE_ENV === 'production' ? Environment.PRODUCTION : Environment.DEVELOPMENT)
    this.enableFileLog = options.enableFileLog || false
    this.enableColor = true // 默认启用彩色输出

    // 生产环境默认只输出警告和错误
    if (this.env === Environment.PRODUCTION && this.logLevel <= LogLevel.INFO) {
      this.logLevel = LogLevel.WARN
    }
  }

  /**
   * 格式化日志消息
   * @param {string} level - 日志级别
   * @param {string} message - 日志消息
   * @param {LogData} data - 附加数据
   * @returns {string} 格式化后的日志
   */
  private formatMessage(level: string, message: string, data?: LogData): string {
    const timestamp: string = new Date().toLocaleString()
    const levelStr: string = level.padEnd(5, ' ')
    const moduleStr: string = `[${this.moduleName}]`

    // 添加颜色
    const color = this.enableColor ? LogColors[level as keyof typeof LogColors] || LogColors.RESET : ''
    const moduleColor = this.enableColor ? LogColors.MODULE : ''
    const timestampColor = this.enableColor ? LogColors.TIMESTAMP : ''
    const reset = this.enableColor ? LogColors.RESET : ''

    let logMsg: string = `${timestampColor}${timestamp}${reset} ${color}${levelStr}${reset} ${moduleColor}${moduleStr}${reset} ${message}`

    if (data !== undefined && data !== null) {
      try {
        logMsg += ` ${JSON.stringify(data)}`
      }
      catch (e) {
        logMsg += ` ${String(data)}`
      }
    }

    return logMsg
  }

  /**
   * 调试日志
   * @param {string} message - 日志消息
   * @param {LogData} data - 附加数据
   */
  debug(message: string, data?: LogData): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      const logMsg: string = this.formatMessage('DEBUG', message, data)
      console.debug(logMsg)
      this.saveToFile(logMsg)
    }
  }

  /**
   * 信息日志
   * @param {string} message - 日志消息
   * @param {LogData} data - 附加数据
   */
  info(message: string, data?: LogData): void {
    if (this.logLevel <= LogLevel.INFO) {
      const logMsg: string = this.formatMessage('INFO', message, data)
      console.info(logMsg)
      this.saveToFile(logMsg)
    }
  }

  /**
   * 警告日志
   * @param {string} message - 日志消息
   * @param {LogData} data - 附加数据
   */
  warn(message: string, data?: LogData): void {
    if (this.logLevel <= LogLevel.WARN) {
      const logMsg: string = this.formatMessage('WARN', message, data)
      console.warn(logMsg)
      this.saveToFile(logMsg)
    }
  }

  /**
   * 错误日志
   * @param {string} message - 日志消息
   * @param {LogData} data - 附加数据
   */
  error(message: string, data?: LogData): void {
    if (this.logLevel <= LogLevel.ERROR) {
      const logMsg: string = this.formatMessage('ERROR', message, data)
      console.error(logMsg)
      this.saveToFile(logMsg)
    }
  }

  /**
   * 保存日志到文件
   * @param {string} logMsg - 日志消息
   */
  private saveToFile(logMsg: string): void {
    if (!this.enableFileLog)
      return

    try {
      // 保存到文件时移除颜色转义字符
      const plainLogMsg = logMsg.replace(/\x1B\[[0-9;]*m/g, '')
      // 在 uni-app 环境中可以使用 uni.saveFile 或其他存储方式
      // 这里只是一个示例，实际实现需要根据平台调整
      console.log('[Logger] 保存日志到文件:', plainLogMsg)
      // 可以根据需要实现持久化逻辑
    }
    catch (e) {
      console.error('[Logger] 保存日志失败:', e)
    }
  }

  /**
   * 启用彩色日志
   */
  enableColorLogging(): void {
    this.enableColor = true
  }

  /**
   * 禁用彩色日志
   */
  disableColorLogging(): void {
    this.enableColor = false
  }

  /**
   * 检查是否启用了彩色日志
   * @returns {boolean} 是否启用彩色日志
   */
  isColorEnabled(): boolean {
    return this.enableColor
  }

  /**
   * 设置日志级别
   * @param {LogLevel} level - 日志级别
   * @returns {boolean} 设置是否成功
   */
  setLogLevel(level: LogLevel): boolean {
    if (Object.values(LogLevel).includes(level)) {
      this.logLevel = level
      return true
    }
    return false
  }

  /**
   * 获取当前日志级别
   * @returns {LogLevel} 当前日志级别
   */
  getLogLevel(): LogLevel {
    return this.logLevel
  }

  /**
   * 启用文件日志
   */
  enableFileLogging(): void {
    this.enableFileLog = true
  }

  /**
   * 禁用文件日志
   */
  disableFileLogging(): void {
    this.enableFileLog = false
  }

  /**
   * 获取模块名称
   * @returns {string} 模块名称
   */
  getModuleName(): string {
    return this.moduleName
  }

  /**
   * 获取当前环境
   * @returns {Environment} 当前环境
   */
  getEnvironment(): Environment {
    return this.env
  }
}

// 创建默认日志实例
const defaultLogger: Logger = new Logger()

// 导出单例实例方法
export const debug: (message: string, data?: LogData) => void = (message, data) => defaultLogger.debug(message, data)
export const info: (message: string, data?: LogData) => void = (message, data) => defaultLogger.info(message, data)
export const warn: (message: string, data?: LogData) => void = (message, data) => defaultLogger.warn(message, data)
export const error: (message: string, data?: LogData) => void = (message, data) => defaultLogger.error(message, data)
export const setLogLevel: (level: LogLevel) => boolean = level => defaultLogger.setLogLevel(level)
export const getLogLevel: () => LogLevel = () => defaultLogger.getLogLevel()
export const enableFileLogging: () => void = () => defaultLogger.enableFileLogging()
export const disableFileLogging: () => void = () => defaultLogger.disableFileLogging()

// 默认导出
export default {
  Logger,
  LogLevel,
  Environment,
  debug,
  info,
  warn,
  error,
  setLogLevel,
  getLogLevel,
  enableFileLogging,
  disableFileLogging,
}
