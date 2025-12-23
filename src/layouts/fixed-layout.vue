<template>
  <view class="fixed-layout" :style="layoutStyle">
    <!-- 顶部导航区域 -->
    <view
      class="fixed-layout__header"
      :style="headerStyle"
    >
      <!-- 具名插槽：header -->
      <slot name="header" />
    </view>

    <!-- 中间滚动内容区域 -->
    <scroll-view
      class="fixed-layout__content"
      scroll-y="true"
      :show-scrollbar="false"
    >
      <!-- 默认插槽：内容 -->
      <slot />
    </scroll-view>

    <!-- 底部固定区域 -->
    <view
      class="fixed-layout__footer fixed-layout__footer--safe"
      :style="footerStyle"
    >
      <!-- 具名插槽：footer -->
      <slot name="footer" />
    </view>
  </view>
</template>

<script>
export default {
  name: 'FixedLayout',
  props: {
    background: {
      type: String,
      default: 'transparent',
    },
    headerBgColor: {
      type: String,
      default: 'transparent',
    },
    footerBgColor: {
      type: String,
      default: 'transparent',
    },
  },
  computed: {
    layoutStyle() {
      return { background: this.background || 'transparent' }
    },
    headerStyle() {
      return { backgroundColor: this.headerBgColor || 'transparent' }
    },
    footerStyle() {
      return { backgroundColor: this.footerBgColor || 'transparent' }
    },
  },
}
</script>

<style scoped>
/* 整体采用 flex 三段式布局 */
.fixed-layout {
  height: 100vh; /* 占满屏幕高度 */
  display: flex;
  flex-direction: column;
  background-color: transparent;
}

/* 顶部区 */
.fixed-layout__header {
  flex-shrink: 0;
  /* 默认高度交给你自己在插槽内控制，或者这里也可以写个 min-height */
  background-color: transparent;
  z-index: 10;
  padding-bottom: 20rpx;
}

/* 中间滚动区 */
.fixed-layout__content {
  flex: 1;
  overflow: hidden; /* 避免外层产生滚动 */
}

/* 底部区 */
.fixed-layout__footer {
  flex-shrink: 0;
  background-color: transparent;
}

/* 适配底部安全区（仅在支持的机型生效） */
.fixed-layout__footer--safe {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
