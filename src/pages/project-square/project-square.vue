<template>
  <TopNavigation title="项目广场">
    <!-- 顶部搜索栏 -->
    <SearchBar
      :current-city="currentCity"
      @city-click="showCityPicker"
      @search-click="showSearch"
    />
    <!-- 岗位分类标签页 -->
    <view style="margin-top: 10rpx;">
      <JobTabs :tab-items="jobTabItems" />
    </view>
  </TopNavigation>
  <view class="square-content">
    <PullList
      ref="pullListRef"
      :refreshing="refreshing"
      :has-more="hasMore"
      @refresh="handleRefresh"
      @load-more="handleLoadMore"
    >
      <view v-if="loading" class="skeleton-container">
        <JobItemSkeleton v-for="index in 6" :key="index" />
      </view>
      <view v-else class="job-list">
        <JobItem
          v-for="job in jobList"
          :key="job.id"
          :job="job"
          @click="navigateToDetail(job.id)"
        />
        <view v-if="!jobList.length && !loading" class="empty-state">
          暂无项目，稍后再来看看吧～
        </view>
      </view>
    </PullList>
  </view>
</template>

<script setup lang="ts">
import type { Job, JobListResponse } from '@/types/job.d.ts'
import { onMounted, ref } from 'vue'
import JobItem from '@/components/common/JobItem.vue'
import JobItemSkeleton from '@/components/common/JobItemSkeleton.vue'
import JobTabs from '@/components/common/JobTabs.vue'
import PullList from '@/components/common/PullList.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import TopNavigation from '@/components/common/TopNavigation.vue'
import request from '@/utils/request'

const currentCity = ref<string>('北京')
const loading = ref<boolean>(false)
const jobList = ref<Job[]>([])
const hasMore = ref<boolean>(true)
const pullListRef = ref<InstanceType<typeof PullList> | null>(null)
const isFetching = ref(false)
const isLoadingMore = ref(false)
const page = ref(1)
const pageSize = 10
const refreshing = ref<boolean>(false)

// 显示城市选择器
function showCityPicker(): void {
  console.log('显示城市选择器')
}

// 显示搜索
function showSearch(): void {
  console.log('显示搜索页面')
}

const jobTabItems = [
  { label: '综合', value: 'recommend' },
  { label: '附近', value: 'nearby' },
  { label: '最新', value: 'latest' },
]

async function fetchJobList(reset = false): Promise<void> {
  if (reset) {
    page.value = 1
    hasMore.value = true
  }

  const targetPage = page.value

  const res = await request<JobListResponse>({
    url: '/api/v1/job/list',
    method: 'GET',
    data: {
      page: targetPage,
      pageSize,
      keyword: '',
      category: 'all',
      sort: 'hot',
    },
  })

  const list = res?.list || []
  if (reset) {
    jobList.value = list
  }
  else {
    jobList.value = [...jobList.value, ...list]
  }

  const total = res?.total ?? jobList.value.length
  const reachedEnd = list.length < pageSize || targetPage * pageSize >= total
  hasMore.value = !reachedEnd
  page.value = targetPage + 1
}

async function handleRefresh(): Promise<void> {
  console.log('刷新岗位列表', isFetching.value)
  if (isFetching.value) {
    return
  }
  isFetching.value = true
  try {
    refreshing.value = true
    await fetchJobList(true)
  }
  catch (error) {
    console.error('刷新失败:', error)
    uni.showToast({
      title: '刷新失败，请稍后重试',
      icon: 'none',
    })
  }
  finally {
    console.log('刷新岗位列表完成11')
    isFetching.value = false
    refreshing.value = false
  }
}

async function handleLoadMore(): Promise<void> {
  if (isFetching.value || isLoadingMore.value || loading.value || !hasMore.value) {
    pullListRef.value?.finishLoadMore()
    return
  }

  isFetching.value = true
  isLoadingMore.value = true
  try {
    await fetchJobList()
  }
  catch (error) {
    console.error('加载更多失败:', error)
    uni.showToast({
      title: '加载更多失败',
      icon: 'none',
    })
  }
  finally {
    isFetching.value = false
    isLoadingMore.value = false
    pullListRef.value?.finishLoadMore()
  }
}

// 跳转到岗位详情
function navigateToDetail(jobId: string): void {
  uni.navigateTo({ url: `/pages/project/detail?id=${jobId}` })
}

onMounted(() => {
  loading.value = true
  isFetching.value = true
  fetchJobList(true)
    .catch((error) => {
      console.error('加载岗位列表失败:', error)
      uni.showToast({
        title: '加载失败，请重试',
        icon: 'none',
      })
    })
    .finally(() => {
      loading.value = false
      isFetching.value = false
    })
})
</script>

<style scoped lang="scss">
.square-content {
  height: calc(100vh - 400rpx);
  background-color: #f5f5f5;
}

.skeleton-container,
.job-list {
  width: 100%;
  padding: 0 16rpx;
  box-sizing: border-box;
}

.skeleton-container :deep(.job-item-skeleton) {
  margin: 0 0 24rpx 0;
}

.job-list :deep(.job-item) {
  margin: 0 0 24rpx;
  width: 100%;
  box-sizing: border-box;
}

.empty-state {
  text-align: center;
  padding: 80rpx 0;
  color: #9aa0b1;
  font-size: 26rpx;
}
</style>
