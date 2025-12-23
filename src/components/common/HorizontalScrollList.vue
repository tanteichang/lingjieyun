<template>
  <view class="horizontal-scroll-container">
    <scroll-view class="horizontal-scroll-view" scroll-x :show-scrollbar="false" @scroll="handleScroll">
      <view class="horizontal-scroll-content">
        <slot />
      </view>
    </scroll-view>
    <!-- 指示条 -->
    <view v-if="showIndicator" class="indicator-bar">
      <view
        class="indicator-content"
        :style="{
          width: `${indicatorWidth}rpx`,
          left: `${contentPosition}rpx`,
        }"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, toRef } from 'vue'

const props = defineProps({
  showIndicator: {
    type: Boolean,
    default: true,
  },
})
const showIndicator = toRef(props, 'showIndicator')

const scrollbarWidth = ref(0)
const containerWidth = ref(0)
const contentPosition = ref(0) // 前景内容的移动位置
const indicatorWidth = 26 // 指示条固定宽度
const indicatorContainerWidth = 60 // 指示条容器宽度

// 获取滚动内容的实际宽度
function getScrollbarWidth() {
  try {
    const query = uni.createSelectorQuery().in(getCurrentInstance())

    // 获取容器宽度
    query.select('.horizontal-scroll-container').boundingClientRect((res) => {
      if (res && typeof res === 'object' && !Array.isArray(res) && 'width' in res) {
        containerWidth.value = res.width
        console.log('容器宽度:', containerWidth.value)
      }
    })

    // 获取内部滚动内容的实际宽度
    query.select('.horizontal-scroll-content').boundingClientRect((res) => {
      if (res && typeof res === 'object' && !Array.isArray(res) && 'width' in res) {
        scrollbarWidth.value = res.width
        console.log('滚动内容宽度:', scrollbarWidth.value)
        // 初始化指示条内容位置
        calculateContentPosition()
      }
      else {
        console.error('无法获取滚动内容元素，请检查class选择器是否正确')
      }
    })

    query.exec()
  }
  catch (error) {
    console.error('获取宽度失败:', error)
  }
}

// 计算指示条内容的初始位置
function calculateContentPosition() {
  if (scrollbarWidth.value <= containerWidth.value) {
    // 内容不足一屏，内容居中
    contentPosition.value = 0
  }
  else {
    // 内容超过一屏，初始位置为0
    contentPosition.value = 0
  }
  console.log('指示条内容初始位置:', contentPosition.value)
}

// 监听滚动事件
function handleScroll(event: { detail: { scrollLeft: number } }) {
  // 根据滚动位置调整指示条内容
  if (scrollbarWidth.value > containerWidth.value) {
    // 计算滚动比例
    const scrollRatio = event.detail.scrollLeft / (scrollbarWidth.value - containerWidth.value)
    console.log('滚动比例:', scrollRatio)
    // 计算内容应该移动的距离
    // 容器宽度减去内容宽度，得到可移动的总距离
    contentPosition.value = scrollRatio * (indicatorContainerWidth - indicatorWidth)

    console.log('可移动总距离:', contentPosition.value)
    console.log('滚动位置:', event.detail.scrollLeft, '内容移动位置:', contentPosition.value)
  }
}

// 组件挂载后获取宽度
onMounted(() => {
  getScrollbarWidth()
})
</script>

<style scoped>
.horizontal-scroll-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.horizontal-scroll-view {
  width: 100%;
  white-space: nowrap;
}

.horizontal-scroll-content {
  display: inline-block;
}

/* 指示条样式 */
.indicator-bar {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 8rpx;
  width: 60rpx;
  background: #ededed;
  border-radius: 4rpx;
  display: flex;
  align-items: center;
}

.indicator-content {
  position: absolute;
  height: 100%;
  background-color: #155fe2;
  border-radius: 4rpx;
  transition: transform 0.1s ease;
  will-change: transform;
}
</style>
