<template>
  <view class="section-header">
    <view class="section-tabs">
      <text
        class="tab-item"
        :class="{ active: selectedTab === 0 }"
        @click="handleTabClick(0)"
      >
        推荐
      </text>
      <text
        class="tab-item"
        :class="{ active: selectedTab === 1 }"
        @click="handleTabClick(1)"
      >
        附近
      </text>
      <text
        class="tab-item"
        :class="{ active: selectedTab === 2 }"
        @click="handleTabClick(2)"
      >
        最新
      </text>
    </view>
    <view class="section-actions">
      <text
        class="action-item"
        :class="{ active: activeAction === 'job' }"
        @click="handleJobClick"
      >
        职位
      </text>
      <text
        class="action-item"
        :class="{ active: activeAction === 'filter' }"
        @click="handleFilterClick"
      >
        筛选
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义事件
const emit = defineEmits<{
  (e: 'tab-click', index: number): void
  (e: 'job-click'): void
  (e: 'filter-click'): void
}>()

// 当前选中的标签页
const selectedTab = ref<number>(0) // 0: 推荐, 1: 附近, 2: 最新

// 当前激活的操作按钮
const activeAction = ref<string | null>(null) // 'job' 或 'filter' 或 null

// 处理标签页点击
function handleTabClick(index: number): void {
  selectedTab.value = index
  emit('tab-click', index)
}

// 处理职位点击
function handleJobClick(): void {
  activeAction.value = activeAction.value === 'job' ? null : 'job'
  emit('job-click')
}

// 处理筛选点击
function handleFilterClick(): void {
  activeAction.value = activeAction.value === 'filter' ? null : 'filter'
  emit('filter-click')
}
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16rpx;
  padding: 30rpx 0;
  height: 60rpx;
  background-color: #ffffff;
}

.section-tabs {
  /* display: flex;
  align-items: flex-end; */
}

.section-actions {
  display: flex;
  align-items: center;
  margin-right: 50rpx;
}

.action-item {
  font-size: 24rpx;
  color: #999999;
  margin-left: 60rpx;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  padding-bottom: 10rpx;
}

.action-item.active {
  color: #155fe2;
  font-weight: bold;
}

.action-item:before {
  content: '';
  position: absolute;
  bottom: 18rpx;
  right: -20rpx;
  width: 0;
  height: 0;
  border-left: 10rpx solid transparent;
  border-bottom: 10rpx solid #999;
}

.action-item.active:before {
  border-bottom-color: #155fe2;
}

.tab-item {
  font-size: 24rpx;
  color: #333333;
  margin-left: 30rpx;
  margin-right: 30rpx;
  transition: all 0.2s ease;
  position: relative;
  padding-bottom: 10rpx;
}

.tab-item.active {
  color: #121212;
  font-weight: bold;
  font-size: 40rpx;
}
</style>
