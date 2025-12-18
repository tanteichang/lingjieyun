<template>
  <wd-navbar :fixed="fixed" :custom-style="navbarStyle" safe-area-inset-top :bordered="false">
    <template #left>
      <view class="back-btn" @click="handleClickLeft">
        <wd-icon name="arrow-left1" size="22px" :color="themeColor === 'white' ? '#ffffff' : '#000000'" />
      </view>
    </template>
    <template #title>
      <text class="title" :style="{ color: themeColor === 'white' ? '#ffffff' : '#000000' }">{{ title }}</text>
    </template>
  </wd-navbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  onClickLeft: {
    type: Function,
    default: () => {},
  },
  transparentBackground: {
    type: Boolean,
    default: false,
  },
  themeColor: {
    type: String,
    validator: (value: string) => ['black', 'white'].includes(value),
    default: 'black',
  },
  fixed: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click-left'])

const navbarStyle = computed(() => {
  if (props.transparentBackground) {
    return 'background-color: transparent !important;'
  }
  return ''
})

function handleClickLeft() {
  emit('click-left')
}
</script>

<style scoped>
.back-btn {
  width: 96rpx;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 12rpx;
}

.title {
  font-weight: 800;
  font-size: 30rpx;
  color: #333333;
  line-height: 48rpx;
}
</style>
