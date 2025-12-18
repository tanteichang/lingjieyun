<template>
  <view class="resume-page">
    <fixedLayout>
      <template #header>
        <TopNavbar
          title="我的简历"
          transparent-background
          theme-color="black"
          @click-left="goBack"
        />

        <view class="hero">
          <view class="hero-tip">
            <view class="tip-left">
              <wd-icon name="tips" size="24rpx" color="#537BFF" />
              <text class="tip-text">简历越完善，找项目越快！</text>
            </view>
            <view class="tip-action" @click="handleImprove">
              去完善
            </view>
          </view>

          <view class="progress-section">
            <text class="progress-label">当前进度 10%</text>
            <progress :percent="10" activeColor="#537BFF" backgroundColor="#E5EBFF" border-radius="5rpx" />
          </view>
        </view>
      </template>

      <view class="profile-card">
        <view class="profile-info">
          <view class="profile-name">
            <text class="name-text">先生</text>
            <view class="profile-edit" @click="handleImprove">
              <wd-icon name="edit-outline" size="40rpx" />
            </view>
          </view>
          <view class="profile-detail">
            <text>男</text>
            <view class="phone">
              <wd-icon name="phone" size="30rpx" color="#333333" />
              <text>182******68</text>
            </view>
          </view>
        </view>
        <image class="avatar" src="@/static/me/avatar_man.png" mode="aspectFit" />
      </view>

      <view class="section-list">
        <view
          v-for="section in sections"
          :key="section.key"
          class="section-item"
          @click="handleSection(section)"
        >
          <view class="section-content">
            <text class="section-title">{{ section.title }}</text>
            <view class="section-action">
              <wd-icon v-if="section.type === 'edit'" name="edit-outline" size="40rpx" />
              <wd-icon v-else name="add-circle" size="40rpx" />
            </view>
          </view>
          <text class="section-desc">{{ section.desc }}</text>
        </view>
      </view>

      <template #footer>
        <button class="preview-btn" @click="previewResume">
          预览我的简历
        </button>
      </template>
    </fixedLayout>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { computed, onMounted, ref } from 'vue'
import TopNavbar from '@/components/common/TopNavbar.vue'
import fixedLayout from '@/layouts/fixed-layout.vue'

definePage({
  navigationStyle: 'custom',
})

interface SectionItem {
  key: string
  title: string
  desc: string
  type: 'edit' | 'add'
}

const ADVANTAGE_KEY = 'resumeAdvantage'
const CITY_KEY = 'resumeCity'
const advantagePlaceholder = '一句话介绍自己，突出核心优势'
const advantageDesc = ref(advantagePlaceholder)
const cityDesc = ref('选择您想工作的城市')

const otherSections: SectionItem[] = [
  { key: 'target', title: '项目期望', desc: '完善期望获得求职机会，也让企业发现你', type: 'add' },
  { key: 'work', title: '工作经历', desc: '添加工作经历，能帮助提升项目竞争力', type: 'add' },
  { key: 'project', title: '项目经历', desc: '添加工作经历，能帮助提升项目竞争力', type: 'add' },
  { key: 'education', title: '教育经历', desc: '添加教育经历，能帮助提升项目竞争力', type: 'add' },
  { key: 'certificate', title: '资格证书', desc: '添加资格证书，证明你的专业能力', type: 'add' },
]

const sections = computed<SectionItem[]>(() => [
  { key: 'advantage', title: '个人优势', desc: advantageDesc.value, type: 'edit' },
  { key: 'city', title: '工作城市', desc: cityDesc.value, type: 'edit' },
  ...otherSections.filter(section => section.key !== 'city'),
])

function loadAdvantage() {
  const stored = uni.getStorageSync(ADVANTAGE_KEY)
  if (typeof stored === 'string' && stored.trim()) {
    advantageDesc.value = stored.trim()
  }
  else {
    advantageDesc.value = advantagePlaceholder
  }
}

function loadCity() {
  const stored = uni.getStorageSync(CITY_KEY)
  if (stored?.province && stored?.city) {
    cityDesc.value = `${stored.province} · ${stored.city}`
  }
  else {
    cityDesc.value = '选择您想工作的城市'
  }
}

onMounted(() => {
  loadAdvantage()
  loadCity()
})

onShow(() => {
  loadAdvantage()
  loadCity()
})

function goBack() {
  uni.navigateBack()
}

function handleImprove() {
  uni.showToast({
    title: '完善简历功能开发中',
    icon: 'none',
  })
}

function handleSection(section: SectionItem) {
  if (section.key === 'advantage') {
    uni.navigateTo({
      url: '/pages/me/advantage-edit',
    })
    return
  }
  if (section.key === 'city') {
    uni.navigateTo({
      url: '/pages/me/city-picker',
    })
    return
  }

  if (section.key === 'target') {
    uni.navigateTo({
      url: '/pages/me/project-expectation',
    })
    return
  }

  if (section.key === 'work') {
    uni.navigateTo({
      url: '/pages/me/work-experience-edit',
    })
    return
  }

  if (section.key === 'project') {
    uni.navigateTo({
      url: '/pages/me/project-experience-edit',
    })
    return
  }

  if (section.key === 'certificate') {
    uni.navigateTo({
      url: '/pages/me/certificate-edit',
    })
    return
  }

  if (section.key === 'education') {
    uni.navigateTo({
      url: '/pages/me/education-experience-edit',
    })
    return
  }

  uni.showToast({
    title: `${section.title}功能开发中`,
    icon: 'none',
  })
}

function previewResume() {
  uni.navigateTo({
    url: '/pages/me/resume-preview',
  })
}
</script>

<style scoped>
.resume-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #87a3ff 0%, #fff 30%);
}

.hero {
  padding: 10rpx 40rpx 20rpx;
}

.hero-tip {
  border-radius: 24rpx;
  padding: 20rpx 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tip-left {
  display: flex;
  align-items: center;
  gap: 12rpx;
  color: #4a5f9d;
  font-size: 24rpx;
}

.tip-icon {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 2rpx solid #5c6ac4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
}

.tip-text {
  font-weight: 500;
  font-size: 24rpx;
  color: #537bff;
}

.tip-action {
  background: linear-gradient(90deg, #5c8dff, #3c6df6);
  color: #fff;
  border-radius: 999rpx;
  font-size: 24rpx;
  padding: 10rpx 22rpx;
}

.progress-section {
  margin-top: 32rpx;
}

.progress-label {
  font-weight: 800;
  font-size: 24rpx;
  color: #537bff;
  line-height: 48rpx;
  margin-bottom: 28rpx;
}

.profile-card {
  margin: 0 32rpx 0;
  padding: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-name {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.name-text {
  font-size: 36rpx;
  font-weight: 600;
  color: #1d1d1d;
}

.profile-edit {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-detail {
  margin-top: 12rpx;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 24rpx;
  font-weight: 500;
  font-size: 24rpx;
  color: #333333;
}

.phone {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.phone-icon {
  width: 26rpx;
  height: 26rpx;
  border: 2rpx solid #5b5f69;
  border-radius: 6rpx;
}

.avatar {
  width: 108rpx;
  height: 108rpx;
  border-radius: 50%;
}

.section-list {
  margin: 24rpx 32rpx 0;
  padding: 20rpx 0;
  border-top: 1rpx solid #e3e6ef;
}

.section-item {
  padding: 32rpx 38rpx;
  border-bottom: 1rpx solid #e3e6ef;
  display: flex;
  flex-direction: column;
}

.section-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-weight: 800;
  font-size: 30rpx;
  color: #333333;
  margin-bottom: 50rpx;
  margin-top: 50rpx;
  display: block;
}

.section-desc {
  display: block;
  font-weight: 500;
  font-size: 24rpx;
  color: #c0c0c0;
  margin-bottom: 50rpx;
}

.section-action {
  display: flex;
  align-items: center;
}

.plus-circle {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 2rpx solid #b7b8c3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6a6b77;
  font-size: 36rpx;
}

.edit-outline {
  width: 48rpx;
  height: 48rpx;
  border-radius: 10rpx;
  border: 2rpx solid #b7b8c3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-pen {
  width: 26rpx;
  height: 10rpx;
  border-top: 4rpx solid #6a6b77;
  transform: rotate(-35deg);
}

.footer {
  padding: 40rpx 32rpx 120rpx;
}

.preview-btn {
  width: 100%;
  height: 100rpx;
  font-weight: bold;
  line-height: 100rpx;
  font-size: 28rpx;
  color: #ffffff;

  background: #537bff;
  border-radius: 10rpx;
}
</style>
