<template>
  <view class="page-wrapper">
    <fix-button-layout>
      <TopNavbar title="" @click-left="goBack" />

      <view class="page-header">
        <text class="page-title">添加项目期望</text>
        <text class="page-subtitle">完善期望获得接项目机会，也让企业发现你</text>
      </view>

      <view class="form-section">
        <view class="form-item" @click="pickRole">
          <view class="form-label">
            <text class="required">*</text>
            <text>项目职位</text>
          </view>
          <view class="form-value">
            <text :class="{ placeholder: form.role === '' }">
              {{ form.role || '请选择项目职位类型' }}
            </text>
            <text class="arrow">›</text>
          </view>
        </view>

        <view class="form-item" @click="pickSalary">
          <view class="form-label">
            <text>薪资要求</text>
          </view>
          <view class="form-value">
            <text :class="{ placeholder: !form.salary }">
              {{ form.salary || '请选择薪资要求' }}
            </text>
            <text class="arrow">›</text>
          </view>
        </view>
      </view>

      <template #button>
        <button class="save-btn" @click="handleSave">
          保存
        </button>
      </template>
    </fix-button-layout>
  </view>

  <wd-popup v-model="showPopup" :z-index="100" custom-style="height: 500rpx;" safe-area-inset-bottom position="bottom" @close="handleClose">
    <view class="btn-container">
      <text class="cancel-btn" @click="handleClose">cancel</text>
      <text class="confirm-btn" @click="handleSalaryConfirm">confirm</text>
    </view>
    <wd-picker-view
      v-model="salaryPickerValue"
      title="选择薪资要求"
      :columns="salaryOptions"
      confirm-button-text="确定"
      custom-class="picker"
      @confirm="handleSalaryConfirm"
      @change="handleSalaryChange"
    />
  </wd-popup>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import TopNavbar from '@/components/common/TopNavbar.vue'
import FixButtonLayout from '@/layouts/fixButtonLayout.vue'

definePage({
  navigationStyle: 'custom',
})

const ROLE_STORAGE_KEY = 'projectRole'
const salaryPickerValue = ref('')
const showPopup = ref<boolean>(false)
const salaryOptions = [
  '面议',
  '3K以下/月',
  '3K-5K/月',
  '5K-8K/月',
  '8K-12K/月',
  '12K-20K/月',
  '20K-35K/月',
  '35K以上/月',
]
const salaryColumns = [salaryOptions]

const form = reactive({
  role: '',
  salary: '',
})

function loadRole() {
  const stored = uni.getStorageSync(ROLE_STORAGE_KEY)
  const roleName = stored?.role || stored?.name
  if (roleName) {
    form.role = roleName
  }
  else {
    form.role = ''
  }
}

function handleClose() {
  showPopup.value = false
}

function handleSalaryChange({ picker, value, index }) {
  console.log(`当前选中项: ${value}, 下标: ${index} picker: ${picker}`)
  salaryPickerValue.value = value
}

loadRole()

onShow(() => {
  loadRole()
})

function goBack() {
  uni.navigateBack()
}

function pickRole() {
  uni.navigateTo({
    url: '/pages/me/project-role-picker',
    events: {
      selectRole: (data: { role: string }) => {
        if (data?.role) {
          form.role = data.role
        }
      },
    },
  })
}

function pickSalary() {
  showPopup.value = true
  salaryPickerValue.value = form.salary || salaryOptions[0]
}

function handleSalaryConfirm(payload: { value: string | string[] }) {
  form.salary = salaryPickerValue.value
  showPopup.value = false
}

function handleSave() {
  uni.showToast({
    title: '保存成功',
    icon: 'success',
  })
}
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: #fff;
}

:deep(.fix-layout) {
  background: #fff;
}

.page-header {
  padding: 32rpx 36rpx 12rpx;
  display: flex;
  flex-direction: column;
}

.page-title {
  font-size: 44rpx;
  font-weight: 700;
  color: #222;
}

.page-subtitle {
  margin-top: 12rpx;
  font-size: 26rpx;
  color: #b0b0b0;
}

.form-section {
  margin-top: 20rpx;
  background: #fff;
  padding: 0 36rpx;
}

.form-item {
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f1f1f1;
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.form-item:last-child {
  border-bottom: none;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 6rpx;
  font-size: 28rpx;
  color: #333;
}

.required {
  color: #ff5f57;
}

.form-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  color: #333;
}

.salary-picker {
  background: red;
  height: 500rpx;
}

.placeholder {
  color: #c0c0c0;
}

.arrow {
  font-size: 36rpx;
  color: #5a7cff;
}

.save-btn {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  border-radius: 30rpx;
  border: none;
  font-size: 32rpx;
  color: #fff;
  background: linear-gradient(90deg, #5a7cff, #5070ff);
}

.btn-container {
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-container text {
  font-size: 32rpx;
  color: #000;
  padding: 0 36rpx;
}
</style>
