<template>
  <view class="realname-page">
    <fixedLayout>
      <template #header>
        <TopNavbar
          transparent-background
          theme-color="white"
          @click-left="goBack"
        />
      </template>

      <view class="hero-text">
        <text class="hero-title">实名认证</text>
        <text class="hero-subtitle">请完善以下证件信息</text>
      </view>

      <view class="card">
        <text class="section-title">身份信息</text>

        <view class="upload-area">
          <view class="upload-card" @click="handleUpload('person')">
            <view class="upload-frame">
              <template v-if="form.personImage">
                <image :src="form.personImage" mode="aspectFill" />
              </template>
              <template v-else>
                <image
                  src="@/static/me/idFront.png"
                  mode="scaleToFill"
                  class="upload-icon"
                />
              </template>
            </view>
            <text class="upload-label">上传人像面</text>
          </view>
          <view class="upload-card" @click="handleUpload('nation')">
            <view class="upload-frame">
              <template v-if="form.nationImage">
                <image :src="form.nationImage" mode="aspectFill" />
              </template>
              <template v-else>
                <image
                  src="@/static/me/idBack.png"
                  mode="scaleToFill"
                  class="upload-icon"
                />
              </template>
            </view>
            <text class="upload-label">上传国徽面</text>
          </view>
        </view>

        <view class="tips">
          <text>1. 请上传本人的身份证照片</text>
          <text>2. 拍照时请确保身份证边框完整、图像清晰、光线均匀</text>
        </view>

        <view class="form-group">
          <text class="input-label">姓名</text>
          <input v-model="form.name" class="input-field" placeholder="姓名" disabled>
        </view>
        <view class="form-group">
          <text class="input-label">身份证号码</text>
          <input v-model="form.idCard" class="input-field" placeholder="身份证号码" disabled>
        </view>
        <view class="form-group">
          <text class="input-label">手机号</text>
          <input v-model="form.phone" type="number" class="input-field" placeholder="手机号">
        </view>
      </view>

      <view class="footer">
        <button class="save-btn" @click="handleSave">
          保存
        </button>
      </view>
    </fixedLayout>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import fixedLayout from '@/layouts/fixed-layout.vue'

definePage({
  navigationStyle: 'custom',
  needLogin: true,
})

const statusBarHeight = ref('40px')

const form = reactive({
  name: '',
  idCard: '',
  phone: '18626688888',
  personImage: '',
  nationImage: '',
})

const uploadMap: Record<string, keyof typeof form> = {
  person: 'personImage',
  nation: 'nationImage',
}

function goBack() {
  uni.navigateBack()
}

onMounted(() => {
  const info = uni.getSystemInfoSync()
  if (info?.statusBarHeight) {
    statusBarHeight.value = `${info.statusBarHeight}px`
  }
})

function handleUpload(type: 'person' | 'nation') {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const path = res.tempFilePaths?.[0]
      if (path) {
        const key = uploadMap[type]
        if (key) {
          form[key] = path
        }
      }
    },
  })
}

function handleSave() {
  uni.showToast({
    title: '提交成功',
    icon: 'success',
  })
}
</script>

<style scoped>
.realname-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #155fe2 0%, #f5f6fa 60%);
}

.hero-text {
  display: flex;
  flex-direction: column;
  margin-left: 52rpx;
  color: #ffffff;
  margin-bottom: 90rpx;
}

.hero-title {
  font-weight: 800;
  font-size: 48rpx;
  color: #ffffff;
  margin-bottom: 34rpx;
}

.hero-subtitle {
  font-weight: 500;
  font-size: 28rpx;
  color: #ffffff;
  line-height: 48rpx;
}

.card {
  background: #fff;
  padding: 56rpx 34rpx;
  margin: 0 16rpx;
  border-radius: 16rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #151b2b;
}

.upload-area {
  display: flex;
  gap: 24rpx;
  margin-top: 30rpx;
}

.upload-card {
  flex: 1;
  background: #fbfcff;
  border-radius: 14rpx;
  padding: 24rpx;
  box-shadow: inset 0 0 0 2rpx rgba(37, 100, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.upload-frame {
  width: 100%;
  height: 170rpx;
  position: relative;
  overflow: hidden;
}

.upload-frame image {
  width: 100%;
  height: 100%;
}

.frame-placeholder {
  width: 100%;
  height: 100%;
  opacity: 0.4;
}

.upload-button {
  position: absolute;
  width: 80rpx;
  height: 80rpx;
  background: #3a6fff;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12rpx 24rpx rgba(58, 111, 255, 0.3);
}

.upload-icon {
  width: 500rpx;
  height: 300rpx;
  position: relative;
}

.upload-label {
  font-size: 26rpx;
  color: #4f5d7b;
}

.tips {
  margin-top: 30rpx;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 24rpx;
  color: #121c32;
  line-height: 48rpx;
}

.form-group {
  margin-top: 30rpx;
}

.input-label {
  font-weight: bold;
  font-size: 28rpx;
  color: #121c32;
  line-height: 48rpx;
  margin-bottom: 20rpx;
  display: block;
}

.input-field {
  height: 88rpx;
  padding: 0 24rpx;
  border-radius: 10rpx;
  background: #f6f7f9;
  font-size: 28rpx;
  color: #333;
}

.input-field:disabled {
  color: #7a7d86;
}

.footer {
  padding: 40rpx 32rpx 80rpx;
}

.save-btn {
  width: 100%;
  height: 96rpx;
  background: linear-gradient(90deg, #1f5bff 0%, #0f3ff1 100%);
  color: #fff;
  border-radius: 48rpx;
  border: none;
  font-size: 32rpx;
  font-weight: 600;
}
</style>
