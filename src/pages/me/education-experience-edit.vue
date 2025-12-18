<template>
  <FormContainer ref="formRef" :model="model">
    <FixedLayout>
      <template #header>
        <TopNavbar title="添加教育经历" @click-left="goBack" />
      </template>

      <view class="education-form">
        <FormInput
          v-model="model.school"
          label="学校"
          placeholder="请输入"
          clearable
          :rules="[{ required: true, message: '请填写学校' }]"
        />

        <view class="form-select" @click="openDegreePicker">
          <view class="form-select__label">
            学历
          </view>
          <view class="form-select__value" :class="{ placeholder: !model.degree }">
            {{ model.degree || '请选择' }}
          </view>
          <wd-icon name="arrow-right" size="32rpx" color="#537BFF" />
        </view>

        <FormDatePicker
          label="时间段"
          placeholder="请输入"
          :rules="[{ required: true, message: '请选择时间段' }]"
          :model-value="[model.startDate, model.endDate]"
          @change="handleDateChange"
        />

        <text class="optional-tip">以下为选填项</text>

        <FormInput
          v-model="model.onCampusExperience"
          label="在校经历"
          placeholder="请输入"
          clearable
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
import { reactive, ref } from 'vue'
import FormContainer from '@/components/common/form/FormContainer.vue'
import FormDatePicker from '@/components/common/form/FormDatePicker.vue'
import FormInput from '@/components/common/form/FormInput.vue'
import MyButton from '@/components/common/MyButton.vue'
import TopNavbar from '@/components/common/TopNavbar.vue'
import FixedLayout from '@/layouts/fixed-layout.vue'

const DEGREE_OPTIONS = ['大专', '本科', '硕士', '博士', '其他']

const formRef = ref<InstanceType<typeof FormContainer> | null>(null)

const model = reactive({
  school: '',
  degree: '',
  startDate: '',
  endDate: '',
  onCampusExperience: '',
})

function goBack() {
  uni.navigateBack()
}

function handleDateChange(value: (string | number)[]) {
  model.startDate = value[0] as string
  model.endDate = value[1] as string
}

function openDegreePicker() {
  uni.showActionSheet({
    itemList: DEGREE_OPTIONS,
    success: (res) => {
      const index = res.tapIndex
      if (DEGREE_OPTIONS[index]) {
        model.degree = DEGREE_OPTIONS[index]
      }
    },
  })
}

async function handleSave() {
  const isValid = (await formRef.value?.validate?.()) ?? true
  if (!isValid) {
    uni.showToast({ title: '请完善信息', icon: 'none' })
    return
  }

  if (!model.degree) {
    uni.showToast({ title: '请选择学历', icon: 'none' })
    return
  }

  uni.showToast({ title: '保存成功', icon: 'success' })
}
</script>

<style scoped lang="scss">
.education-form {
  padding: 0 30rpx;
}

.form-select {
  display: flex;
  align-items: center;
  min-height: 108rpx;
  border-bottom: 1rpx solid #e3e6ef;
}

.form-select__label {
  width: 140rpx;
  font-size: 24rpx;
  color: #333333;
}

.form-select__value {
  flex: 1;
  text-align: right;
  font-size: 28rpx;
  color: #333333;
  margin-right: 12rpx;
}

.form-select__value.placeholder {
  color: #c4c4c4;
}

.optional-tip {
  display: block;
  margin: 32rpx 0 16rpx;
  font-size: 24rpx;
  color: #c0c0c0;
}

.footer {
  margin-top: 30rpx;
  padding: 0 30rpx 30rpx;
}
</style>
