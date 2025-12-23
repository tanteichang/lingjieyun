<template>
  <view class="fade-layout" :style="{ background: props.layoutBackground }">
    <view class="fade-layout__header">
      <view class="fade-layout__header-bg" :style="headerStyle" />
      <view class="fade-layout__header-inner" :style="headerInnerStyle">
        <slot name="header" />
      </view>
    </view>

    <scroll-view
      class="fade-layout__content"
      scroll-y="true"
      :show-scrollbar="false"
      @scroll="handleScroll"
    >
      <view class="fade-layout__content-inner">
        <slot />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  layoutBackground?: string
  fadeDistance?: number
  maxOpacity?: number
  headerColor?: string
}>(), {
  fadeDistance: 100,
  maxOpacity: 1,
  headerColor: 'transparent',
  layoutBackground: '#f5f5f5',
})

const scrollTop = ref(0)

const headerOpacity = computed(() => {
  const progress = props.fadeDistance > 0 ? scrollTop.value / props.fadeDistance : 1
  return Math.min(Math.max(progress, 0), 1) * props.maxOpacity
})

const headerStyle = computed(() => ({
  opacity: headerOpacity.value,
  backgroundColor: props.headerColor,
  boxShadow: `0 4rpx 16rpx rgba(0, 0, 0, ${0.08 * headerOpacity.value})`,
}))

const headerInnerStyle = computed(() => ({
  opacity: headerOpacity.value,
}))

function handleScroll(event: { detail: { scrollTop: number } }) {
  scrollTop.value = event.detail.scrollTop || 0
}
</script>

<style scoped>
.fade-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.fade-layout__header {
  padding-top: constant(safe-area-inset-bottom));
  overflow: hidden;
}

.fade-layout__header-bg {
  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease;
  pointer-events: none;
  overflow: hidden;
}

.fade-layout__header-inner {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 100%;
}

.fade-layout__content {
  flex: 1;
  overflow: hidden;
}

.fade-layout__content-inner {
  min-height: 100%;
}
</style>
