<template>
  <view class="city-page">
    <view class="nav-wrapper">
      <TopNavbar title="选择城市" @click-left="goBack" />
    </view>

    <view class="picker-wrapper">
      <view class="content">
        <scroll-view scroll-y class="province-list">
          <view
            v-for="province in provinces"
            :key="province.name"
            class="province-item"
            :class="{ active: province.name === selectedProvince }"
            @click="selectProvince(province.name)"
          >
            {{ province.name }}
          </view>
        </scroll-view>

        <scroll-view scroll-y class="city-list">
          <view
            v-for="city in currentCities"
            :key="city"
            class="city-item"
            :class="{ active: city === selectedCity }"
            @click="selectCity(city)"
          >
            {{ city }}
          </view>
        </scroll-view>
      </view>
    </view>

    <view class="footer">
      <button class="confirm-btn" @click="handleConfirm">
        确认
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TopNavbar from '@/components/common/TopNavbar.vue'
import { provinces } from '@/static/common/provinces'

definePage({
  navigationStyle: 'custom',
})

const CITY_STORAGE_KEY = 'resumeCity'

const storedCity = uni.getStorageSync(CITY_STORAGE_KEY)
const defaultProvince = storedCity?.province || provinces[1].name
const defaultCity = storedCity?.city || provinces[1].cities[0]

const selectedProvince = ref(defaultProvince)
const selectedCity = ref(defaultCity)

const currentCities = computed(() => {
  return provinces.find(item => item.name === selectedProvince.value)?.cities || []
})

function selectProvince(name: string) {
  selectedProvince.value = name
  selectedCity.value = currentCities.value[0]
}

function selectCity(city: string) {
  selectedCity.value = city
}

function handleConfirm() {
  uni.setStorageSync(CITY_STORAGE_KEY, {
    province: selectedProvince.value,
    city: selectedCity.value,
  })
  uni.showToast({
    title: '选择成功',
    icon: 'success',
  })
  setTimeout(() => goBack(), 400)
}

function goBack() {
  uni.navigateBack()
}
</script>

<style scoped>
.city-page {
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.nav-wrapper {
  position: sticky;
  top: 0;
  z-index: 20;
  background: #fff;
}

.picker-wrapper {
  flex: 1;
  padding-bottom: 200rpx;
  box-sizing: border-box;
  overflow: hidden;
}

.content {
  display: flex;
  height: 99%;
}

.province-list {
  width: 40%;
  background: #f5f7fa;
}

.city-list {
  flex: 1;
  background: #fff;
}

.province-item,
.city-item {
  padding: 28rpx 36rpx;
  font-size: 28rpx;
  color: #303133;
}

.province-item.active {
  color: #537bff;
  font-weight: bold;
  font-size: 28rpx;
  color: #537bff;
  background: #fff;
}

.city-item.active {
  color: #537bff;
  background: #edf1ff;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0rpx 32rpx env(safe-area-inset-bottom);
  background: #fff;
  box-shadow: 0 -12rpx 32rpx rgba(0, 0, 0, 0.04);
  z-index: 100;
}

.confirm-btn {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  border-radius: 30rpx;
  border: none;
  background: linear-gradient(90deg, #5a7cff, #5070ff);
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
}
</style>
