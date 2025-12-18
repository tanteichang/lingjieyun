<template>
  <view class="me-page">
    <TopNavigation>
      <!-- 顶部登录区域 -->
      <view class="header">
        <view class="user-info">
          <view class="avatar" @click="handleLogin">
            <image
              src="@/static/me/avatar.png"
              mode="scaleToFill"
            />
          </view>
          <view class="login-area" @click="handleLogin">
            <text class="login-title">点击登陆/注册</text>
            <text class="login-subtitle">可解锁全部信息</text>
          </view>
        </view>
        <view class="switch-identity" @click="handleSwitchIdentity">
          <image
            src="@/static/me/toggle.png"
            mode="scaleToFill"
          />
          <text>切换身份</text>
        </view>
      </view>

      <!-- 功能入口 -->
      <view class="function-entries">
        <view class="entry-item" @click="handleFunctionClick('报名')">
          <text class="entry-icon">**</text>
          <text class="entry-text">报名</text>
        </view>
        <view class="entry-item" @click="handleFunctionClick('收藏')">
          <text class="entry-icon">**</text>
          <text class="entry-text">收藏</text>
        </view>
        <view class="entry-item" @click="handleFunctionClick('签约')">
          <text class="entry-icon">**</text>
          <text class="entry-text">签约</text>
        </view>
        <view class="entry-item" @click="handleFunctionClick('足迹')">
          <text class="entry-icon">**</text>
          <text class="entry-text">足迹</text>
        </view>
      </view>
    </TopNavigation>

    <!-- 卡片区域 -->
    <view class="card-section">
      <view class="card-item" @click="handleCardClick('myResume')">
        <image
          class="card-icon"
          src="@/static/me/resume.png"
          mode="scaleToFill"
        />
        <text class="card-text">我的简历</text>
      </view>
      <view class="card-item" @click="handleCardClick('myProjects')">
        <image
          class="card-icon"
          src="@/static/me/project.png"
          mode="scaleToFill"
        />
        <text class="card-text">我的项目</text>
      </view>
      <view class="card-item" @click="handleCardClick('myIncome')">
        <image
          class="card-icon"
          src="@/static/me/income.png"
          mode="scaleToFill"
        />
        <text class="card-text">我的收益</text>
      </view>
      <view class="card-item" @click="handleCardClick('electronicAgreements')">
        <image
          class="card-icon"
          src="@/static/me/agreement.png"
          mode="scaleToFill"
        />
        <text class="card-text">电子协议</text>
      </view>
    </view>

    <!-- 广告区域 -->
    <view class="ad-section">
      <view class="ad-content">
        <text class="ad-title">灵捷云平台报税快捷通道</text>
        <text class="ad-subtitle">2025年免费申报</text>
      </view>
    </view>

    <!-- 常用服务 -->
    <view class="service-section">
      <text class="section-title">常用服务</text>
      <view class="service-grid">
        <view class="service-item" @click="handleServiceClick('skillImprovement')">
          <image
            class="service-icon"
            src="@/static/me/skill.png"
            mode="scaleToFill"
          />
          <text class="service-text">技能提升</text>
        </view>
        <view class="service-item" @click="handleServiceClick('realNameAuthentication')">
          <image
            class="service-icon"
            src="@/static/me/real.png"
            mode="scaleToFill"
          />
          <text class="service-text">实名认证</text>
        </view>
        <view class="service-item" @click="handleServiceClick('registrationRecords')">
          <image
            class="service-icon"
            src="@/static/me/record.png"
            mode="scaleToFill"
          />
          <text class="service-text">报名记录</text>
        </view>
        <view class="service-item" @click="handleServiceClick('settlementList')">
          <image
            class="service-icon"
            src="@/static/me/settlement.png"
            mode="scaleToFill"
          />
          <text class="service-text">结算清单</text>
        </view>
        <view class="service-item" @click="handleServiceClick('customerService')">
          <image
            class="service-icon"
            src="@/static/me/customer.png"
            mode="scaleToFill"
          />
          <text class="service-text">客服</text>
        </view>
        <view class="service-item" @click="handleServiceClick('myBankCards')">
          <image
            class="service-icon"
            src="@/static/me/bank.png"
            mode="scaleToFill"
          />
          <text class="service-text">我的银行卡</text>
        </view>
        <view class="service-item" @click="handleServiceClick('aboutUs')">
          <image
            class="service-icon"
            src="@/static/me/about.png"
            mode="scaleToFill"
          />
          <text class="service-text">关于我们</text>
        </view>
      </view>
    </view>

    <!-- 便民工具 -->
    <view class="tool-section">
      <text class="section-title">便民工具</text>
      <view class="tool-grid">
        <view class="tool-item" @click="handleToolClick('personsFundCalculation')">
          <image
            class="tool-icon"
            src="@/static/me/personsFund.png"
            mode="scaleToFill"
          />
          <text class="tool-text">残保金计算</text>
        </view>
        <view class="tool-item" @click="handleToolClick('socialSecurityFoundCalculation')">
          <image
            class="tool-icon"
            src="@/static/me/socialSecurityFound.png"
            mode="scaleToFill"
          />
          <text class="tool-text">社保计算</text>
        </view>
        <view class="tool-item" @click="handleToolClick('personalTaxCalculation')">
          <image
            class="tool-icon"
            src="@/static/me/tax.png"
            mode="scaleToFill"
          />
          <text class="tool-text">个税计算</text>
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-section">
      <view class="logout-button" @click="handleLogout">
        <text class="logout-text">退出登录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 个人中心页面
import TopNavigation from '@/components/common/TopNavigation.vue'

// 点击登录/注册
function handleLogin() {
  // 跳转到登录页面
  uni.navigateTo({
    url: '/pages/login/login',
  })
}

// 切换身份
function handleSwitchIdentity() {
  uni.showToast({
    title: '切换身份功能开发中',
    icon: 'none',
  })
}

// 点击功能入口
function handleFunctionClick(type: string) {
  uni.showToast({
    title: `${type}功能开发中`,
    icon: 'none',
  })
}

// 点击卡片
function handleCardClick(type: string) {
  if (type === 'myResume') {
    uni.navigateTo({
      url: '/pages/me/my-resume',
    })
    return
  }
  if (type === 'myIncome') {
    uni.navigateTo({
      url: '/pages/me/my-income',
    })
    return
  }
  if (type === 'myProjects') {
    uni.navigateTo({
      url: '/pages/me/my-projects',
    })
    return
  }

  // 映射英文参数到中文提示
  const typeMap: Record<string, string> = {
    myResume: '我的简历',
    myProjects: '我的项目',
    myIncome: '我的收入',
    electronicAgreements: '电子协议',
  }

  const chineseType = typeMap[type] || type

  uni.showToast({
    title: `${chineseType}功能开发中`,
    icon: 'none',
  })
}

// 点击常用服务
function handleServiceClick(type: string) {
  if (type === 'realNameAuthentication') {
    uni.navigateTo({
      url: '/pages/me/real-name-auth',
    })
    return
  }

  // 英文参数到中文提示的映射
  const typeMap: Record<string, string> = {
    skillImprovement: '技能提升',
    realNameAuthentication: '实名认证',
    registrationRecords: '报名记录',
    settlementList: '结算清单',
    customerService: '客服',
    myBankCards: '我的银行卡',
    aboutUs: '关于我们',
  }

  uni.showToast({
    title: `${typeMap[type] || type}功能开发中`,
    icon: 'none',
  })
}

// 点击便民工具
function handleToolClick(type: string) {
  // 英文参数到中文提示的映射
  const typeMap: Record<string, string> = {
    disabledPersonsFundCalculation: '残保金计算',
    socialSecurityCalculation: '社保计算',
    personalTaxCalculation: '个税计算',
  }

  uni.showToast({
    title: `${typeMap[type] || type}功能开发中`,
    icon: 'none',
  })
}

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '退出登录',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除登录状态
        uni.removeStorageSync('token')
        uni.removeStorageSync('userInfo')
        // 跳转到首页
        uni.navigateTo({
          url: '/pages/index/index',
        })
        uni.showToast({
          title: '退出登录成功',
          icon: 'success',
        })
      }
    },
  })
}
</script>

<style scoped>
.me-page {
  background-color: #f5f5f5;
}

/* 顶部登录区域 */
.header {
  border-radius: 16rpx;
  padding: 40rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 30rpx;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
}

.avatar image {
  width: 100%;
  height: 100%;
}

.login-area {
  display: flex;
  flex-direction: column;
}

.login-title {
  font-family: PingFang SC;
  font-weight: bold;
  font-size: 36rpx;
  color: #ffffff;
  line-height: 34rpx;
  margin-bottom: 14rpx;
}

.login-subtitle {
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 24rpx;
  color: #adcbff;
  line-height: 34rpx;
}

.switch-identity {
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 24rpx;
  color: #ffffff;
  line-height: 34rpx;
  opacity: 0.8;
  display: flex;
  align-items: center;
}

.switch-identity image {
  width: 44rpx;
  height: 44rpx;
}

.arrow {
  margin-left: 8rpx;
  font-size: 24rpx;
}

/* 功能入口 */
.function-entries {
  border-radius: 16rpx;
  padding: 30rpx;
  display: flex;
  justify-content: space-around;
  margin-bottom: 30rpx;
}

.entry-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.entry-icon {
  font-size: 28rpx;
  color: #121212;
  line-height: 34rpx;
}

.entry-text {
  font-size: 24rpx;
  color: #768bb0;
  line-height: 34rpx;
}

/* 卡片区域 */
.card-section {
  background-color: white;
  border-radius: 24rpx;
  display: flex;
  justify-content: space-around;
  margin: 0 14rpx 14rpx 16rpx;
  padding: 24rpx 0 38rpx 0;
  height: 176prx;
}

.card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 12rpx;
}

.card-text {
  font-size: 23rpx;
  color: #333333;
  line-height: 34rpx;
}

/* 广告区域 */
.ad-section {
  background-color: white;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 100"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#155FE2;stop-opacity:0.1" /><stop offset="100%" style="stop-color:#4A90E2;stop-opacity:0.1" /></linearGradient></defs><rect width="375" height="100" fill="url(%23grad)"/><circle cx="50" cy="50" r="20" fill="#155FE2" opacity="0.2" /><circle cx="325" cy="30" r="15" fill="#4A90E2" opacity="0.3" /><rect x="200" y="70" width="40" height="40" fill="#155FE2" opacity="0.1" /><path d="M100,80 Q150,20 200,80" stroke="#155FE2" stroke-width="2" fill="none" opacity="0.3" /></svg>');
  background-repeat: no-repeat;
  background-size: cover;
}

.ad-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.ad-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #155fe2;
  margin-bottom: 8rpx;
}

.ad-subtitle {
  font-size: 22rpx;
  color: #666;
}

/* 常用服务 */

.section-title {
  font-weight: 800;
  font-size: 30rpx;
  color: #333333;
  line-height: 34rpx;
  display: inline-block;
  margin-bottom: 40rpx;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30rpx 20rpx;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.service-icon {
  width: 60rpx;
  height: 60rpx;
}

.service-text {
  font-size: 23rpx;
  color: #333333;
  line-height: 34rpx;
}

/* 便民工具 */
.tool-section,
.service-section {
  background-color: white;
  border-radius: 24rpx;
  padding: 40rpx 0 60rpx 30rpx;
  margin: 0 14rpx 16rpx 14rpx;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30rpx 20rpx;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tool-icon {
  width: 60rpx;
  height: 60rpx;
}

.tool-text {
  font-size: 24rpx;
  color: #333;
}

/* 退出登录 */
.logout-section {
  padding: 0 30rpx 60rpx;
}

.logout-button {
  background-color: white;
  border-radius: 16rpx;
  padding: 30rpx;
  text-align: center;
  border: 1px solid #e0e0e0;
}

.logout-text {
  font-size: 30rpx;
  color: #ff6b6b;
}
</style>
