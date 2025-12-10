<script setup lang="ts">
// 项目广场页面
import { onMounted, ref } from 'vue'

// 模拟项目数据
const projects = ref([
  {
    id: 1,
    title: '软件开发工程师招聘',
    company: '灵捷云科技有限公司',
    location: '北京市朝阳区',
    salary: '20-35K',
    category: '技术开发',
    publishTime: '2小时前',
    applyCount: 156,
    tags: ['全职', '本科', '3-5年'],
    logo: '🏢',
  },
  {
    id: 2,
    title: 'UI/UX设计师',
    company: '创新科技有限公司',
    location: '上海市浦东新区',
    salary: '15-25K',
    category: '设计',
    publishTime: '5小时前',
    applyCount: 89,
    tags: ['全职', '本科', '1-3年'],
    logo: '🎨',
  },
  {
    id: 3,
    title: '市场营销专员',
    company: '未来科技集团',
    location: '广州市天河区',
    salary: '12-20K',
    category: '市场',
    publishTime: '1天前',
    applyCount: 234,
    tags: ['全职', '大专', '1-3年'],
    logo: '📈',
  },
  {
    id: 4,
    title: '产品经理',
    company: '智慧互联科技',
    location: '深圳市南山区',
    salary: '25-40K',
    category: '产品',
    publishTime: '2天前',
    applyCount: 187,
    tags: ['全职', '本科', '3-5年'],
    logo: '📱',
  },
  {
    id: 5,
    title: '前端开发工程师',
    company: '灵捷云科技有限公司',
    location: '北京市朝阳区',
    salary: '18-30K',
    category: '技术开发',
    publishTime: '3天前',
    applyCount: 145,
    tags: ['全职', '本科', '2-4年'],
    logo: '💻',
  },
])

// 搜索关键词
const searchKeyword = ref('')

// 筛选条件
const filters = ref({
  category: '全部',
  salary: '全部',
  experience: '全部',
})

// 分类列表
const categories = ref(['全部', '技术开发', '设计', '产品', '市场', '运营', '销售'])

// 薪资范围
const salaryRanges = ref(['全部', '5-10K', '10-15K', '15-20K', '20-30K', '30K以上'])

// 经验要求
const experienceRequirements = ref(['全部', '应届生', '1-3年', '3-5年', '5-10年', '10年以上'])

// 显示筛选面板
const showFilterPanel = ref(false)

// 过滤后的项目列表
const filteredProjects = ref(projects.value)

// 搜索功能
function handleSearch() {
  filterProjects()
}

// 筛选功能
function handleFilter() {
  filterProjects()
  showFilterPanel.value = false
}

// 重置筛选
function resetFilter() {
  filters.value = {
    category: '全部',
    salary: '全部',
    experience: '全部',
  }
  filterProjects()
  showFilterPanel.value = false
}

// 过滤项目
function filterProjects() {
  let result = projects.value

  // 关键词筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(project =>
      project.title.toLowerCase().includes(keyword)
      || project.company.toLowerCase().includes(keyword),
    )
  }

  // 分类筛选
  if (filters.value.category !== '全部') {
    result = result.filter(project => project.category === filters.value.category)
  }

  // 薪资筛选
  if (filters.value.salary !== '全部') {
    result = result.filter((project) => {
      const projectSalary = project.salary
      if (filters.value.salary === '5-10K') {
        return projectSalary.includes('5-10K')
      }
      else if (filters.value.salary === '10-15K') {
        return projectSalary.includes('10-15K')
      }
      else if (filters.value.salary === '15-20K') {
        return projectSalary.includes('15-20K')
      }
      else if (filters.value.salary === '20-30K') {
        return projectSalary.includes('20-30K')
      }
      else if (filters.value.salary === '30K以上') {
        return Number.parseInt(projectSalary.replace('K', '')) >= 30
      }
      return true
    })
  }

  // 经验筛选
  if (filters.value.experience !== '全部') {
    result = result.filter((project) => {
      if (filters.value.experience === '应届生') {
        return project.tags.some(tag => tag.includes('应届'))
      }
      else if (filters.value.experience === '1-3年') {
        return project.tags.some(tag => tag.includes('1-3年'))
      }
      else if (filters.value.experience === '3-5年') {
        return project.tags.some(tag => tag.includes('3-5年'))
      }
      else if (filters.value.experience === '5-10年') {
        return project.tags.some(tag => tag.includes('5-10年'))
      }
      else if (filters.value.experience === '10年以上') {
        return project.tags.some(tag => tag.includes('10年以上'))
      }
      return true
    })
  }

  filteredProjects.value = result
}

// 项目详情
function goToProjectDetail(projectId: number) {
  uni.navigateTo({
    url: `/pages/project-detail/project-detail?id=${projectId}`,
  })
}

// 页面加载时执行
onMounted(() => {
  filterProjects()
})
</script>

<template>
  <view class="project-square">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input-wrapper">
        <text class="search-icon">🔍</text>
        <input
          v-model="searchKeyword"
          class="search-input"
          placeholder="搜索项目名称或公司"
          @input="handleSearch"
        >
      </view>
      <view class="filter-btn" @click="showFilterPanel = true">
        <text class="filter-icon">⚙️</text>
        <text class="filter-text">筛选</text>
      </view>
    </view>

    <!-- 项目列表 -->
    <scroll-view class="project-list" scroll-y>
      <view v-for="project in filteredProjects" :key="project.id" class="project-item" @click="goToProjectDetail(project.id)">
        <view class="project-header">
          <view class="company-info">
            <text class="company-logo">{{ project.logo }}</text>
            <view class="company-details">
              <text class="company-name">{{ project.company }}</text>
              <text class="company-location">{{ project.location }}</text>
            </view>
          </view>
          <text class="publish-time">{{ project.publishTime }}</text>
        </view>

        <text class="project-title">{{ project.title }}</text>

        <view class="project-tags">
          <text v-for="(tag, index) in project.tags" :key="index" class="tag">{{ tag }}</text>
        </view>

        <view class="project-footer">
          <text class="project-salary">{{ project.salary }}</text>
          <text class="apply-count">{{ project.applyCount }}人已申请</text>
        </view>
      </view>
    </scroll-view>

    <!-- 筛选面板 -->
    <view v-if="showFilterPanel" class="filter-panel">
      <view class="filter-panel-header">
        <text class="filter-panel-title">筛选条件</text>
        <text class="close-btn" @click="showFilterPanel = false">✕</text>
      </view>

      <view class="filter-content">
        <!-- 分类筛选 -->
        <view class="filter-section">
          <text class="filter-section-title">项目分类</text>
          <view class="filter-options">
            <text
              v-for="category in categories"
              :key="category"
              class="filter-option"
              :class="{ active: filters.category === category }"
              @click="filters.category = category"
            >
              {{ category }}
            </text>
          </view>
        </view>

        <!-- 薪资筛选 -->
        <view class="filter-section">
          <text class="filter-section-title">薪资范围</text>
          <view class="filter-options">
            <text
              v-for="salary in salaryRanges"
              :key="salary"
              class="filter-option"
              :class="{ active: filters.salary === salary }"
              @click="filters.salary = salary"
            >
              {{ salary }}
            </text>
          </view>
        </view>

        <!-- 经验筛选 -->
        <view class="filter-section">
          <text class="filter-section-title">经验要求</text>
          <view class="filter-options">
            <text
              v-for="experience in experienceRequirements"
              :key="experience"
              class="filter-option"
              :class="{ active: filters.experience === experience }"
              @click="filters.experience = experience"
            >
              {{ experience }}
            </text>
          </view>
        </view>
      </view>

      <view class="filter-panel-footer">
        <view class="reset-btn" @click="resetFilter">
          重置
        </view>
        <view class="confirm-btn" @click="handleFilter">
          确定
        </view>
      </view>
    </view>

    <!-- 遮罩层 -->
    <view v-if="showFilterPanel" class="overlay" @click="showFilterPanel = false" />
  </view>
</template>

<style scoped>
.project-square {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 搜索栏 */
.search-bar {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: white;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 25rpx;
  padding: 15rpx 20rpx;
  margin-right: 20rpx;
}

.search-icon {
  font-size: 28rpx;
  color: #999;
  margin-right: 15rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
  background-color: transparent;
}

.filter-btn {
  display: flex;
  align-items: center;
  padding: 15rpx 25rpx;
  background-color: #155fe2;
  color: white;
  border-radius: 25rpx;
}

.filter-icon {
  font-size: 28rpx;
  margin-right: 8rpx;
}

.filter-text {
  font-size: 26rpx;
}

/* 项目列表 */
.project-list {
  padding: 20rpx;
  height: calc(100vh - 120rpx);
}

.project-item {
  background-color: white;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.company-info {
  display: flex;
  align-items: center;
}

.company-logo {
  font-size: 60rpx;
  margin-right: 20rpx;
}

.company-details {
  display: flex;
  flex-direction: column;
}

.company-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 5rpx;
}

.company-location {
  font-size: 24rpx;
  color: #666;
}

.publish-time {
  font-size: 22rpx;
  color: #999;
}

.project-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  line-height: 48rpx;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20rpx;
}

.tag {
  font-size: 22rpx;
  color: #155fe2;
  background-color: rgba(21, 95, 226, 0.1);
  padding: 8rpx 16rpx;
  border-radius: 12rpx;
  margin-right: 15rpx;
  margin-bottom: 10rpx;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-salary {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff6b6b;
}

.apply-count {
  font-size: 24rpx;
  color: #999;
}

/* 筛选面板 */
.filter-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 30rpx 30rpx 0 0;
  padding: 30rpx;
  box-shadow: 0 -10rpx 30rpx rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.filter-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.filter-panel-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.close-btn {
  font-size: 36rpx;
  color: #999;
}

.filter-content {
  max-height: 500rpx;
  overflow-y: auto;
}

.filter-section {
  margin-bottom: 40rpx;
}

.filter-section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
}

.filter-option {
  font-size: 26rpx;
  color: #666;
  background-color: #f5f5f5;
  padding: 15rpx 25rpx;
  border-radius: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}

.filter-option.active {
  color: #155fe2;
  background-color: rgba(21, 95, 226, 0.1);
}

.filter-panel-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 40rpx;
}

.reset-btn {
  flex: 1;
  text-align: center;
  padding: 20rpx;
  background-color: #f5f5f5;
  color: #666;
  border-radius: 20rpx;
  margin-right: 20rpx;
}

.confirm-btn {
  flex: 1;
  text-align: center;
  padding: 20rpx;
  background-color: #155fe2;
  color: white;
  border-radius: 20rpx;
}

/* 遮罩层 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
</style>
