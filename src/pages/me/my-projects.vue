<template>
  <view class="projects-page">
    <TopNavbar title="我的项目" @click-left="goBack" />

    <view class="search-bar-container">
      <MySearchBar />
    </view>

    <view class="tabs">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: tab.key === activeStatus }"
        @click="selectTab(tab.key)"
      >
        {{ tab.label }}
      </view>
    </view>

    <scroll-view class="projects-list" scroll-y>
      <view v-for="project in filteredProjects" :key="project.id" class="project-card">
        <view class="card-header">
          <text class="project-title">{{ project.title }}</text>
          <text class="status" :style="{ color: statusMeta[project.status].color }">
            {{ statusMeta[project.status].label }}
          </text>
        </view>

        <view class="info-row">
          <text>企业名称：</text>
          <text>{{ project.company }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">项目周期：</text>
          <text class="info-value">{{ project.period }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">开始时间：</text>
          <text class="info-value">{{ project.startDate }}</text>
        </view>

        <view class="card-divider" />

        <view class="card-footer">
          <view class="manager">
            <image class="avatar" :src="project.manager.avatar" mode="aspectFill" />
            <text class="manager-name">{{ project.manager.role }}·{{ project.manager.name }}</text>
          </view>
          <view class="actions">
            <view
              v-if="project.secondaryAction"
              class="action-btn ghost"
              @click="handleAction(project.secondaryAction.action, project)"
            >
              {{ project.secondaryAction.label }}
            </view>
            <view
              class="action-btn"
              :class="project.primaryAction?.type || 'primary'"
              @click="handleAction(project.primaryAction?.action, project)"
            >
              {{ project.primaryAction?.label }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import MySearchBar from '@/components/common/MySearchBar.vue'
import TopNavbar from '@/components/common/TopNavbar.vue'

definePage({
  navigationStyle: 'custom',
})

type ProjectStatus = 'inProgress' | 'waitingAccept' | 'waitingSettle' | 'finished'

const statusMeta: Record<ProjectStatus, { label: string, color: string }> = {
  inProgress: { label: '进行中', color: '#ff7c1f' },
  waitingAccept: { label: '待验收', color: '#4c7dff' },
  waitingSettle: { label: '待结算', color: '#ff4b55' },
  finished: { label: '已结算', color: '#999999' },
}

interface Project {
  id: number
  title: string
  company: string
  period: string
  startDate: string
  status: ProjectStatus
  manager: {
    name: string
    role: string
    avatar: string
  }
  primaryAction?: {
    label: string
    action: string
    type?: 'primary' | 'success' | 'danger' | 'ghost'
  }
  secondaryAction?: {
    label: string
    action: string
  }
}

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'inProgress', label: '进行中' },
  { key: 'waitingAccept', label: '待验收' },
  { key: 'waitingSettle', label: '待结算' },
  { key: 'finished', label: '已结算' },
]

const keyword = ref('')
const activeStatus = ref<'all' | ProjectStatus>('all')

const projects = ref<Project[]>([
  {
    id: 1,
    title: '高级建筑木工',
    company: '广州新动力有限公司',
    period: '三个月',
    startDate: '2025.11.28',
    status: 'inProgress',
    manager: {
      name: '梁女士',
      role: '人事经理',
      avatar: '/static/me/avatar_man.png',
    },
    primaryAction: { label: '去交付', action: 'deliver', type: 'primary' },
    secondaryAction: { label: '查看合同', action: 'contract' },
  },
  {
    id: 2,
    title: '高级建筑木工',
    company: '广州新动力有限公司',
    period: '三个月',
    startDate: '2025.11.28',
    status: 'waitingAccept',
    manager: {
      name: '梁女士',
      role: '人事经理',
      avatar: '/static/me/avatar_man.png',
    },
    primaryAction: { label: '已交付', action: 'paid', type: 'primary' },
    secondaryAction: { label: '查看合同', action: 'contract' },
  },
  {
    id: 3,
    title: '高级建筑木工',
    company: '广州新动力有限公司',
    period: '三个月',
    startDate: '2025.11.28',
    status: 'waitingSettle',
    manager: {
      name: '梁女士',
      role: '人事经理',
      avatar: '/static/me/avatar_man.png',
    },
    primaryAction: { label: '查看结算单', action: 'settle', type: 'danger' },
    secondaryAction: { label: '查看合同', action: 'contract' },
  },
  {
    id: 4,
    title: '高级建筑木工',
    company: '广州新动力有限公司',
    period: '三个月',
    startDate: '2025.11.28',
    status: 'finished',
    manager: {
      name: '梁女士',
      role: '人事经理',
      avatar: '/static/me/avatar_man.png',
    },
    primaryAction: { label: '查看收入', action: 'income', type: 'ghost' },
    secondaryAction: { label: '查看合同', action: 'contract' },
  },
  {
    id: 4,
    title: '高级建筑木工',
    company: '广州新动力有限公司',
    period: '三个月',
    startDate: '2025.11.28',
    status: 'finished',
    manager: {
      name: '梁女士',
      role: '人事经理',
      avatar: '/static/me/avatar_man.png',
    },
    primaryAction: { label: '查看收入', action: 'income', type: 'ghost' },
    secondaryAction: { label: '查看合同', action: 'contract' },
  },
  {
    id: 4,
    title: '高级建筑木工',
    company: '广州新动力有限公司',
    period: '三个月',
    startDate: '2025.11.28',
    status: 'finished',
    manager: {
      name: '梁女士',
      role: '人事经理',
      avatar: '/static/me/avatar_man.png',
    },
    primaryAction: { label: '查看收入', action: 'income', type: 'ghost' },
    secondaryAction: { label: '查看合同', action: 'contract' },
  },
])

const filteredProjects = computed(() => {
  return projects.value.filter((project) => {
    const matchStatus = activeStatus.value === 'all' || project.status === activeStatus.value
    const matchKeyword
      = !keyword.value.trim()
        || project.title.includes(keyword.value.trim())
        || project.company.includes(keyword.value.trim())
    return matchStatus && matchKeyword
  })
})

function selectTab(status: 'all' | ProjectStatus) {
  activeStatus.value = status
}

function handleAction(action: string | undefined, project: Project) {
  if (!action)
    return
  uni.showToast({
    title: `${project.title}${action}功能开发中`,
    icon: 'none',
  })
}

function goBack() {
  uni.navigateBack()
}
</script>

<style scoped>
.projects-page {
  height: 100vh;
  background: #f6f7fb;
  display: flex;
  flex-direction: column;
}

.search-bar-container {
  background-color: #fff;
  padding: 30rpx;
}

.tabs {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 34rpx;
  background: #fff;
  border-bottom: 1rpx solid #f0f1f6;
}

.tab-item {
  font-weight: 500;
  font-size: 28rpx;
  color: #666666;
  line-height: 48rpx;
  position: relative;
}

.tab-item.active {
  font-weight: bold;
  color: #333;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -26rpx;
  height: 6rpx;
  border-radius: 6rpx;
  background: linear-gradient(90deg, #5a7cff, #5070ff);
}

.projects-list {
  height: 0;
  flex: 1;
  margin-bottom: env(safe-area-inset-bottom);
  padding-top: 16rpx;
}

.project-card {
  background: #fff;
  border-radius: 16rpx;
  margin: 0 14rpx 20rpx 14rpx;
  padding: 30rpx;
  box-shadow: 0 12rpx 24rpx rgba(18, 24, 40, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 46rpx;
}

.project-title {
  font-weight: 800;
  font-size: 32rpx;
  color: #121212;
}

.status {
  font-weight: 800;
  font-size: 30rpx;
}

.info-row {
  display: flex;
  font-weight: 500;
  font-size: 28rpx;
  color: #66676b;
  margin-bottom: 40rpx;
}

.card-divider {
  height: 1rpx;
  background: #f0f1f6;
  margin: 24rpx 0;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.manager {
  display: flex;
  align-items: center;
  gap: 16rpx;
  font-size: 26rpx;
  color: #555;
}

.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14rpx 32rpx;
  border-radius: 999rpx;
  font-size: 26rpx;
  border: none;
  color: #fff;
  background: linear-gradient(90deg, #5a7cff, #5070ff);
}

.action-btn.ghost {
  background: #fff;
  color: #4a4f61;
  border: 2rpx solid #e2e4ef;
}

.action-btn.danger {
  background: linear-gradient(90deg, #ff5d60, #ff3b3f);
}

.action-btn.primary {
  background: linear-gradient(90deg, #5a7cff, #5070ff);
}

.action-btn.success {
  background: linear-gradient(90deg, #34d39a, #2cb782);
}
</style>
