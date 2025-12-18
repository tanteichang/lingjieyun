<template>
  <view class="job-item-skeleton">
    <view class="skeleton-header">
      <view class="skeleton-title shimmer" />
      <view class="skeleton-salary shimmer" />
    </view>

    <view class="skeleton-tags">
      <view
        v-for="tag in tagPlaceholders"
        :key="tag"
        class="skeleton-tag shimmer"
      />
    </view>

    <view class="skeleton-company shimmer" />

    <view class="skeleton-contact">
      <view class="skeleton-avatar shimmer" />
      <view class="skeleton-contact-text shimmer" />
    </view>
  </view>
</template>

<script setup lang="ts">
const tagPlaceholders = [1, 2, 3]
</script>

<style scoped>
.job-item-skeleton {
  margin: 0 16rpx 16rpx;
  background: #fff;
  padding: 40rpx 15rpx 30rpx 15rpx;
  border-radius: 16rpx;
}

.skeleton-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.skeleton-title {
  width: 320rpx;
  height: 36rpx;
  border-radius: 12rpx;
}

.skeleton-salary {
  width: 160rpx;
  height: 32rpx;
  border-radius: 12rpx;
}

.skeleton-tags {
  display: flex;
  gap: 12rpx;
  margin-bottom: 28rpx;
}

.skeleton-tag {
  width: 120rpx;
  height: 30rpx;
  border-radius: 20rpx;
}

.skeleton-company {
  width: 320rpx;
  height: 30rpx;
  border-radius: 12rpx;
  margin-bottom: 24rpx;
}

.skeleton-contact {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.skeleton-avatar {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
}

.skeleton-contact-text {
  flex: 1;
  height: 32rpx;
  border-radius: 12rpx;
}

.shimmer {
  position: relative;
  overflow: hidden;
  background: #eaeaea;
}

.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  animation: shimmer 1.6s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(200%);
  }
}
</style>
