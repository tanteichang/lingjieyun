<template>
  <Sticky>
    <TopNavigation
      id="top-navigation"
      title="灵捷云"
      subtitle="科技为基 合规为本 拥军为魂"
      background="linear-gradient(to bottom, #155FE2 0%, #ffffff 100%)"
    >
      <!-- 顶部搜索栏 -->
      <SearchBar
        :current-city="currentCity"
        @city-click="showCityPicker"
        @search-click="showSearch"
      />
    </TopNavigation>
  </Sticky>
  <view class="index-container">
    <list-view style="padding-top: 200rpx" rebound="false" show-scrollbar="false">
      <JobCategories
        @category-change="selectCategory"
        @filter-change="selectFilter"
      />

      <Sticky
        id="tab-navigation"
        ref="tabNavigationRef"
        :offset-top="tabOffsetTop"
      >
        <JobTabs @tab-click="selectTab" @job-click="handleJobClick" @filter-click="handleFilterClick" />
      </Sticky>
      <JobItem
        v-for="(job, index) in jobList"
        :key="index"
        :job="job"
        @click="navigateToDetail(job.id)"
      />
    </list-view>
  </view>
</template>

<script setup lang="ts">
import type { Job, JobListResponse } from '@/types/job.d.ts'
import { onMounted, onUnmounted, ref } from 'vue'
import JobItem from '@/components/common/JobItem.vue'
import TopNavigation from '@/components/common/TopNavigation.vue'
import Sticky from '@/components/uview/Sticky.vue'
import JobCategories from '@/pages/index/JobCategories.vue'
import request from '@/utils/request'
import JobTabs from './JobTabs.vue'
import SearchBar from './SearchBar.vue'

// 当前选择的城市
const currentCity = ref<string>('北京')

// tab-navigation 的引用
const tabNavigationRef = ref<any>(null)

// tab-navigation 的 offsetTop
const tabOffsetTop = ref<number>(0)

// 横向滚动列表的引用
const horizontalScrollListRef = ref<any>(null)

// 岗位列表数据
const jobList = ref<Job[]>([])
const loading = ref<boolean>(false)

// 显示城市选择器
function showCityPicker(): void {
  console.log('显示城市选择器')
}

// 显示搜索
function showSearch(): void {
  console.log('显示搜索页面')
}

// 选择分类
function selectCategory(index: number): void {
  console.log('选择了分类索引:', index)
}

// 选择标签页
function selectTab(index: number): void {
  console.log('选择了标签页:', ['推荐', '附近', '最新'][index])
  // 这里可以添加根据标签页筛选岗位列表的逻辑
}

// 处理职位点击
function handleJobClick(): void {
  console.log('点击了职位按钮')
  // 这里可以添加职位相关的逻辑
}

// 处理筛选点击
function handleFilterClick(): void {
  console.log('点击了筛选按钮')
  // 这里可以添加筛选相关的逻辑
}

// 选择筛选
function selectFilter(filterType: string): void {
  console.log('选择了筛选:', filterType)
}

// 跳转到岗位详情
function navigateToDetail(jobId: string): void {
  uni.navigateTo({ url: `/pages/job/detail?id=${jobId}` })
}

// 加载岗位列表
async function loadJobs(): Promise<void> {
  try {
    loading.value = true

    // 调用mock API获取岗位列表
    const res = await request<JobListResponse>({
      url: '/api/job/list',
      method: 'GET',
      data: {
        page: 1,
        pageSize: 10,
        keyword: '',
        category: 'all',
        sort: 'hot',
      },
    })

    // 检查响应数据是否存在
    if (res && res.list) {
      jobList.value = res.list
    }
    else {
      console.warn('岗位列表数据格式不正确:', res)
      jobList.value = [] // 设置为空数组避免渲染错误
    }
  }
  catch (error) {
    console.error('加载岗位列表失败:', error)
    uni.showToast({
      title: '加载失败，请重试',
      icon: 'none',
      duration: 2000,
    })
    jobList.value = [] // 设置为空数组避免渲染错误
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  // 页面加载时获取岗位列表
  loadJobs()

  // 获取 top-navigation 的高度并设置到 tab-navigation 的 offset
  setTimeout(() => {
    // 获取 top-navigation 元素的位置信息
    uni
      .createSelectorQuery()
      .select('#top-navigation')
      .boundingClientRect((ret: UniApp.NodeInfo) => {
        if (ret) {
          tabOffsetTop.value = ret.height
        }
      })
      .exec()
  }, 0)
})

onUnmounted(() => {
  // 清理滚动监听
})
</script>

<style scoped>
/* 页面容器 */
.index-container {
  background-color: #f5f5f5;
}

/* 岗位列表 */
.job-list {
  padding: 0 30rpx 20rpx;
}
</style>
