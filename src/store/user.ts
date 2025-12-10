import { defineStore } from 'pinia'

// 用户信息接口
export interface UserInfo {
  id: string
  name: string
  email?: string
  phone?: string
  avatar?: string
  [key: string]: any
}

// 登录数据接口
export interface LoginData {
  token: string
  userInfo: UserInfo
  role: 'jobseeker' | 'employer'
}

// 用户状态接口
interface UserState {
  token: string
  userInfo: UserInfo | null
  role: 'jobseeker' | 'employer' | ''
  isLoggedIn: boolean
}

// 用户状态管理
export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    // 登录令牌
    token: uni.getStorageSync('token') || '',
    // 用户信息
    userInfo: uni.getStorageSync('userInfo') || null,
    // 用户角色: jobseeker(求职者) / employer(雇主)
    role: uni.getStorageSync('role') || '',
    // 是否已登录
    isLoggedIn: !!uni.getStorageSync('token'),
  }),

  getters: {
    // 获取用户ID
    userId: (state: UserState): string => state.userInfo?.id || '',
    // 获取用户名称
    userName: (state: UserState): string => state.userInfo?.name || '',
    // 是否是求职者
    isJobseeker: (state: UserState): boolean => state.role === 'jobseeker',
    // 是否是雇主
    isEmployer: (state: UserState): boolean => state.role === 'employer',
  },

  actions: {
    /**
     * 设置用户信息
     * @param userInfo 用户信息
     */
    setUserInfo(userInfo: UserInfo | null): void {
      this.userInfo = userInfo
      uni.setStorageSync('userInfo', userInfo)
    },

    /**
     * 设置登录令牌
     * @param token 登录令牌
     */
    setToken(token: string): void {
      this.token = token
      this.isLoggedIn = !!token
      uni.setStorageSync('token', token)
    },

    /**
     * 设置用户角色
     * @param role 用户角色
     */
    setRole(role: 'jobseeker' | 'employer'): void {
      this.role = role
      uni.setStorageSync('role', role)
    },

    /**
     * 登录成功后保存用户信息
     * @param loginData 登录返回的数据
     */
    loginSuccess(loginData: LoginData): void {
      this.setToken(loginData.token)
      this.setUserInfo(loginData.userInfo)
      this.setRole(loginData.role)
    },

    /**
     * 退出登录
     */
    logout(): void {
      this.token = ''
      this.userInfo = null
      this.role = ''
      this.isLoggedIn = false

      // 清除本地存储
      uni.removeStorageSync('token')
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('role')

      // 跳转到登录页
      uni.reLaunch({ url: '/pages/user/login' })
    },

    /**
     * 更新用户信息
     * @param updateData 更新的数据
     */
    updateUserInfo(updateData: Partial<UserInfo>): void {
      if (this.userInfo) {
        this.userInfo = { ...this.userInfo, ...updateData }
        uni.setStorageSync('userInfo', this.userInfo)
      }
    },
  },
})
