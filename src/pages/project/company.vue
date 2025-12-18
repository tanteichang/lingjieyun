<template>
  <view class="company-page">
    <view class="nav-wrapper">
      <TopNavbar transparent-background theme-color="white" @click-left="goBack" />
    </view>
    <view class="company-hero">
      <view class="company-hero__content">
        <image class="company-logo" :src="company.logo" mode="aspectFill" />
        <view class="company-hero__info">
          <text class="company-name">{{ company.name }}</text>
          <text class="company-openings">{{ company.openings }}</text>
        </view>
      </view>
    </view>

    <scroll-view class="company-scroll" scroll-y :show-scrollbar="false">
      <view class="company-scroll__inner">
        <view class="info-card contact-card">
          <view
            v-for="item in contactList"
            :key="item.label"
            class="contact-row"
            @click="handleContact(item)"
          >
            <view class="contact-icon">
              <wd-icon :name="item.icon" size="30rpx" color="#155fe2" />
            </view>
            <view class="contact-content">
              <text class="contact-label">{{ item.label }}：</text>
              <text class="contact-value">{{ item.value }}</text>
            </view>
            <view v-if="item.tip" class="contact-tip">
              {{ item.tip }}
            </view>
          </view>
        </view>

        <view class="info-card">
          <view class="section-header">
            <view class="section-indicator" />
            <text class="section-title">公司简介</text>
          </view>
          <text
            v-for="(paragraph, index) in company.intro"
            :key="index"
            class="intro-text"
          >
            {{ paragraph }}
          </text>
        </view>

        <view class="info-card">
          <view class="section-header">
            <view class="section-indicator" />
            <text class="section-title">发布项目（{{ company.projects.length }}）</text>
          </view>
          <view
            v-for="project in company.projects"
            :key="project.id"
            class="project-card"
            @click="handleProjectClick(project)"
          >
            <view class="project-title-row">
              <text class="project-title">{{ project.title }}</text>
              <text class="project-salary">{{ project.salary }}</text>
            </view>
            <view class="project-tags">
              <Tag v-for="badge in project.badges" :key="badge" :text="badge" />
              <Tag v-for="tag in project.tags" :key="tag" :text="tag" />
            </view>
            <view class="project-meta">
              <text class="project-location">{{ project.location }}</text>
              <text class="project-time">{{ project.publishTime }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import Tag from '@/components/common/Tag.vue'

interface ContactItem {
  icon: string
  label: string
  value: string
  type: 'phone' | 'email' | 'address'
  tip?: string
}

interface ProjectItem {
  id: number
  title: string
  salary: string
  badges: string[]
  tags: string[]
  location: string
  publishTime: string
}

const company = {
  name: '广州新际网络科技有限公司',
  openings: '2个岗位在招',
  logo: '/static/me/avatar_man.png',
  phone: '020-88888888',
  email: 'xinji@126.com',
  address: '广州市番禺区南村万博四海城4栋701室广州市番禺区南村万博四海城4栋701室',
  location: {
    latitude: 23.02067,
    longitude: 113.75179,
  },
  intro: [
    '广州新际网络科技有限公司成立于2009年，是国家认定的“高新技术企业”和“科技型创新企业”，12年来致力于为企业和个人提供高可用性数字化综合服务，是集品牌网站建设、电商平台开发、小程序应用开发、APP应用开发为一体的信息化服务商。',
    '十年间，我们整合商业思考、视觉美学、用可量化的技术标准推动产品价值最大化，协助企业构建互联时代的运作体系，有效对接BATJ等头部资源，发现潜在价值机遇。',
  ],
  projects: [
    {
      id: 1,
      title: '财务会计',
      salary: '3500-5500元',
      badges: ['企业认证'],
      tags: ['月结', '核算会计', '成本会计'],
      location: '广州 · 番禺',
      publishTime: '11月28日 09:50',
    },
    {
      id: 2,
      title: '高级建筑木工',
      salary: '3500-5500元',
      badges: ['企业认证'],
      tags: ['月结', '核算会计', '成本会计'],
      location: '广州 · 番禺',
      publishTime: '11月28日 09:50',
    },
  ] as ProjectItem[],
}

const contactList: ContactItem[] = [
  {
    icon: 'phone',
    label: '电话',
    value: company.phone,
    type: 'phone',
  },
  {
    icon: 'mail',
    label: '邮箱',
    value: company.email,
    type: 'email',
    tip: '复制',
  },
  {
    icon: 'location',
    label: '地址',
    value: company.address,
    type: 'address',
    tip: '复制',
  },
]

function goBack() {
  uni.navigateBack()
}

function handleContact(item: ContactItem) {
  switch (item.type) {
    case 'phone':
      uni.makePhoneCall({
        phoneNumber: company.phone,
        fail: () => {
          uni.showToast({
            title: '暂时无法拨打',
            icon: 'none',
          })
        },
      })
      break
    case 'email':
      uni.setClipboardData({
        data: company.email,
        success: () => {
          uni.showToast({
            title: '邮箱已复制',
            icon: 'none',
          })
        },
      })
      break
    case 'address':
      uni.setClipboardData({
        data: company.address,
        success: () => {
          uni.showToast({
            title: '地址已复制',
            icon: 'none',
          })
        },
      })
      break
  }
}

function handleProjectClick(project: ProjectItem) {
  uni.navigateTo({
    url: `/pages/project/detail?id=${project.id}`,
  })
}
</script>

<style scoped>
.company-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(to bottom, #155fe2 0%, #f5f6fa 50%);
}

.company-hero {
  position: relative;
}

.company-hero__content {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding: 40rpx;
}

.company-logo {
  width: 120rpx;
  height: 120rpx;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.25);
}

.company-hero__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.company-name {
  color: #ffffff;
  font-size: 34rpx;
  font-weight: 600;
}

.company-openings {
  color: rgba(255, 255, 255, 0.85);
  font-size: 26rpx;
}

.company-scroll {
  flex: 1;
  min-height: 0;
}

.company-scroll__inner {
  padding: 0 24rpx 40rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.info-card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx 28rpx;
  box-shadow: 0 12rpx 32rpx rgba(15, 42, 91, 0.05);
}

.contact-card {
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
  padding: 18rpx 0;
  font-weight: 500;
  font-size: 24rpx;
  color: #333333;
  line-height: 48rpx;
}

.contact-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 16rpx;
  background: rgba(21, 95, 226, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-content {
  /* display: flex;
  flex-direction: row;
  gap: 6rpx; */
}

.contact-label {
}

.contact-value {
}

.contact-tip {
  font-size: 22rpx;
  color: #155fe2;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.section-indicator {
  width: 6rpx;
  height: 28rpx;
  border-radius: 999rpx;
  background: #155fe2;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1f2333;
}

.intro-text {
  font-size: 26rpx;
  color: #4d5363;
  line-height: 1.7;
  margin-bottom: 18rpx;
  display: block;
}

.project-card {
  border-radius: 20rpx;
  border: 1rpx solid #eef0f5;
  padding: 24rpx;
  margin-bottom: 20rpx;
}

.project-card:last-child {
  margin-bottom: 0;
}

.project-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.project-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #232733;
}

.project-salary {
  font-size: 28rpx;
  font-weight: 600;
  color: #4a7aff;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.project-badge {
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  background: rgba(21, 95, 226, 0.12);
  font-size: 24rpx;
  color: #155fe2;
}

.project-tag {
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  background: #f2f3f8;
  font-size: 24rpx;
  color: #5a6073;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: #8b91a5;
}
</style>
