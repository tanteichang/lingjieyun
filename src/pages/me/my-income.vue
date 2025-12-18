<template>
  <view class="income-page">
    <TopNavbar title="我的收益" @click-left="goBack" />
    <view class="page-content">
      <view class="summary-card">
        <view class="summary-header">
          <text class="summary-title">项目总收益</text>
        </view>
        <view class="summary-amount">
          ￥ 8,888.00
        </view>
        <view class="divider" />
        <view class="summary-detail">
          <view class="detail-item">
            <text class="detail-label">待结算金额 ({{ pendingCount }})</text>
            <text class="detail-value">￥ 2600</text>
          </view>
          <view class="detail-divider" />
          <view class="detail-item">
            <text class="detail-label">已结算</text>
            <text class="detail-value">￥ 6400</text>
          </view>
        </view>
      </view>
      <view class="summary-rule">
        <view class="rule-link" @click="openRule">
          <image
            class="info-icon"
            src="@/static/common/info.png"
            mode="scaleToFill"
          />
          <text>收益规则</text>
        </view>
      </view>
      <view class="content-card">
        <view class="tabs">
          <view
            v-for="tab in tabs"
            :key="tab.key"
            class="tab-item"
            :class="{ active: tab.key === currentTab }"
            @click="switchTab(tab.key)"
          >
            {{ tab.label }}
          </view>
        </view>

        <view class="period-selector" @click="openPeriodSelector">
          <text class="period-label">{{ currentSummary.period }}</text>
          <view class="selector-arrow" />
        </view>

        <view class="monthly-stats">
          <view class="stats-item">
            <text class="stats-label">收益(元)</text>
            <text
              class="stats-amount"
              :class="{ positive: currentTab === 'settled', warning: currentTab === 'pending' }"
            >
              {{ currentSummary.amount }}
            </text>
          </view>
          <view class="stats-item">
            <text class="stats-label">笔数(个)</text>
            <text class="stats-count">{{ currentSummary.count }}</text>
          </view>
        </view>

        <view class="record-list">
          <view
            v-for="record in currentRecords"
            :key="record.id"
            class="record-item"
            @click="handleRecord(record)"
          >
            <view class="record-left">
              <view class="record-icon" :style="{ backgroundColor: record.color }">
                <image src="@/static/me/income.png" mode="aspectFit" />
              </view>
              <view class="record-info">
                <text class="record-title">{{ record.title }}</text>
                <text class="record-time">{{ record.time }}</text>
              </view>
            </view>
            <text
              class="record-amount"
              :class="{ positive: record.type === 'settled', warning: record.type === 'pending' }"
            >
              +{{ record.amount }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TopNavbar from '@/components/common/TopNavbar.vue'

definePage({
  navigationStyle: 'custom',
})

type TabKey = 'settled' | 'pending'

interface IncomeRecord {
  id: number
  title: string
  time: string
  amount: string
  color: string
  type: TabKey
}

const statusBarHeight = ref('32px')

const tabs: Array<{ key: TabKey, label: string }> = [
  { key: 'settled', label: '已结算' },
  { key: 'pending', label: '待结算' },
]

const summaryMap: Record<TabKey, { period: string, amount: string, count: number }> = {
  settled: { period: '本月 (11月1日~11月28日)', amount: '1600.00', count: 2 },
  pending: { period: '本月 (11月1日~11月28日)', amount: '2600.00', count: 2 },
}

const recordMap: Record<TabKey, IncomeRecord[]> = {
  settled: [
    {
      id: 1,
      title: '高级建筑木工',
      time: '2025年11月28日 15:30',
      amount: ' 800',
      color: '#e3ebff',
      type: 'settled',
    },
    {
      id: 2,
      title: '财务会计',
      time: '2025年11月15日 16:38',
      amount: '800',
      color: '#e3ebff',
      type: 'settled',
    },
  ],
  pending: [
    {
      id: 3,
      title: '项目管理',
      time: '2025年11月25日 14:10',
      amount: '1300',
      color: '#f3edff',
      type: 'pending',
    },
    {
      id: 4,
      title: '工程预算',
      time: '2025年11月20日 10:05',
      amount: '1300',
      color: '#f3edff',
      type: 'pending',
    },
  ],
}

const currentTab = ref<TabKey>('settled')

const pendingCount = computed(() => recordMap.pending.length)

const currentSummary = computed(() => summaryMap[currentTab.value])

const currentRecords = computed(() => recordMap[currentTab.value])

onMounted(() => {
  const info = uni.getSystemInfoSync()
  if (info?.statusBarHeight) {
    statusBarHeight.value = `${info.statusBarHeight}px`
  }
})

function goBack() {
  console.log('goBack')
  uni.navigateBack()
}

function switchTab(tab: TabKey) {
  currentTab.value = tab
}

function openRule() {
  uni.showToast({
    title: '收益规则开发中',
    icon: 'none',
  })
}

function openPeriodSelector() {
  uni.showToast({
    title: '时间筛选开发中',
    icon: 'none',
  })
}

function handleRecord(record: IncomeRecord) {
  uni.showToast({
    title: `${record.title} ${record.amount}`,
    icon: 'none',
  })
}
</script>

<style scoped>
.income-page {
  background-color: #f2f4f8;
  box-sizing: border-box;
}

.page-content {
  padding: 0 20rpx;
}

.summary-card {
  background: linear-gradient(90deg, #6c91fe, #4965f8);
  border-radius: 32rpx;
  margin-top: 38rpx;
  padding: 40rpx 36rpx;
  color: #ffffff;
  position: relative;
  z-index: 1;
}

.summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.summary-title {
  font-size: 28rpx;
}

.divider {
  height: 1rpx;
  width: 100%;
  background: #efefef;
  opacity: 0.1;
  margin: 50rpx 0 30rpx 0;
}

.summary-rule {
  background: #eff2ff;
  box-shadow: 0rpx 6rpx 46rpx 0rpx rgba(0, 14, 85, 0.2);
  border-radius: 32rpx;
  position: relative;
  height: 140rpx;
  bottom: 60rpx;
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.rule-link {
  font-weight: 500;
  font-size: 24rpx;
  color: #4a67f8;
  line-height: 30rpx;
  height: 30rpx;
  display: flex;
  margin-bottom: 22rpx;
  margin-left: 36rpx;
}

.info-icon {
  width: 30rpx;
  height: 30rpx;
  margin-right: 12rpx;
}

.summary-amount {
  font-weight: 800;
  font-size: 52rpx;
  line-height: 68rpx;
}

.summary-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.detail-label {
  font-size: 24rpx;
  opacity: 0.6;
}

.detail-value {
  font-size: 32rpx;
  font-weight: 500;
}

.content-card {
  background-color: #ffffff;
  border-radius: 28rpx;
  padding: 0 28rpx 24rpx;
  box-shadow: 0 12rpx 30rpx rgba(55, 84, 170, 0.08);
}

.tabs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 32rpx 0 20rpx;
  border-bottom: 1rpx solid #efefef;
}

.tab-item {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  position: relative;
  padding-bottom: 14rpx;
}

.tab-item.active {
  color: #155fe2;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 48rpx;
  height: 6rpx;
  border-radius: 3rpx;
  background: #155fe2;
}

.period-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 0;
  font-size: 26rpx;
  color: #4a5160;
}

.selector-arrow {
  width: 14rpx;
  height: 14rpx;
  border-right: 3rpx solid #a5a8b4;
  border-bottom: 3rpx solid #a5a8b4;
  transform: rotate(45deg);
  margin-left: 12rpx;
}

.monthly-stats {
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fd;
  border-radius: 18rpx;
  padding: 28rpx 36rpx;
  margin-bottom: 20rpx;
}

.stats-item {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.stats-label {
  font-size: 24rpx;
  color: #7a7f8f;
}

.stats-amount {
  font-size: 42rpx;
  font-weight: 600;
}

.stats-count {
  font-size: 42rpx;
  font-weight: 600;
  color: #1b1b1f;
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.record-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 6rpx;
  border-bottom: 1rpx solid #f0f0f5;
}

.record-item:last-child {
  border-bottom: none;
}

.record-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.record-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.record-icon image {
  width: 50rpx;
  height: 50rpx;
}

.record-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.record-title {
  font-size: 30rpx;
  color: #1b1b1f;
  font-weight: 500;
}

.record-time {
  font-size: 24rpx;
  color: #9196a5;
}

.record-amount {
  font-size: 32rpx;
  font-weight: 600;
}

.positive {
  color: #5e7bff;
}

.warning {
  color: #ff6f61;
}
</style>
