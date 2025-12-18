<template>
  <FormContainer ref="formRef" :model="model">
    <FixedLayout>
      <template #header>
        <TopNavbar title="添加项目经历" @click-left="goBack" />
      </template>

      <view class="project-form">
        <FormInput
          v-model="model.projectName"
          label="项目名称"
          placeholder="请输入"
          clearable
          :rules="projectNameRules"
        />

        <FormInput
          v-model="model.projectRole"
          label="项目角色"
          placeholder="请输入"
          clearable
          :rules="projectRoleRules"
        />

        <FormDatePicker
          label="项目时间"
          placeholder="开始时间"
          :rules="[{ required: true, message: '请选择项目时间' }]"
          :model-value="[model.startDate, model.endDate]"
          @change="handleDateChange"
        />

        <FormInput
          v-model="model.projectDescription"
          label="项目描述"
          placeholder="请输入"
          clearable
          :rules="projectDescRules"
        />

        <text class="optional-tip">以下为选填项</text>

        <FormUpload
          v-model="model.projectMaterial"
          label="项目资料"
          desc="可上传项目相关成果的图片或视频"
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
import FormUpload from '@/components/common/form/FormUpload.vue'
import MyButton from '@/components/common/MyButton.vue'
import TopNavbar from '@/components/common/TopNavbar.vue'
import FixedLayout from '@/layouts/fixed-layout.vue'
import type { CommonFormRule } from '@/components/common/form/context'

const formRef = ref<InstanceType<typeof FormContainer> | null>(null)

const model = reactive({
  projectName: '',
  projectRole: '',
  startDate: '',
  endDate: '',
  projectDescription: '',
  projectMaterial: '',
})

const projectNameRules: CommonFormRule[] = [{ required: true, message: '请填写项目名称' }]
const projectRoleRules: CommonFormRule[] = [{ required: true, message: '请填写项目角色' }]
const projectDescRules: CommonFormRule[] = [{ required: true, message: '请填写项目描述' }]

function goBack() {
  uni.navigateBack()
}

function handleDateChange(value: (string | number)[]) {
  model.startDate = value[0] as string
  model.endDate = value[1] as string
}

async function handleSave() {
  const isValid = (await formRef.value?.validate?.()) ?? true
  if (!isValid) {
    uni.showToast({ title: '请完善信息', icon: 'none' })
    return
  }

  uni.showToast({ title: '保存成功', icon: 'success' })
}
</script>

<style scoped lang="scss">
.project-form {
  padding: 0 30rpx;
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
