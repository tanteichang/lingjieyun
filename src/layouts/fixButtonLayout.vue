<template>
  <view class="fix-layout">
    <view class="layout-content">
      <slot />
    </view>

    <view class="layout-footer">
      <slot name="button">
        <button class="default-btn">
          确认
        </button>
      </slot>
    </view>
  </view>
</template>

<style scoped>
.fix-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.layout-content {
  flex: 1;
  overflow-y: auto;
}

.layout-footer {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24rpx 32rpx calc(24rpx + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 -12rpx 28rpx rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.default-btn {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  border-radius: 32rpx;
  border: none;
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #5a7cff, #5070ff);
}
</style>
