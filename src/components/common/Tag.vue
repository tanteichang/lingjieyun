<template>
  <view class="tag" :class="{ 'tag-primary': type === 'primary' }" @click="handleClick">
    {{ text }}
  </view>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'normal',
  },
})
const emits = defineEmits(['click'])
function handleClick(e) {
  emits('click', e)
}
</script>

<style scoped lang="scss">
.tag {
  display: inline-block;
  padding: 12rpx;
  border-radius: 6rpx;
  font-weight: 500;
  font-size: 24rpx;
  background: #f0f1f7;
  color: #66676b;
}
.tag-primary {
  background: #e0ebff;
  color: #155fe2;
}
</style>
