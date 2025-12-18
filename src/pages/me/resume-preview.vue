<template>
  <fixed-layout>
    <template #header>
      <TopNavbar title="预览" @click-left="goBack" />
    </template>
    <scroll-view class="preview-scroll" scroll-y :show-scrollbar="false">
      <view class="header-card">
        <view class="header-info">
          <text class="resume-name">{{ resume.name }}</text>
          <text class="resume-role">{{ resume.role }}</text>

          <view class="resume-tags">
            <view v-for="tag in resume.tags" :key="tag" class="resume-tag">
              {{ tag }}
            </view>
          </view>
        </view>
        <image class="resume-avatar" :src="resume.avatar" mode="aspectFill" />
      </view>

      <view class="section-card">
        <view class="section-title">
          <view class="section-indicator" />
          <text>个人优势</text>
        </view>
        <text class="section-text">
          {{ resume.advantage }}
        </text>
      </view>

      <view class="section-card">
        <view class="section-title">
          <view class="section-indicator" />
          <text>工作城市</text>
        </view>
        <text class="section-value">{{ resume.city }}</text>
      </view>

      <view class="section-card">
        <view class="section-header">
          <view class="section-title">
            <view class="section-indicator" />
            <text>项目期望</text>
          </view>
          <text class="section-link">{{ resume.expectation.salary }}</text>
        </view>
        <text class="section-value">{{ resume.expectation.role }}</text>
      </view>

      <view class="section-card">
        <view class="section-title">
          <view class="section-indicator" />
          <text>工作经历</text>
        </view>
        <view
          v-for="experience in resume.workExperiences"
          :key="experience.company"
          class="experience-card"
        >
          <view class="experience-header">
            <view>
              <text class="experience-company">{{ experience.company }}</text>
              <text class="experience-role">{{ experience.role }}</text>
            </view>
            <text class="experience-period">{{ experience.period }}</text>
          </view>
          <view class="experience-body">
            <text
              v-for="(duty, index) in experience.duties"
              :key="index"
              class="experience-duty"
            >
              {{ index + 1 }}、{{ duty }}
            </text>
          </view>
        </view>
      </view>

      <view class="section-card">
        <view class="section-title">
          <view class="section-indicator" />
          <text>项目经历</text>
        </view>
        <view
          v-for="project in resume.projectExperiences"
          :key="project.name"
          class="experience-card"
        >
          <view class="experience-header">
            <view>
              <text class="experience-company">{{ project.name }}</text>
              <text class="experience-role">{{ project.role }}</text>
            </view>
            <text class="experience-period">{{ project.period }}</text>
          </view>
          <view class="experience-body">
            <text
              v-for="(item, index) in project.details"
              :key="index"
              class="experience-duty"
            >
              {{ index + 1 }}、{{ item }}
            </text>
          </view>
        </view>
      </view>

      <view class="section-card">
        <view class="section-title">
          <view class="section-indicator" />
          <text>教育经历</text>
        </view>
        <view
          v-for="education in resume.educationExperiences"
          :key="education.school"
          class="experience-card"
        >
          <view class="experience-header">
            <view>
              <text class="experience-company">{{ education.school }}</text>
              <text class="experience-role">{{ education.major }}</text>
            </view>
            <text class="experience-period">{{ education.period }}</text>
          </view>
          <view class="experience-body">
            <text class="experience-duty">
              {{ education.description }}
            </text>
          </view>
        </view>
      </view>
    </scroll-view>
  </fixed-layout>
</template>

<script setup lang="ts">
import TopNavbar from '@/components/common/TopNavbar.vue'
import fixedLayout from '@/layouts/fixed-layout.vue'

definePage({
  navigationStyle: 'custom',
})

const resume = {
  name: '张三',
  role: '广州新际 · 安卓开发',
  tags: ['5年经验', '本科', '26岁'],
  avatar: '/static/me/avatar.png',
  advantage:
    '本人是市场营销专业本科毕业生，有丰富的营销知识体系基础；对于市场营销方面的前沿和动向有一定的了解，善于分析和吸取经验，熟悉网络推广，有独到的见解和经验，个性开朗，容易相处，团队荣誉感强，有明确的职业规划。',
  city: '广州',
  expectation: {
    role: '全栈工程师',
    salary: '10-12K',
  },
  workExperiences: [
    {
      company: '广州新际网络科技有限公司',
      role: '安卓开发',
      period: '2019.04-至今',
      duties: [
        '承担Android客户端核心功能开发与整体架构设计工作',
        '制定模块间及第三方组件间的高效解耦策略，提升代码可维护性',
        '参与产品需求研讨，协同完成技术方案的规划与设计',
      ],
    },
  ],
  projectExperiences: [
    {
      name: '灵捷云平台小程序开发',
      role: '前端开发',
      period: '2025.12-2026.02',
      details: [
        '承担小程序端核心功能开发与整体架构设计工作',
        '制定模块间及第三方组件间的高效解耦策略，提升代码可维护性',
        '参与产品需求研讨，协同完成技术方案的规划与设计',
      ],
    },
  ],
  educationExperiences: [
    {
      school: '可瓦大学',
      major: '安卓开发',
      period: '2021.09-2022.06',
      description: '负责部门的培训并组织相关交流会议，制定各部门职能规划，统筹协调各部门发展，提升工作效率。',
    },
  ],
}

function goBack() {
  uni.navigateBack()
}
</script>

<style scoped>
.preview-scroll {
  flex: 1;
  background: #fff;
}

.header-card {
  margin: 40rpx;
  display: flex;
  justify-content: space-between;
  border-bottom: 2rpx solid #e3e6ef;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.resume-name {
  font-weight: 800;
  font-size: 40rpx;
  color: #333333;
  margin-bottom: 30prx;
}

.resume-role {
  display: inline-block;
  font-weight: bold;
  font-size: 28rpx;
  color: #666666;
  margin-top: 30rpx;
}

.resume-tags {
  display: flex;
  gap: 16rpx;
  margin-top: 30rpx;
}

.resume-tag {
  font-weight: 500;
  font-size: 24rpx;
  color: #333333;
  margin-bottom: 30rpx;
}

.resume-avatar {
  width: 108rpx;
  height: 108rpx;
  border-radius: 50%;
  background: #f3f4f8;
}

.section-card {
  margin: 40rpx;
  padding-bottom: 50rpx;
  border-bottom: 2rpx solid #e3e6ef;
}

.section-card:last-child {
  border-bottom: none;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12rpx;
  font-size: 30rpx;
  font-weight: 600;
  color: #1b1d2c;
  margin-bottom: 40rpx;
}

.section-title text {
  font-weight: 600;
}

.section-indicator {
  width: 6rpx;
  height: 28rpx;
  border-radius: 999rpx;
  background: #4a7aff;
}

.section-text {
  margin-top: 18rpx;
  color: #4c4f5e;
  font-size: 26rpx;
  line-height: 1.7;
}

.section-value {
  margin-top: 18rpx;
  font-size: 28rpx;
  color: #292c3f;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-link {
  color: #4a7aff;
  font-size: 26rpx;
}

.experience-card {
  padding-top: 24rpx;
}

.experience-card + .experience-card {
  border-top: 1rpx solid #f1f2f6;
  margin-top: 24rpx;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16rpx;
}

.experience-company {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #22253b;
}

.experience-role {
  display: block;
  margin-top: 6rpx;
  font-size: 26rpx;
  color: #72778c;
}

.experience-period {
  font-size: 24rpx;
  color: #9296a8;
}

.experience-body {
  margin-top: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.experience-duty {
  font-size: 26rpx;
  color: #4c4f5e;
  line-height: 1.6;
}
</style>
