<template>
  <view
    class="button" @click="handleClick"
  >
    <text class="text">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['click'])
function handleClick(e) {
  emits('click', e)
}
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007aff;
  color: #fff;
  border-radius: 8rpx;
  cursor: pointer;
  user-select: none;
  width: 100%;
  height: 100rpx;
}
.text {
  font-weight: bold;
  font-size: 28rpx;
  color: #ffffff;
  line-height: 100rpx;
}
</style>
