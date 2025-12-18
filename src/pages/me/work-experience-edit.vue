<template>
  <FormContainer ref="formRef" :model="model">
    <FixedLayout>
      <template #header>
        <TopNavbar title="添加工作经历" @click-left="goBack" />
      </template>

      <view class="common-form-item-container">
        <FormInput
          v-model="model.company"
          label="公司名称"
          clearable
          placeholder="请输入公司名称"
          :rules="companyRules"
        />
        <FormInput
          v-model="model.projectRole"
          label="项目角色"
          clearable
          placeholder="请输入项目角色"
          :rules="projectRoleRules"
        />
        <FormDatePicker
          :rules="[{ required: true, message: '请选择项目时间' }]"
          :model-value="[model.startDate, model.endDate]"
          label="项目时间"
          @change="handleDateChange"
        />
        <FormInput
          v-model="model.content"
          label="项目描述"
          clearable
          placeholder="请输入项目描述"
          :rules="projectRoleRules"
        />
        <text>以下为选填项</text>
        <FormUpload
          v-model="model.uploadFile"
          label="项目资料"
          desc="可上传项目相关成果的图片或视频"
          clearable
          :rules="[{ required: false }]"
        />
      </view>
      <template #footer>
        <view class="footer">
          <MyButton text="保存" @click="handleSave" />
        </view>
      </template>
    </FixedLayout>
  </FormContainer>
</template>

<script setup lang="ts">
import type { CommonFormRule } from '@/components/common/form/context'

import { reactive, ref } from 'vue'

import FormContainer from '@/components/common/form/FormContainer.vue'
import FormDatePicker from '@/components/common/form/FormDatePicker.vue'
import FormInput from '@/components/common/form/FormInput.vue'
import MyButton from '@/components/common/MyButton.vue'
import TopNavbar from '@/components/common/TopNavbar.vue'
import FixedLayout from '@/layouts/fixed-layout.vue'

const formRef = ref<InstanceType<typeof FormContainer> | null>(null)

const model = reactive({
  company: '',
  startDate: '',
  endDate: '',
  projectRole: '',
  position: '',
  content: '',
  performance: '',
  department: '',
  uploadFile: '',
})

const companyRules: CommonFormRule[] = [
  { required: true, message: '请填写公司名称' },
]

const projectRoleRules: CommonFormRule[] = [
  { required: true, message: '请填写项目角色' },
]

function goBack() {
  uni.navigateBack()
}

async function handleSave() {
  const isValid = (await formRef.value?.validate?.()) ?? true
  if (!isValid) {
    uni.showToast({
      title: '请完善信息',
      icon: 'none',
    })
    return
  }
  console.log(model)

  uni.showToast({
    title: '保存成功',
    icon: 'success',
  })
}
function handleDateChange(value) {
  console.log(value)
  model.startDate = value[0]
  model.endDate = value[1]
}
</script>

<style scoped lang="scss">
:deep(.fix-layout) {
  background: #fff;
}

.common-form-item-container {
  padding: 0 30rpx;
}

.form-list {
  padding: 0 32rpx;
  background: #fff;
}

.form-item {
  margin: 30rpx;
}

.label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
}

.input {
  font-size: 28rpx;
  color: #333;
}

.textarea {
  width: 100%;
  min-height: 160rpx;
  font-size: 28rpx;
  color: #333;
}

.time-row,
.select-row {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: #333;
}

.split {
  margin: 0 20rpx;
  color: #333;
}

.arrow {
  margin-left: auto;
  color: #5a7cff;
  font-size: 36rpx;
}

.placeholder {
  color: #c4c4c4;
}

.section-title {
  font-size: 24rpx;
  color: #b0b0b0;
  padding: 24rpx 0 0;
}

.save-btn {
  width: 100%;
  height: 96rpx;
  border-radius: 10rpx;
  border: none;
  font-weight: bold;
  font-size: 28rpx;
  color: #ffffff;
  line-height: 48rpx;
  background: #537bff;
}

.footer {
  margin-top: 30rpx;
  padding: 0 30rpx;
}

.custom-input {
  flex-direction: column;
}

:deep(.custom-label) {
  font-weight: 600;
}
</style>
