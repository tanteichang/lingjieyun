<template>
  <view class="agreement-page">
    <navigation-bar title="用户协议" />
    <!-- 协议内容（使用webview加载html文件） -->
    <web-view src="https://www.baidu.com" />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 协议类型（service或privacy）
const agreementType = ref('service')
// 协议标题
const title = ref('灵捷云服务协议')

onLoad((query: Record<string, any>) => {
  // 获取协议类型参数
  if (query.type) {
    agreementType.value = query.type
    // 设置标题
    title.value = agreementType.value === 'service' ? '灵捷云服务协议' : '隐私政策'
  }
})

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<style scoped>
.agreement-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  height: 88rpx;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.nav-back {
  width: 60rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 40rpx;
  color: #333;
}

.nav-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.nav-right {
  width: 60rpx;
  height: 88rpx;
}
</style>
