<template>
  <view class="job-categories">
    <HorizontalScrollList>
      <view class="category-nav-wrapper">
        <view
          v-for="(category, index) in categories"
          :key="category.key"
          class="category-item"
          :class="{ active: selectedCategory === index }"
          @click="handleCategoryClick(index)"
        >
          <view class="category-icon">
            <image :src="category.icon" mode="aspectFit" />
          </view>
          <text class="category-name">{{ category.name }}</text>
        </view>
      </view>
    </HorizontalScrollList>

    <!-- 区域筛选 -->
    <view class="filter-section">
      <view class="filter-item student" @click="handleFilterClick('student')">
        <text class="filter-text">学生专区</text>
      </view>
      <view class="filter-item brand" @click="handleFilterClick('brand')">
        <text class="filter-text">品牌专区</text>
      </view>
      <view class="filter-item daily" @click="handleFilterClick('daily')">
        <text class="filter-text">日结专区</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HorizontalScrollList from '@/components/common/HorizontalScrollList.vue'

// 定义组件的emit事件
const emit = defineEmits<{
  'category-change': [index: number]
  'filter-change': [type: string]
}>()

// 定义分类数据
const categories = ref([
  { key: 'manufacturing', name: '生产制造', icon: '/static/index/manufacturing.png' },
  { key: 'foodService', name: '餐饮服务', icon: '/static/index/foodService.png' },
  { key: 'hotelTourism', name: '酒店旅游', icon: '/static/index/hotelTourism.png' },
  { key: 'deliveryLoading', name: '配送装卸', icon: '/static/index/deliveryLoading.png' },
  { key: 'storeClerk', name: '店面店员', icon: '/static/index/storeClerk.png' },
  { key: 'storeClerk2', name: '店面店员2', icon: '/static/index/组 3(1).png' },
  { key: 'storeClerk3', name: '店面店员3', icon: '/static/index/组 3(2).png' },
  { key: 'storeClerk4', name: '店面店员4', icon: '/static/index/组 3(3).png' },
  { key: 'storeClerk5', name: '店面店员5', icon: '/static/index/组 3(9).png' },
])

// 当前选中的分类
const selectedCategory = ref(2) // 默认选中酒店旅游

// 处理分类点击事件
function handleCategoryClick(index: number): void {
  selectedCategory.value = index
  emit('category-change', index)
}

// 处理筛选点击事件
function handleFilterClick(type: string): void {
  emit('filter-change', type)
}
</script>

<style scoped>
.job-categories {
  /* #ifdef MP-ALIPAY */

  /* #endif */
  background: #fff;
}
/* 分类导航 */
.category-nav-wrapper {
  display: inline-flex;
  padding: 24rpx 0;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12rpx 30rpx;
  cursor: pointer;
  position: relative;
  min-width: 95rpx;
  /* #ifdef MP-ALIPAY */
  min-width: 100rpx;
  /* #endif */
}

.category-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 14rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-icon image {
  width: 100%;
  height: 100%;
}

.category-name {
  font-size: 24rpx;
  color: #121212;
}

/* 筛选区域 */
.filter-section {
  padding: 0 30rpx 40rpx 30rpx;
  margin: 40rpx 0 14rpx 0;
  display: flex;
  justify-content: space-between;
}

.filter-item {
  flex: 1;
  height: 76rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16rpx;
  margin: 0 8rpx;
  cursor: pointer;
  transition: transform 0.2s;
}

.filter-item:active {
  transform: scale(0.95);
}

.filter-item.student {
  background-color: #47a2ff;
  box-shadow: 0 4rpx 12rpx rgba(74, 179, 255, 0.3);
}

.filter-item.brand {
  background-color: #49b3e3;
  box-shadow: 0 4rpx 12rpx rgba(144, 92, 255, 0.3);
}

.filter-item.daily {
  background-color: #7f58fa;
  box-shadow: 0 4rpx 12rpx rgba(255, 115, 150, 0.3);
}

.filter-text {
  font-size: 28rpx;
  font-weight: 600;
  color: white;
}
</style>
