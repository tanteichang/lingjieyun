<template>
  <view class="search-bar">
    <view class="search-box" @click="$emit('search-click')">
      <view class="city-selector" @click="$emit('city-click')">
        <text class="city-text">{{ currentCity }}</text>
        <text class="city-arrow">▼</text>
      </view>

      <text class="search-placeholder">输入你要找的项目</text>
      <image class="search-icon" src="/static/index/search.png" />
    </view>
  </view>
</template>

<script setup lang="ts">
// 定义组件属性
const props = defineProps<{
  currentCity: string
}>()

// 定义组件事件
const emit = defineEmits<{
  (e: 'city-click'): void
  (e: 'search-click'): void
}>()
</script>

<style scoped>
/* 顶部搜索栏 */
.search-bar {
  padding: 30rpx 20rpx 0 20rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
}

.city-selector {
  display: flex;
  align-items: center;
  margin-right: 50rpx;
  color: #1c1c1c;
  cursor: pointer;
}

.city-text {
  font-weight: 800;
  font-size: 28rpx;
  color: #1c1c1c;
}

.city-arrow {
  font-size: 20rpx;
  margin-left: 6rpx;
  opacity: 0.8;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 36rpx;
  padding: 0 30rpx;
  height: 80rpx;
  cursor: pointer;
}

.search-icon {
  width: 28rpx;
  height: 28rpx;
}

.search-placeholder {
  font-size: 28rpx;
  color: #95959f;
  flex: 1;
}
</style>
