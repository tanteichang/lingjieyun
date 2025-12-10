<template>
  <view class="login-container">
    <!-- 顶部背景渐变 -->
    <view class="top-gradient" />

    <!-- 登录内容区 -->
    <view class="login-content">
      <!-- 应用logo -->
      <view class="logo-container">
        <view class="logo">
          <view class="logo-blue" />
          <view class="logo-green" />
          <view class="logo-dot" />
        </view>
      </view>

      <!-- 登录标题 -->
      <view class="login-title">
        <text class="title-text">登录灵捷云平台</text>
        <text class="subtitle-text">灵捷云统一管理本人账号信息</text>
      </view>

      <!-- 一键快捷登录按钮 -->
      <view class="login-button-container">
        <button class="login-button" @click="handleQuickLogin">
          一键快捷登录
        </button>
      </view>

      <!-- 协议同意 -->
      <view class="agreement-container">
        <wd-checkbox
          v-model="agreementChecked"
          checked-color="#155fe2"
          @toggle="agreementChecked = !agreementChecked"
        />
        <text class="agreement-text">
          已阅读并同意
          <text class="agreement-link" @click="handleAgreementClick('service')">《灵捷云服务协议》</text>
          和
          <text class="agreement-link" @click="handleAgreementClick('privacy')">《隐私政策》</text>
          ，允许灵捷云统一管理本人账号信息
        </text>
      </view>
    </view>

    <!-- 登录权益（移到底部） -->
    <view class="benefits-container">
      <text class="benefits-title">- 登录后您将获得一下权益 -</text>
      <view class="benefits-list">
        <view class="benefit-item">
          <image class="benefit-icon" src="/static/login/project.png" mode="scaleToFill" />
          <text class="benefit-text">优质项目</text>
        </view>
        <view class="benefit-item">
          <image class="benefit-icon" src="/static/login/info.png" mode="scaleToFill" />
          <text class="benefit-text">行业信息</text>
        </view>
        <view class="benefit-item">
          <image class="benefit-icon" src="/static/login/tax.png" mode="scaleToFill" />
          <text class="benefit-text">专业报税</text>
        </view>
        <view class="benefit-item">
          <image class="benefit-icon" src="/static/login/customer.png" mode="scaleToFill" />
          <text class="benefit-text">专属客服</text>
        </view>
      </view>
    </view>

    <!-- 温馨提示弹窗 -->
    <wd-popup v-model="showAgreementPopup" position="bottom" :safe-area-inset-bottom="true">
      <view class="popup-content">
        <text class="popup-title">温馨提示</text>
        <text class="popup-message">
          请阅读并同意<text class="agreement-link" @click="handleAgreementClick('service')">《灵捷云服务协议》</text>和<text class="agreement-link" @click="handleAgreementClick('privacy')">《隐私政策》</text>，允许灵捷云统一管理本人账号信息
        </text>
        <button class="popup-button" @click="handleAgreeAndLogin">
          同意并登录
        </button>
      </view>
    </wd-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 协议同意状态
const agreementChecked = ref(false)
// 弹窗显示状态
const showAgreementPopup = ref(false)

// 一键快捷登录处理函数
function handleQuickLogin() {
  if (!agreementChecked.value) {
    // 显示温馨提示弹窗
    showAgreementPopup.value = true
    return
  }

  // 这里可以实现快捷登录的逻辑
  uni.showToast({
    title: '登录功能开发中',
    icon: 'none',
    duration: 2000,
  })
}

// 同意并登录按钮处理函数
function handleAgreeAndLogin() {
  // 关闭弹窗
  showAgreementPopup.value = false
  // 勾选协议
  agreementChecked.value = true
  // 执行登录逻辑
  handleQuickLogin()
}

// 协议链接点击处理函数
function handleAgreementClick(type: string) {
  // 跳转到协议页面
  uni.navigateTo({
    url: `/pages/agreement/agreement?type=${type}`,
  })
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #155fe2 0%, #ffffff 18%);
  position: relative;
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15vh;
  width: 100%;
  max-width: 600rpx;
  flex: 1;
  justify-content: flex-start;
}

/* 弹窗样式 */
.popup-content {
  background-color: white;
  border-radius: 10rpx;
  padding: 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-title {
  font-weight: 800;
  font-size: 38rpx;
  text-align: left;
  color: #333333;
  margin-bottom: 42rpx;
  width: 100%;
}

.popup-message {
  font-weight: 500;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  margin-bottom: 68rpx;
}

.popup-button {
  width: 100%;
  height: 96rpx;
  background-color: #155fe2;
  color: white;
  font-size: 32rpx;
  border-radius: 10rpx;
  font-weight: 800rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-button::after {
  border: none;
}

.logo-container {
  margin-bottom: 40rpx;
}

.logo {
  width: 180rpx;
  height: 180rpx;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-blue {
  width: 160rpx;
  height: 120rpx;
  background-color: #155fe2;
  border-radius: 80rpx 80rpx 0 80rpx;
  position: absolute;
  top: 20rpx;
  left: 10rpx;
  transform: rotate(-45deg);
}

.logo-green {
  width: 80rpx;
  height: 120rpx;
  background-color: #4caf50;
  border-radius: 40rpx 40rpx 0 40rpx;
  position: absolute;
  bottom: 20rpx;
  right: 40rpx;
  transform: rotate(45deg);
}

.logo-dot {
  width: 16rpx;
  height: 16rpx;
  background-color: #155fe2;
  border-radius: 8rpx;
  position: absolute;
  top: 30rpx;
  right: 50rpx;
}

.login-title {
  text-align: center;
  margin-bottom: 80rpx;
}

.title-text {
  font-size: 38rpx;
  font-weight: bold;
  color: #121212;
  display: block;
  margin-bottom: 16rpx;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.subtitle-text {
  font-size: 26rpx;
  color: #999;
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.login-button-container {
  width: 75%;
  margin-bottom: 50rpx;
}

.login-button {
  width: 100%;
  height: 88rpx;
  background-color: #155fe2;
  color: white;
  font-size: 32rpx;
  border-radius: 44rpx;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
}

.login-button::after {
  border: none;
}

.agreement-container {
  display: flex;
  align-items: flex-start;
  width: 90%;
  margin-bottom: 40rpx;
  padding: 0 10rpx;
  box-sizing: border-box;
}

.agreement-text {
  font-size: 24rpx;
  color: #a1a1a1;
  line-height: 36rpx;
  flex: 1;
}

.agreement-link {
  color: #155fe2;
  text-decoration: underline;
}

.benefits-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 80rpx;
  left: 0;
  right: 0;
  padding: 0 50rpx;
}

.benefits-title {
  font-weight: 500;
  font-size: 28rpx;
  color: #a1a1a1;
  margin-bottom: 40rpx;
}

.benefits-list {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.benefit-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 24rpx;
}

.benefit-text {
  font-weight: 500;
  font-size: 24rpx;
  color: #333333;
}
</style>
