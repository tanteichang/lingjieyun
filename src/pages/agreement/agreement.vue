<template>
  <wd-navbar title="Navbar 导航条" placeholder left-arrow safe-area-inset-top fixed />
  <!-- 协议内容（使用webview加载html文件） -->
  <web-view fullscreen="false" />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

definePage({
  navigationStyle: 'custom',
})

onLoad(() => {

})

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<style scoped>
web-view {
  margin-top: 120rpx;
  height: calc(100vh - 100rpx);
}
</style>
