<template>
  <web-view fullscreen="false" src="http://localhost:3300/mock/html/service.html" />
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
