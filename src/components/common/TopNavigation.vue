<template>
  <view id="top-navigation" class="top-navigation" :style="{ background }">
    <!-- 顶部状态栏 -->
    <view class="status-bar" :style="statusBarStyle">
      <!-- 标题区域：优先使用插槽，否则使用props -->
      <view class="status-bar-title">
        <slot name="title">
          <text>{{ title }}</text>
        </slot>
      </view>
      <!-- 副标题区域：优先使用插槽，否则使用props -->
      <view v-if="subtitle || $slots.subtitle" class="status-bar-subtitle">
        <view class="divider" />
        <slot name="subtitle">
          <text>{{ subtitle }}</text>
        </slot>
      </view>
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import { pxToRpx } from '@/utils/screen'

// 定义组件的props
const props = defineProps({
  // 标题：支持字符串或节点
  title: {
    type: [String, Object],
    default: '',
  },
  // 副标题：支持字符串或节点
  subtitle: {
    type: [String, Object],
    default: '',
  },
  // 背景样式：支持字符串（如颜色值或渐变）
  background: {
    type: String,
    default: 'linear-gradient(to bottom, #155FE2 0%, #f5f5f5 100%)',
  },
})

// 响应式数据，用于动态设置状态栏样式
const statusBarStyle = reactive({
  paddingTop: '30rpx',
})

onBeforeMount(() => {
  // 根据菜单按钮信息动态设置状态栏paddingTop
  // 通常使用menuButtonInfo.top作为顶部padding
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  if (menuButtonInfo && menuButtonInfo.top) {
    statusBarStyle.paddingTop = `${pxToRpx(menuButtonInfo.top)}rpx`
  }
})
</script>

<style scoped>
.top-navigation {
  padding-bottom: 20rpx;
  width: 100vw;
}

.status-bar {
  padding: 0 30rpx 20rpx;
  /* #ifdef MP-ALIPAY */
  padding-left: 80rpx;
  /* #endif */
  color: white;
  display: flex;
  align-items: baseline;
}

.status-bar-title {
  /* #ifdef MP-ALIPAY */
  margin-top: 10rpx;
  /* #endif */
  font-family: FZZhengHeiS-EB-GB;
  font-weight: 400;
  font-size: 40rpx;
  color: #ffffff;
  line-height: 34rpx;
  display: block;
}

.status-bar-subtitle {
  font-family: PingFang SC;
  font-weight: bold;
  font-size: 24rpx;
  color: #ffffff;
  line-height: 34rpx;
  display: flex;
  align-items: center;
}

.divider {
  width: 1rpx;
  height: 19rpx;
  background: #dcdddd;
  margin: 0 10rpx;
}
</style>
