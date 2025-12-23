<template>
  <TopNavigation
    id="top-navigation"
    title="灵捷云"
    subtitle="科技为基 合规为本 拥军为魂"
    background="linear-gradient(to bottom, #155FE2 0%, #ffffff 60%)"
  >
    <!-- 顶部搜索栏 -->
    <SearchBar
      :current-city="currentCity"
      @city-click="showCityPicker"
      @search-click="showSearch"
    />
    <view
      id="job-categories"
      class="job-categories"
      :class="{ 'job-categories--hidden': isJobCategoriesHidden }"
      :style="jobCategoriesVars"
    >
      <JobCategories
        @category-change="selectCategory"
        @filter-change="selectFilter"
      />
    </view>
  </TopNavigation>
  <view class="index-container">
    <wd-sticky
      id="tab-navigation"
      ref="tabNavigationRef"
      :offset-top="tabOffsetTop"
    />
    <view class="tab-container">
      <JobTabs
        :tab-items="jobTabItems"
        @tab-click="selectTab"
        @job-click="handleJobClick"
        @filter-click="handleFilterClick"
      />
    </view>

    <PullList
      ref="pullListRef"
      refresher-enabled
      :refreshing="refreshing"
      @scroll="handleListScroll"
      @refresh="handleRefresh"
      @refresherrestore="handleRestore"
    >
      <template v-if="loading">
        <JobItemSkeleton
          v-for="index in skeletonCount"
          :key="`job-skeleton-${index}`"
        />
      </template>
      <template v-else>
        <JobItem
          v-for="(job, index) in jobList"
          :key="index"
          :job="job"
          @click="navigateToDetail(job.id)"
        />
      </template>
    </PullList>
  </view>
</template>

<script setup lang="ts">
import type { Job, JobListResponse } from '@/types/job.d.ts'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import JobCategories from '@/components/common/JobCategories.vue'
import JobItem from '@/components/common/JobItem.vue'
import JobItemSkeleton from '@/components/common/JobItemSkeleton.vue'
import JobTabs from '@/components/common/JobTabs.vue'
import PullList from '@/components/common/PullList.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import TopNavigation from '@/components/common/TopNavigation.vue'
import request from '@/utils/request'

const refreshing = ref<boolean>(false)
const pullListRef = ref<InstanceType<typeof PullList> | null>(null)
const isJobCategoriesHidden = ref(false)
const jobCategoriesVars = computed(() => ({
  '--tab-offset': `${tabOffsetTop.value}rpx`,
}))
const CATEGORY_HIDE_THRESHOLD = 120
// 当前选择的城市
const currentCity = ref<string>('北京')

// tab-navigation 的引用
const tabNavigationRef = ref<any>(null)

// tab-navigation 的 offsetTop
const tabOffsetTop = ref<number>(0)

// 横向滚动列表的引用
const horizontalScrollListRef = ref<any>(null)

const jobTabItems = [
  { label: '推荐', value: 'recommend' },
  { label: '附近', value: 'nearby' },
  { label: '最新', value: 'latest' },
]

// 岗位列表数据
const jobList = ref<Job[]>([])
const loading = ref<boolean>(false)
const skeletonCount = 4
const refresherTriggered = ref<boolean>(false)

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
  console.log('选择了标签页:', jobTabItems[index]?.label || index)
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
  uni.navigateTo({ url: `/pages/project/detail?id=${jobId}` })
}

// 加载岗位列表
function loadJobs(): Promise<Job[]> {
  console.log('加载岗位列表')
  loading.value = true

  return new Promise<Job[]>((resolve, reject) => {
    request<JobListResponse>({
      url: '/api/v1/job/list',
      method: 'GET',
      data: {
        page: 1,
        pageSize: 10,
        keyword: '',
        category: 'all',
        sort: 'hot',
      },
    })
      .then((res) => {
        console.log('加载岗位列表成功:', res)
        // 检查响应数据是否存在
        if (res && res.list) {
          jobList.value = res.list
        }
        else {
          console.warn('岗位列表数据格式不正确:', res)
          jobList.value = [] // 设置为空数组避免渲染错误
        }
        resolve(jobList.value)
      })
      .catch((error) => {
        console.error('加载岗位列表失败:', error)
        uni.showToast({
          title: '加载失败，请重试',
          icon: 'none',
          duration: 2000,
        })
        jobList.value = [] // 设置为空数组避免渲染错误
        reject(error)
      })
      .finally(() => {
        loading.value = false
      })
  })
}

function handleRefresh(): void {
  console.log('下拉刷新')
  refreshing.value = true
  // 刷新岗位列表
  loadJobs().finally(() => {
    console.log('刷新完成')
    refresherTriggered.value = false
    // 刷新完成后，调用上拉恢复方法
    refreshing.value = false
  })
}

function handleRestore(): void {
  console.log('上拉恢复')
}

function handleListScroll(scrollTop: number): void {
  const shouldHide = scrollTop > CATEGORY_HIDE_THRESHOLD
  if (shouldHide === isJobCategoriesHidden.value) {
    return
  }
  isJobCategoriesHidden.value = shouldHide
}

onMounted(() => {
  // 页面加载时获取岗位列表

  loadJobs().finally(() => {
    console.log('加载岗位列表完成')
  })

  // 获取 top-navigation 的高度并设置到 tab-navigation 的 offset
  setTimeout(() => {
    // 获取 top-navigation 元素和岗位分类高度
    const query = uni.createSelectorQuery()
    query
      .select('#top-navigation')
      .boundingClientRect((ret: UniApp.NodeInfo) => {
        if (ret) {
          console.log('top-navigation 高度:', ret.height)
          console.log('tabOffsetTop', tabOffsetTop.value)
          tabOffsetTop.value = ret.height
        }
      })
    query.exec()
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
  height: calc(100vh - 150rpx);
}

/* 岗位列表 */
.job-list {
  padding: 0 30rpx 20rpx;
}

.tab-container {
  width: 100vw;
}

.job-categories {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    margin-bottom 0.3s ease;
}

.job-categories--hidden {
  transform: translateY(-20rpx);
  opacity: 0;
  margin-bottom: calc(-1 * var(--tab-offset, 0rpx));
}
</style>
