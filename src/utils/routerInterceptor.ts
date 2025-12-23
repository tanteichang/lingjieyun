/**
 * 路由拦截与跳转封装工具
 * 基于uni-app导航API二次封装，支持登录校验、权限控制等全局拦截
 */
const RouterInterceptor = {
  // 白名单路由(无需登录)
  whiteList: [
    '/pages/me/me',
    '/pages/index/index',
    '/pages/login/login',
  ],

  /**
   * 初始化路由拦截
   */
  init() {
    // 保存原始导航方法
    const originalNavigateTo = uni.navigateTo
    const originalRedirectTo = uni.redirectTo
    const originalReLaunch = uni.reLaunch
    const originalSwitchTab = uni.switchTab
    const originalNavigateBack = uni.navigateBack // 新增：保存原始navigateBack方法

    // 重写导航方法
    uni.navigateTo = this.wrapNavigate('navigateTo', originalNavigateTo)
    uni.redirectTo = this.wrapNavigate('redirectTo', originalRedirectTo)
    uni.reLaunch = this.wrapNavigate('reLaunch', originalReLaunch)
    uni.switchTab = this.wrapNavigate('switchTab', originalSwitchTab)
    uni.navigateBack = this.wrapNavigate('navigateBack', originalNavigateBack) // 新增：重写navigateBack方法
  },

  /**
   * 导航方法包装器
   * @param {string} method - 导航方法名(navigateTo/redirectTo/reLaunch/switchTab/navigateBack)
   * @param {Function} original - 原始导航方法
   * @returns {Function} 包装后的导航方法
   */
  wrapNavigate(method, original) {
    // 使用箭头函数确保this指向RouterInterceptor
    return async (options) => {
      // navigateBack特殊处理 (无url参数)
      if (method === 'navigateBack') {
        return original(options)
      }

      const { url } = options
      const purePath = url.split('?')[0]

      // 避免对登录页本身进行拦截检查，防止无限循环
      if (purePath === '/pages/login/login') {
        return original(options)
      }

      // 获取当前页面路径
      const currentPages = getCurrentPages()
      const currentRoute = currentPages.length ? currentPages[currentPages.length - 1].route : ''

      // 路由拦截逻辑
      if (!this.checkPermission(url)) {
        // 未登录跳转登录页
        return uni.navigateTo({
          url: `/pages_b/mine/login?redirect=${encodeURIComponent(url)}`,
        })
      }

      // 处理tabBar页面特殊逻辑
      if (method === 'switchTab' && url === `/${currentRoute}`) {
        // 防止重复点击tabBar
        return
      }

      // 执行原始导航方法
      return original(options)
    }
  },

  /**
   * 权限检查
   * @param {string} url - 目标页面路径
   * @returns {boolean} 是否有权限访问
   */
  checkPermission(url) {
    // 提取纯净路径(去除参数)
    const purePath = url.split('?')[0]
    // 白名单路由直接放行
    if (this.whiteList.includes(purePath)) {
      return true
    }
    // 检查是否登录
    const token = uni.getStorageSync('token')
    return !!token
  },

  /**
   * 封装带加载动画的导航
   * @param {object} options - 导航参数
   * @param {string} options.url - 目标页面路径
   * @param {boolean} [options.showLoading] - 是否显示加载动画
   * @param {string} [options.loadingText] - 加载动画文本
   */
  async navigateWithLoading(options) {
    const { url, showLoading = true, loadingText = '加载中...' } = options
    if (showLoading) {
      uni.showLoading({
        title: loadingText,
        mask: true,
      })
    }

    try {
      await uni.navigateTo({
        url,
      })
    }
    catch (e) {
      console.error('导航失败:', e)
    }
    finally {
      if (showLoading) {
        uni.hideLoading()
      }
    }
  },
}

export default RouterInterceptor
