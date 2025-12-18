<template>
  <fixedLayout>
    <template #header>
      <TopNavbar title="项目详情" @click-left="goBack" />
    </template>

    <scroll-view class="content" scroll-y>
      <view class="job-card">
        <view class="job-title-row">
          <text class="job-title">{{ detail.title }}</text>
          <view class="badge">
            保
          </view>
        </view>
        <text class="salary">{{ detail.salary }}</text>
        <view class="job-meta">
          <view class="meta-item">
            <wd-icon name="location" size="24rpx" />
            <text>{{ detail.city }}</text>
          </view>
          <view class="meta-item">
            <wd-icon name="list" size="24rpx" />
            <text>{{ detail.experience }}</text>
          </view>
          <view class="meta-item">
            <wd-icon name="list" size="24rpx" />
            <text>{{ detail.education }}</text>
          </view>
        </view>
      </view>

      <view class="section">
        <view class="section-header">
          <view class="indicator" />
          <text>职位详情</text>
        </view>

        <view class="tag-list">
          <Tag v-for="tag in detail.tags" :key="tag" :text="tag" />
        </view>

        <view class="duty-title">
          【岗位职责】
        </view>
        <view class="duty-list">
          <view v-for="(duty, index) in detail.duties" :key="index" class="duty-item">
            {{ index + 1 }}.{{ duty }}
          </view>
        </view>
      </view>

      <view class="section">
        <view class="section-header">
          <view class="indicator" />
          <text>发布机构</text>
        </view>
        <view class="agency-card" @click="handleAgencyClick">
          <image class="agency-logo" :src="detail.agency.logo" mode="aspectFit" />
          <view class="agency-info">
            <view class="agency-name">
              {{ detail.agency.name }}
            </view>
            <text class="agency-sub">
              {{ detail.agency.openings }}
            </text>
          </view>
          <text class="arrow">›</text>
        </view>

        <view class="map-card">
          <map
            class="map-view"
            :latitude="detail.agency.location.latitude"
            :longitude="detail.agency.location.longitude"
            :scale="16"
            :markers="mapMarkers"
            :enable-scroll="true"
            :enable-zoom="true"
            @tap="handleOpenMap"
          />
          <view class="map-footer">
            <text class="map-address">{{ detail.agency.address }}</text>
            <view class="map-action" @click.stop="handleChooseMap">
              选择地图
            </view>
          </view>
        </view>
      </view>

      <view class="section safety">
        <view class="section-header">
          <view class="indicator" />
          <text>灵捷云平台安全保障</text>
        </view>
        <view class="safety-content">
          <text v-for="(line, index) in detail.securityTips" :key="index" class="safety-text">
            {{ line }}
          </text>
        </view>
        <view class="safety-link" @click="handleViewTips">
          了解更多安全防范知识
        </view>
      </view>
    </scroll-view>

    <template #footer>
      <view class="bottom-bar">
        <view class="bar-action" @click="handleShare">
          <wd-icon name="jump" size="22px" />
          <text class="bar-text">分享</text>
        </view>
        <view class="bar-action" @click="toggleCollect">
          <wd-icon :name="collected ? 'star-filled' : 'star'" size="22px" />
          <text class="bar-text">{{ collected ? '已收藏' : '收藏' }}</text>
        </view>
        <view class="apply-btn" @click="handleApply">
          我要报名
        </view>
      </view>
    </template>
  </fixedLayout>
</template>

<script lang="ts" setup>
import Tag from '@/components/common/Tag.vue'
import fixedLayout from '@/layouts/fixed-layout.vue'

definePage({
  navigationStyle: 'custom',
})

type MapAppType = 'system' | 'amap' | 'baidu' | 'tencent' | 'apple'

interface MapAppOption {
  name: string
  type: MapAppType
  platforms?: Array<'ios' | 'android'>
}

declare const plus: any

const detail = {
  title: '财务会计',
  salary: '3500-5500元',
  city: '广州·番禺',
  experience: '经验不限',
  education: '学历不限',
  tags: ['月结', '核算会计', '成本会计'],
  duties: [
    '负责公司日常会计核算，确保财务数据的准确性和及时性。',
    '制作月度、季度及年度财务报表，进行财务分析，为管理层提供决策支持。',
    '管理公司的税务申报工作，确保按时完成各类税务申报，并享受合法节税途径。',
    '协助制定和执行财务预算，监督预算执行情况，提出成本控制建议。',
    '处理税务申报工作，确保按时、合规完成各项税务义务。',
    '参与财务流程的优化，提高财务工作的效率和质量。',
    '负责供应链账务核对。',
    '处理其他财务相关事务，如银行对账、固定资产管理等。',
  ],
  agency: {
    name: '广州新际网络科技有限公司',
    openings: '5个岗位在招',
    logo: '/static/me/avatar_man.png',
    address: '四海城商业广场',
    location: {
      latitude: 23.02067,
      longitude: 113.75179,
    },
  },
  securityTips: [
    '灵捷云严禁用人单位和招聘者用任何损害求职者合法权益的违法违规行为，包括但不限于扣押求职者证件、收取求职者财物、向求职者集资、让求职者入股、诱导求职者异地入职、异地参加培训、违反违规使用求职者简历等。',
    '一旦您发现此类行为，请立即向灵捷云举报或致电 举报热线。',
    '了解更多安全防范知识',
  ],
}

const devicePlatform = uni.getSystemInfoSync().platform

const mapAppBaseOptions: MapAppOption[] = [
  { name: '系统地图', type: 'system' },
  { name: '高德地图', type: 'amap', platforms: ['ios', 'android'] },
  { name: '百度地图', type: 'baidu', platforms: ['ios', 'android'] },
  { name: '腾讯地图', type: 'tencent', platforms: ['ios', 'android'] },
  { name: '苹果地图', type: 'apple', platforms: ['ios'] },
]

const collected = ref(false)

const metaList = computed(() => [detail.city, detail.experience, detail.education])

const mapMarkers = computed(() => [
  {
    id: 1,
    latitude: detail.agency.location.latitude,
    longitude: detail.agency.location.longitude,
    iconPath: '/static/login/project.png',
    width: 32,
    height: 32,
    callout: {
      content: detail.agency.name,
      color: '#ffffff',
      fontSize: 12,
      borderRadius: 12,
      padding: 6,
      display: 'ALWAYS',
      bgColor: '#155fe2',
    },
  },
])

const mapAppOptions = computed(() =>
  mapAppBaseOptions.filter((item) => {
    if (!item.platforms)
      return true
    return item.platforms.includes(devicePlatform as 'ios' | 'android')
  }),
)

function goBack() {
  uni.navigateBack()
}

function handleApply() {
  uni.showToast({
    title: '报名成功',
    icon: 'success',
  })
}

function handleShare() {
  uni.showToast({
    title: '分享功能开发中',
    icon: 'none',
  })
}

function toggleCollect() {
  collected.value = !collected.value
  uni.showToast({
    title: collected.value ? '收藏成功' : '已取消收藏',
    icon: 'none',
  })
}

function handleViewTips() {
  uni.showToast({
    title: '跳转安全提示',
    icon: 'none',
  })
}

function handleAgencyClick() {
  uni.navigateTo({
    url: '/pages/project/company',
  })
}

function handleOpenMap() {
  const { latitude, longitude } = detail.agency.location
  uni.openLocation({
    latitude,
    longitude,
    name: detail.agency.name,
    address: detail.agency.address,
    fail: () => {
      uni.showToast({
        title: '暂不支持打开地图',
        icon: 'none',
      })
    },
  })
}

function handleChooseMap() {
  const options = mapAppOptions.value
  if (!options.length) {
    uni.showToast({
      title: '暂无可用地图',
      icon: 'none',
    })
    return
  }

  if (options.length === 1) {
    openExternalMap(options[0].type)
    return
  }

  uni.showActionSheet({
    itemList: options.map(item => item.name),
    success: (res) => {
      const target = options[res.tapIndex]
      if (!target)
        return
      openExternalMap(target.type)
    },
  })
}

function openExternalMap(type: MapAppType) {
  if (type === 'system') {
    handleOpenMap()
    return
  }
  const { latitude, longitude } = detail.agency.location
  const url = buildMapUrl(type, latitude, longitude, detail.agency.name, detail.agency.address)
  if (!url) {
    uni.showToast({
      title: '暂未适配该地图',
      icon: 'none',
    })
    return
  }
  // #ifdef APP-PLUS
  plus.runtime.openURL(url, (error: any) => {
    console.error(error)
    uni.showToast({
      title: '打开失败，请尝试其他地图',
      icon: 'none',
    })
  })
  // #endif
  // #ifndef APP-PLUS
  uni.showToast({
    title: '请在 App 端使用第三方地图',
    icon: 'none',
  })
  // #endif
}

function buildMapUrl(
  type: MapAppType,
  latitude: number,
  longitude: number,
  name: string,
  address: string,
) {
  const encodedName = encodeURIComponent(name)
  const encodedAddress = encodeURIComponent(address)
  switch (type) {
    case 'amap':
      return `amapuri://route/plan/?dlat=${latitude}&dlon=${longitude}&dname=${encodedName}&dev=0&t=0`
    case 'baidu':
      return `baidumap://map/direction?destination=name:${encodedName}|latlng:${latitude},${longitude}&mode=driving&src=uniapp`
    case 'tencent':
      return `qqmap://map/routeplan?type=drive&tocoord=${latitude},${longitude}&to=${encodedName}&referer=uniapp`
    case 'apple':
      return `http://maps.apple.com/?q=${encodedName}&address=${encodedAddress}&daddr=${latitude},${longitude}`
    default:
      return ''
  }
}
</script>

<style scoped>
.content {
  flex: 1;
  padding-top: 20rpx;
}

.job-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.03);
}

.job-card,
.section {
  margin-left: 14rpx;
  margin-right: 14rpx;
}

.job-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 36rpx;
}

.job-title {
  font-weight: 800;
  font-size: 40rpx;
  color: #121212;
}

.badge {
  padding: 4rpx 18rpx;
  border-radius: 999rpx;
  background: #e6f0ff;
  color: #4a7aff;
  font-size: 22rpx;
}

.salary {
  font-weight: 800;
  font-size: 30rpx;
  color: #155fe2;
  margin-bottom: 36rpx;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 22rpx;
  margin-top: 18rpx;
  font-size: 24rpx;
  color: #7d818d;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-weight: 500;
  font-size: 24rpx;
  color: #333333;
}

.dot {
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background: #cbd0da;
}

.section {
  background: #fff;
  border-radius: 16rpx;
  padding: 50rpx 0 50rpx 0;
  margin-bottom: 24rpx;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  font-size: 30rpx;
  font-weight: 600;
  color: #1c1d21;
  margin-bottom: 46rpx;
}

.indicator {
  width: 6rpx;
  height: 26rpx;
  border-radius: 3rpx;
  background: #155fe2;
  margin-right: 28rpx;
}

.tag-list {
  display: flex;
  gap: 12rpx;
  flex-wrap: wrap;
  margin-bottom: 46rpx;
  margin-left: 34rpx;
}

.duty-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
  margin-left: 34rpx;
}

.duty-list {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 28rpx;
  color: #66676b;
  line-height: 48rpx;
  margin-left: 34rpx;
  margin-right: 34rpx;
}

.agency-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx 0;
  margin-left: 34rpx;
  margin-right: 34rpx;
  margin-bottom: 34rpx;
}

.agency-logo {
  width: 118rpx;
  height: 118rpx;
}

.agency-info {
  flex: 1;
}

.agency-name {
  font-weight: bold;
  font-size: 28rpx;
  color: #333333;
}

.agency-sub {
  font-weight: 500;
  font-size: 24rpx;
  color: #999999;
}

.arrow {
  font-size: 32rpx;
  color: #c3c7d4;
}

.map-card {
  overflow: hidden;
  margin: 0 34rpx;
}

.map-view {
  width: 100%;
  height: 260rpx;
  background: #eef1f7;
  margin-bottom: 34rpx;
}

.map-footer {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 24rpx;
  color: #333333;
}

.map-address {
  flex: 1;
  font-size: 24rpx;
  color: #5b5f6b;
}

.map-action {
  padding: 12rpx 28rpx;
  border-radius: 999rpx;
  background: #155fe2;
  color: #ffffff;
  font-size: 24rpx;
}

.safety {
  padding-bottom: 24rpx;
}

.safety-content {
  font-weight: 500;
  font-size: 28rpx;
  color: #66676b;
  line-height: 48rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin: 0 36rpx;
}

.safety-link {
  margin-left: 36rpx;
  color: #2f57f6;
  font-size: 28rpx;
  margin-top: 40rpx;
}

.bottom-bar {
  display: flex;
  align-items: center;
  padding: 0 36rpx;
  padding-top: 30rpx;
}

.bar-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70rpx;
  color: #666;
  font-size: 22rpx;
}

.bar-icon {
  font-size: 32rpx;
}

.bar-text {
  font-size: 20rpx;
  color: #333333;
}

.apply-btn {
  flex: 1;
  margin-left: 30rpx;
  height: 88rpx;
  border-radius: 16rpx;
  background: #155fe2;
  font-weight: bold;
  font-size: 28rpx;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
