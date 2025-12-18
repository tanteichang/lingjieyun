<template>
  <view class="search-input">
    <wd-icon name="search1" size="40rpx" color="#B1B1C0" style="margin-right: 22rpx;" />
    <input
      v-model="keyword"
      class="search-field"
      type="text"
      placeholder="搜索项目名称"
      placeholder-style="color:#bfc6d7;font-size:26rpx"
      confirm-type="search"
    >
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
</script>

<style scoped>
.search-input {
  display: flex;
  align-items: center;
  background: #f6f7f9;
  border-radius: 34rpx;
  height: 66rpx;
  padding: 0 32rpx;
}

.search-field {
  flex: 1;
  font-size: 24rpx;
  color: #989ca2;
}
</style>
