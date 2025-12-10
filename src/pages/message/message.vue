<template>
  <view class="message-page">
    <!-- 顶部导航 -->
    <TopNavigation title="消息" />

    <!-- 推送通知横幅 -->
    <view class="push-notification">
      <view class="notification-left">
        <image
          class="bell-icon"
          src="@/static/message/bell.png"
          mode="scaleToFill"
        />
        <text class="notification-text">开启推送通知，重要消息不错过</text>
      </view>
      <view class="open-button">
        <text class="open-button-text">去开启</text>
      </view>
    </view>

    <!-- 消息分类图标 -->
    <view class="message-categories">
      <view class="category-item">
        <view class="category-icon">
          <image
            src="@/static/message/review.png"
            mode="scaleToFill"
          />
        </view>
        <text class="category-text">审核通知</text>
      </view>
      <view class="category-item">
        <view class="category-icon">
          <image
            src="@/static/message/contract.png"
            mode="scaleToFill"
          />
        </view>
        <text class="category-text">签约通知</text>
      </view>
      <view class="category-item">
        <view class="category-icon">
          <image
            src="@/static/message/settlement.png"
            mode="scaleToFill"
          />
        </view>
        <text class="category-text">结算通知</text>
      </view>
    </view>

    <!-- 消息列表 -->
    <scroll-view class="message-list">
      <view v-for="message in messages" :key="message.id" class="message-item">
        <view class="message-icon">
          <image
            :src="messageIconMap[message.type]"
          />
          <view v-if="message.unreadCount > 0" class="unread-badge">
            {{ message.unreadCount }}
          </view>
        </view>
        <view class="message-info">
          <view class="message-title-row">
            <text class="message-title">{{ message.title }}</text>
            <text class="message-time">{{ message.time }}</text>
          </view>
          <text class="message-content">{{ message.content }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
// 消息页面
import { ref } from 'vue'

// 消息类型枚举
type MessageType = 'system' | 'project' | 'review' | 'contract' | 'settlement'

// 消息数据结构
interface Message {
  id: number
  type: MessageType
  title: string
  content: string
  time: string
  unreadCount: number
}

// 消息类型与图标路径的映射表
const messageIconMap: Record<MessageType, string> = {
  system: '/static/message/sysMessage.png',
  project: '/static/message/projectMessage.png',
  review: '/static/message/review.png',
  contract: '/static/message/contract.png',
  settlement: '/static/message/settlement.png',
}

// 模拟消息数据
const messages = ref<Message[]>([
  {
    id: 1,
    type: 'system',
    title: '系统消息',
    content: '灵捷云平台推出申报快速通道，【企业】可通过吧啦吧啦吧',
    time: '11/26',
    unreadCount: 15,
  },
  {
    id: 2,
    type: 'project',
    title: '项目消息',
    content: '广州新际网络通过了您申请的UI设计项目，请查吧啦吧啦吧..',
    time: '11/25',
    unreadCount: 0,
  },
])
</script>

<style scoped>
/* 页面基础样式 */
.message-page {
  background-color: #f8f8f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部标题栏 */
.message-header {
  background: linear-gradient(180deg, #1877f2 0%, #0d58c5 100%);
  padding: 60rpx 30rpx 30rpx;
  position: relative;
}

.header-title {
  font-size: 40rpx;
  font-weight: bold;
  color: white;
}

/* 推送通知横幅 */
.push-notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #c1d7ff;
  border-radius: 20rpx;
  margin: 20rpx;
  padding: 20rpx 30rpx;
}

.notification-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.bell-icon {
  width: 80rpx;
  height: 80rpx;
  margin-right: 14rpx;
}

.notification-text {
  font-size: 28rpx;
  color: #1359d4;
  line-height: 34rpx;
}

.open-button {
  border-radius: 23rpx;
  background-color: #1359d4;
  height: 50rpx;
}
.open-button-text {
  font-size: 24rpx;
  color: #ffffff;
  padding: 0 22rpx;
  line-height: 50rpx;
}

/* 消息分类图标 */
.message-categories {
  display: flex;
  justify-content: space-evenly;
  padding: 30rpx 0;
  margin-bottom: 20rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150rpx;
  height: 150rpx;
}

.category-icon {
  width: 96rpx;
  height: 96rpx;
  background: #fff;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18rpx;
}
.category-icon image {
  width: 60rpx;
  height: 60rpx;
}

.category-text {
  font-size: 28rpx;
  color: #121212;
  line-height: 34rpx;
}

/* 消息列表 */
.message-list {
}

.message-item {
  display: flex;
  align-items: center;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.message-icon {
  width: 90rpx;
  height: 90rpx;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
}

.message-icon image {
  width: 90rpx;
  height: 90rpx;
}

.unread-badge {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background-color: #ff6b6b;
  color: white;
  font-size: 20rpx;
  padding: 2rpx 2rpx;
  border-radius: 10rpx;
  min-width: 30rpx;
  text-align: center;
}

.message-info {
  flex: 1;
}

.message-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.message-title {
  font-size: 32rpx;
  color: #001212;
  line-height: 34rpx;
}

.message-time {
  font-size: 25rpx;
  color: #b1b3bb;
  line-height: 34rpx;
}

.message-content {
  font-size: 25rpx;
  color: #b1b3bb;
  line-height: 34rpx;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
