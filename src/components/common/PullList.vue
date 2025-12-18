<template>
  <scroll-view
    class="pull-list"
    scroll-y
    :show-scrollbar="false"
    :lower-threshold="lowerThreshold"
    @scroll="handleScroll"
    @scrolltolower="handleReachBottom"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchEnd"
  >
    <view
      class="pull-list__inner"
      :class="{ 'pull-list__inner--dragging': pulling }"
      :style="innerStyle"
    >
      <view class="pull-indicator" :style="indicatorStyle">
        <view class="indicator-content" :class="{ 'indicator-content--visible': refreshing || pullDistance > 0 }">
          <view class="spinner" :class="{ 'spinner--active': refreshing || pullDistance > 0 }" />
          <text class="indicator-text">{{ indicatorText }}</text>
        </view>
      </view>

      <slot />

      <view class="load-indicator" :class="{ 'load-indicator--visible': loadingMore || !hasMore }">
        <view v-if="loadingMore" class="spinner spinner--small spinner--active" />
        <text class="load-text">{{ loadMoreText }}</text>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { pxToRpx } from '@/utils/screen'

const props = defineProps({
  hasMore: {
    type: Boolean,
    default: true,
  },
  lowerThreshold: {
    type: Number,
    default: 60,
  },
  initialText: {
    type: String,
    default: '下拉刷新',
  },
  pullingText: {
    type: String,
    default: '继续下拉即可刷新',
  },
  releaseText: {
    type: String,
    default: '松开立即刷新',
  },
  refreshingText: {
    type: String,
    default: '刷新中...',
  },
  loadMoreText: {
    type: String,
    default: '上拉加载更多',
  },
  loadingMoreText: {
    type: String,
    default: '加载中...',
  },
  finishedText: {
    type: String,
    default: '没有更多了',
  },
  triggerDistance: {
    type: Number,
    default: 20,
  },
  maxDistance: {
    type: Number,
    default: 30,
  },
  indicatorHeight: {
    type: Number,
    default: 20,
  },
  refreshing: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'load-more'): void
  (e: 'update:refreshing', value: boolean): void
}>()

const scrollTop = ref(0)
const pulling = ref(false)
const internalRefreshing = ref(props.refreshing)
const loadingMore = ref(false)
const pullDistance = ref(0)
let startY = 0

const indicatorText = computed(() => {
  if (internalRefreshing.value) {
    return props.refreshingText
  }
  if (pullDistance.value >= props.triggerDistance) {
    return props.releaseText
  }
  if (pullDistance.value > 0) {
    return props.pullingText
  }
  return ''
})

const loadMoreText = computed(() => {
  if (loadingMore.value) {
    return props.loadingMoreText
  }
  if (!props.hasMore) {
    return props.finishedText
  }
  return props.loadMoreText
})

const innerStyle = computed(() => {
  const offset = internalRefreshing.value || pullDistance.value > 0
    ? Math.max(pullDistance.value, internalRefreshing.value ? props.indicatorHeight : 0)
    : 0

  return {
    transform: `translateY(${pxToRpx(offset)}px)`,
    transition: pulling.value ? 'none' : 'transform 0.2s ease',
  }
})

const indicatorStyle = computed(() => {
  const visible = internalRefreshing.value || pullDistance.value > 0
  const currentHeight = internalRefreshing.value
    ? props.indicatorHeight
    : Math.min(pullDistance.value, props.indicatorHeight)

  return {
    height: `${visible ? currentHeight : 0}px`,
    transform: visible ? 'translateY(0)' : `translateY(-${pxToRpx(props.indicatorHeight)}px)`,
    transition: 'transform 0.2s ease, height 0.2s ease',
  }
})

function handleScroll(event: any): void {
  scrollTop.value = event.detail?.scrollTop || 0
}

function handleTouchStart(event: TouchEvent): void {
  if (internalRefreshing.value || scrollTop.value > 0) {
    return
  }
  pulling.value = true
  startY = event.touches[0].clientY
}

function handleTouchMove(event: TouchEvent): void {
  if (!pulling.value) {
    return
  }
  const currentY = event.touches[0].clientY
  const delta = currentY - startY
  if (delta <= 0) {
    pullDistance.value = 0
    return
  }
  const damped = delta / 2
  pullDistance.value = Math.min(props.maxDistance, damped)
}

function handleTouchEnd(): void {
  if (!pulling.value) {
    return
  }
  pulling.value = false
  if (pullDistance.value >= props.triggerDistance) {
    setRefreshing(true)
    pullDistance.value = props.indicatorHeight
    emit('refresh')
  }
  else {
    pullDistance.value = 0
  }
}

function handleReachBottom(): void {
  if (loadingMore.value || internalRefreshing.value || !props.hasMore) {
    return
  }
  loadingMore.value = true
  emit('load-more')
}

function finishLoadMore(): void {
  loadingMore.value = false
}

watch(
  () => props.refreshing,
  (val) => {
    console.log('设置刷新状态', val)
    setRefreshing(val)
  },
)

watch(
  () => internalRefreshing.value,
  (val) => {
    if (!val) {
      pullDistance.value = 0
    }
    emit('update:refreshing', val)
  },
)

function setRefreshing(val: boolean): void {
  internalRefreshing.value = val
}

defineExpose({
  refreshing: internalRefreshing,
  finishLoadMore,
})
</script>

<style scoped>
.pull-list {
  height: 100%;
  width: 100%;
}

.pull-list__inner {
  min-height: 100%;
  background-color: #f5f5f5;
}

.pull-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8c92a2;
  overflow: hidden;
}

.indicator-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20rpx;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.indicator-content--visible {
  opacity: 1;
}

.indicator-text {
  font-size: 20rpx;
  color: #878b99;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.indicator-content--visible .indicator-text {
  opacity: 1;
}

.spinner {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(135, 139, 153, 0.2);
  border-top-color: #5d75ff;
  animation: spin 1s linear infinite;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.spinner--active {
  opacity: 1;
}

.spinner--small {
  width: 32rpx;
  height: 32rpx;
  border-width: 3rpx;
}

.load-indicator {
  padding: 24rpx 0 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  color: #8c90a0;
  font-size: 24rpx;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.load-indicator--visible {
  opacity: 1;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
