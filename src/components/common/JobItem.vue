<template>
  <view class="job-item" @click="navigateToDetail">
    <view class="job-header">
      <view class="job-title-container">
        <text class="job-title">{{ job.title }}</text>
        <!-- <view class="hr-badge">
          人力资源
        </view> -->
      </view>
      <text class="job-salary">{{ job.salary }}</text>
    </view>

    <view class="job-tags">
      <Tag text="月结" />
      <Tag :text="job.workType" />
      <Tag :text="job.address.split(' ')[0]" />
    </view>

    <view class="company-section">
      <view class="company-info">
        <text class="company-name">{{ job.companyName }}</text>
        <view class="contact-info">
          <view class="contact-item">
            <image src="@/static/index/avatar.png" mode="aspectFill" class="person-avatar" />
            <text class="contact-text">人事经理:{{ job.contactPerson || '女士' }}</text>
          </view>
          <text class="location-text">{{ job.address }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Job } from '@/types/job'
import Tag from '@/components/common/Tag.vue'

// 定义组件属性
const props = defineProps<{
  job: Job
}>()

// 定义事件
const emit = defineEmits<{
  (e: 'click', jobId: string): void
}>()

// 跳转到详情页
function navigateToDetail(): void {
  emit('click', props.job.id)
}
</script>

<style scoped>
.job-item {
  margin: 0 16rpx 16rpx 16rpx;
  background: #fff;
  position: relative;
  padding: 40rpx 15rpx 30rpx 15rpx;
  border-radius: 16rpx;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.job-title-container {
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 24rpx;
}

.job-title {
  font-size: 32rpx;
  color: #121212;
  font-weight: 800;
  line-height: 48rpx;
}

.hr-badge {
  background-color: #4ab3ff;
  color: white;
  font-size: 20rpx;
  padding: 4rpx 10rpx;
  border-radius: 10rpx;
  font-weight: 500;
}

.job-salary {
  font-size: 30rpx;
  font-weight: 800;
  color: #155fe2;
  white-space: nowrap;
}

.job-tags {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  gap: 12rpx;
}

.tag {
  padding: 12rpx 16rpx;
  margin-right: 12rpx;
  background-color: #f0f1f7;
  color: #66676b;
  font-size: 24rpx;
  border-radius: 6rpx;
  white-space: nowrap;
}

.company-section {
  display: flex;
  align-items: flex-start;
}

.company-info {
  flex: 1;
}

.company-name {
  font-size: 28rpx;
  color: #66676b;
  margin-bottom: 26rpx;
  display: block;
}

.contact-info {
  font-size: 24rpx;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.contact-item {
  display: flex;
  align-items: center;
}

.person-avatar {
  width: 44rpx;
  height: 44rpx;
  margin-right: 16rpx;
}

.contact-text {
  font-size: 26rpx;
  color: #66676b;
}

.location-text {
  display: block;
  font-size: 26rpx;
  color: #66676b;
}
</style>
