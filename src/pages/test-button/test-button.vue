<template>
  <view class="page">
    <view class="container">
      <text class="title">Button 组件测试</text>
      
      <view class="button-group">
        <text class="subtitle">基本按钮</text>
        <Button @click="onButtonClick('基本按钮')" />
      </view>
      
      <view class="button-group">
        <text class="subtitle">禁用状态</text>
        <Button disabled @click="onButtonClick('禁用按钮')" />
      </view>
      
      <view class="button-group">
        <text class="subtitle">加载状态</text>
        <Button loading @click="onButtonClick('加载按钮')" />
      </view>
      
      <view class="button-group">
        <text class="subtitle">点击状态</text>
        <Button @click="onButtonClick('点击状态按钮')" />
        <text class="result">{{ clickResult }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/common/Button.vue'

const clickResult = ref('')

function onButtonClick(buttonType: string) {
  clickResult.value = `${buttonType} 被点击了！`
  console.log(buttonType, '被点击了')
}
</script>

<style scoped>
.page {
  padding: 40rpx;
}

.container {
  max-width: 600rpx;
  margin: 0 auto;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
  display: block;
}

.button-group {
  margin-bottom: 32rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 16rpx;
  display: block;
}

.result {
  display: block;
  margin-top: 16rpx;
  color: #07c160;
  font-size: 24rpx;
}
</style>