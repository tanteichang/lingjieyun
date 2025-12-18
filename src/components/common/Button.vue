<template>
  <view
    class="button" :class="[
      { 'button--disabled': props.disabled || props.loading },
    ]"
    @click="handleClick"
  >
    <text>{{ props.loading ? '加载中' : '点击' }}</text>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['click'])

function handleClick(e) {
  // if (props.disabled || props.loading) {
  //   return
  // }
  console.log('handleClick')
  emits('click', e)
}
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx 40rpx;
  background-color: #007aff;
  color: #fff;
  border-radius: 8rpx;
  cursor: pointer;
  user-select: none;
  width: 100%;
  height: 100rpx;
}

.button:active:not(.button--disabled) {
  opacity: 0.8;
  transform: scale(0.98);
}

.button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
