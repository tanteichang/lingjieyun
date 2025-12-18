<template>
  <view class="form-upload-container">
    <text v-if="label" class="label">{{ label }}</text>
    <text v-if="desc" class="desc">{{ desc }}</text>
    <wd-upload>
      <view class="icon">
        <view class="cross">
          <view class="cross-line horizontal" />
          <view class="cross-line vertical" />
        </view>
      </view>
    </wd-upload>
  </view>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.form-upload-container {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 500;
  font-size: 24rpx;
  color: #333333;
  margin-bottom: 18rpx;
}

.desc {
  font-weight: 500;
  font-size: 24rpx;
  color: #c0c0c0;
  margin-bottom: 32rpx;
}

.icon {
  width: 224rpx;
  height: 224rpx;
  background: #ffffff;
  border-radius: 24rpx;
  border: 1rpx dashed #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cross {
  position: relative;
  width: 72rpx;
  height: 72rpx;
}

.cross-line {
  position: absolute;
  top: 50%;
  left: 50%;
  background: #c4c4c4;
  border-radius: 6rpx;
  transform: translate(-50%, -50%);
}

.cross-line.horizontal {
  width: 60rpx;
  height: 4rpx;
}

.cross-line.vertical {
  width: 4rpx;
  height: 60rpx;
}
</style>
