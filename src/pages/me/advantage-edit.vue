<template>
  <view class="advantage-page">
    <TopNavbar title="" @click-left="goBack" />

    <view class="content">
      <text class="page-title">我的优势</text>
      <text class="page-subtitle">一句话介绍自己，突出核心优势</text>

      <textarea
        id="advantageInput"
        v-model="advantage"
        class="advantage-input"
        :style="{ height: inputHeight }"
        placeholder="请输入你的优势"
        :maxlength="500"
        :show-confirm-bar="false"
      />
    </view>

    <view class="bottom-panel">
      <view class="panel-line" />
      <view class="panel-actions">
        <text class="clear-btn" @click="clearContent">清空内容</text>
        <text class="count-text">{{ textCount }}/500</text>
      </view>
      <button class="save-btn" @click="handleSave">
        保存
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { computed, nextTick, onMounted, ref } from 'vue'
import TopNavbar from '@/components/common/TopNavbar.vue'

definePage({
  navigationStyle: 'custom',
})

const STORAGE_KEY = 'resumeAdvantage'

const storedValue = uni.getStorageSync(STORAGE_KEY)
const advantage = ref<string>(typeof storedValue === 'string' ? storedValue : '')
const inputHeight = ref('360px')

const textCount = computed(() => advantage.value.length)

function goBack() {
  uni.navigateBack()
}

function clearContent() {
  advantage.value = ''
}

function handleSave() {
  const trimmed = advantage.value.trim()
  advantage.value = trimmed
  uni.setStorageSync(STORAGE_KEY, trimmed)
  uni.showToast({
    title: '保存成功',
    icon: 'success',
  })
}

function calcInputHeight() {
  nextTick(() => {
    uni.getSystemInfo({
      success: (info) => {
        const query = uni.createSelectorQuery()
        query
          .select('#advantageInput')
          .boundingClientRect((rect) => {
            if (rect) {
              const safeBottom = info.safeAreaInsets?.bottom || 0
              const panelOffset = uni.upx2px(320) + safeBottom
              const available = info.windowHeight - rect.top - panelOffset
              inputHeight.value = `${Math.max(available, 200)}px`
            }
          })
          .exec()
      },
    })
  })
}

onMounted(() => {
  calcInputHeight()
})

onShow(() => {
  const stored = uni.getStorageSync(STORAGE_KEY)
  advantage.value = typeof stored === 'string' ? stored : ''
  calcInputHeight()
})
</script>

<style scoped>
.advantage-page {
  background: #ffffff;
  position: relative;
  padding-bottom: calc(250rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.content {
  padding: 60rpx 36rpx 280rpx;
}

.page-title {
  font-weight: 800;
  font-size: 48rpx;
  color: #333333;
}

.page-subtitle {
  margin-top: 30rpx;
  font-weight: 500;
  font-size: 24rpx;
  color: #c0c0c0;
}

.advantage-input {
  margin-top: 40rpx;
  width: 100%;
  min-height: 120rpx;
  max-height: 800rpx;
  font-size: 32rpx;
  color: #333333;
  line-height: 48rpx;
}

.advantage-input::placeholder {
  color: #c4c4c4;
}

.bottom-panel {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 24rpx 36rpx calc(36rpx + env(safe-area-inset-bottom));
  box-shadow: 0 -10rpx 30rpx rgba(34, 40, 80, 0.08);
  box-sizing: border-box;
}

.panel-line {
  height: 1rpx;
  background: #e9e9e9;
  margin-bottom: 24rpx;
}

.panel-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.clear-btn {
  color: #4d75ff;
  font-size: 28rpx;
}

.count-text {
  font-size: 26rpx;
  color: #9899a6;
}

.save-btn {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  background: linear-gradient(90deg, #5a7cff, #5070ff);
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 24rpx;
  border: none;
}
</style>
