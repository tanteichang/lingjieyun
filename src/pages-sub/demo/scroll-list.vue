<script setup lang="ts">
import { ref } from 'vue'
import UScrollList from '@/components/common/UScrollList.vue'

// 基础示例数据
const basicList = ref([
  { id: 1, name: '项目1', color: '#ff6b6b' },
  { id: 2, name: '项目2', color: '#4ecdc4' },
  { id: 3, name: '项目3', color: '#45b7d1' },
  { id: 4, name: '项目4', color: '#f9ca24' },
  { id: 5, name: '项目5', color: '#6c5ce7' },
  { id: 6, name: '项目6', color: '#a29bfe' },
  { id: 7, name: '项目7', color: '#fd79a8' },
  { id: 8, name: '项目8', color: '#fdcb6e' },
])

// 图片列表示例
const imageList = ref([
  { id: 1, image: 'https://picsum.photos/seed/item1/200/200.jpg', title: '风景1' },
  { id: 2, image: 'https://picsum.photos/seed/item2/200/200.jpg', title: '风景2' },
  { id: 3, image: 'https://picsum.photos/seed/item3/200/200.jpg', title: '风景3' },
  { id: 4, image: 'https://picsum.photos/seed/item4/200/200.jpg', title: '风景4' },
  { id: 5, image: 'https://picsum.photos/seed/item5/200/200.jpg', title: '风景5' },
])

// 卡片列表示例
const cardList = ref([
  { id: 1, title: '卡片标题1', desc: '这是卡片描述信息1', price: '¥99' },
  { id: 2, title: '卡片标题2', desc: '这是卡片描述信息2', price: '¥199' },
  { id: 3, title: '卡片标题3', desc: '这是卡片描述信息3', price: '¥299' },
  { id: 4, title: '卡片标题4', desc: '这是卡片描述信息4', price: '¥399' },
  { id: 5, title: '卡片标题5', desc: '这是卡片描述信息5', price: '¥499' },
])

// 滚动到指定项
const basicScrollRef = ref<any>(null)
const imageScrollRef = ref<any>(null)
const cardScrollRef = ref<any>(null)

function scrollToBasic(index: number) {
  basicScrollRef.value?.scrollToItem(index)
}

function scrollToImage(index: number) {
  imageScrollRef.value?.scrollToItem(index)
}

function scrollToCard(index: number) {
  cardScrollRef.value?.scrollToItem(index)
}

// 处理点击事件
function handleBasicItemClick(item: any, index: number) {
  console.log('基础列表点击:', item, index)
  uni.showToast({
    title: `点击了 ${item.name}`,
    icon: 'none',
  })
}

function handleImageItemClick(item: any, index: number) {
  console.log('图片列表点击:', item, index)
  uni.showToast({
    title: `点击了 ${item.title}`,
    icon: 'none',
  })
}

function handleCardItemClick(item: any, index: number) {
  console.log('卡片列表点击:', item, index)
  uni.showToast({
    title: `点击了 ${item.title}`,
    icon: 'none',
  })
}

// 处理滚动事件
function handleScroll(event: any) {
  console.log('滚动事件:', event)
}
</script>

<template>
  <view class="demo-page">
    <view class="demo-section">
      <view class="demo-title">
        基础用法
      </view>
      <UScrollList
        ref="basicScrollRef"
        :list="basicList"
        :item-width="150"
        :item-height="150"
        :item-gap="20"
        @item-click="handleBasicItemClick"
        @scroll="handleScroll"
      >
        <template #item="{ item }">
          <view class="basic-item" :style="{ backgroundColor: item.color }">
            <text class="basic-item-text">{{ item.name }}</text>
          </view>
        </template>
      </UScrollList>

      <view class="scroll-buttons">
        <button size="mini" @click="scrollToBasic(0)">
          滚动到第1项
        </button>
        <button size="mini" @click="scrollToBasic(3)">
          滚动到第4项
        </button>
        <button size="mini" @click="scrollToBasic(7)">
          滚动到第8项
        </button>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">
        图片列表
      </view>
      <UScrollList
        ref="imageScrollRef"
        :list="imageList"
        :item-width="200"
        :item-height="200"
        :item-gap="15"
        :padding="15"
        @item-click="handleImageItemClick"
      >
        <template #item="{ item }">
          <view class="image-item">
            <image class="image-item-img" :src="item.image" mode="aspectFill" />
            <view class="image-item-title">
              {{ item.title }}
            </view>
          </view>
        </template>
      </UScrollList>

      <view class="scroll-buttons">
        <button size="mini" @click="scrollToImage(0)">
          滚动到第1项
        </button>
        <button size="mini" @click="scrollToImage(2)">
          滚动到第3项
        </button>
        <button size="mini" @click="scrollToImage(4)">
          滚动到第5项
        </button>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">
        卡片列表
      </view>
      <UScrollList
        ref="cardScrollRef"
        :list="cardList"
        :item-width="280"
        :item-height="180"
        :item-gap="20"
        :padding="20"
        :show-scrollbar="false"
        @item-click="handleCardItemClick"
      >
        <template #item="{ item }">
          <view class="card-item">
            <view class="card-item-content">
              <view class="card-item-title">
                {{ item.title }}
              </view>
              <view class="card-item-desc">
                {{ item.desc }}
              </view>
            </view>
            <view class="card-item-price">
              {{ item.price }}
            </view>
          </view>
        </template>
      </UScrollList>

      <view class="scroll-buttons">
        <button size="mini" @click="scrollToCard(0)">
          滚动到第1项
        </button>
        <button size="mini" @click="scrollToCard(2)">
          滚动到第3项
        </button>
        <button size="mini" @click="scrollToCard(4)">
          滚动到第5项
        </button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.demo-page {
  padding: 20rpx;
  background-color: #f7f8fa;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 40rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx 0;
}

.demo-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  padding: 0 24rpx 20rpx;
}

.scroll-buttons {
  display: flex;
  justify-content: center;
  gap: 20rpx;
  margin-top: 20rpx;
  padding: 0 24rpx;
}

.basic-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12rpx;
}

.basic-item-text {
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
}

.image-item {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.image-item-img {
  width: 100%;
  height: 160rpx;
}

.image-item-title {
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  font-size: 24rpx;
  color: #333;
  background-color: #fff;
}

.card-item {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-item-content {
  flex: 1;
}

.card-item-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.card-item-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
}

.card-item-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff4757;
}
</style>
