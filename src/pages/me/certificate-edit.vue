<template>
  <FormContainer ref="formRef" :model="model">
    <FixedLayout>
      <template #header>
        <TopNavbar title="资格证书" @click-left="goBack" />
      </template>

      <view class="certificate-form">
        <FormUpload
          v-model="model.certificate"
          label="上传证书"
          desc="可上传资质证书"
          :rules="uploadRules"
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
import FormUpload from '@/components/common/form/FormUpload.vue'
import MyButton from '@/components/common/MyButton.vue'
import TopNavbar from '@/components/common/TopNavbar.vue'
import FixedLayout from '@/layouts/fixed-layout.vue'
import type { CommonFormRule } from '@/components/common/form/context'

const formRef = ref<InstanceType<typeof FormContainer> | null>(null)

const model = reactive({
  certificate: '',
})

const uploadRules: CommonFormRule[] = [{ required: true, message: '请上传证书' }]

function goBack() {
  uni.navigateBack()
}

async function handleSave() {
  const isValid = (await formRef.value?.validate?.()) ?? true
  if (!isValid || !model.certificate) {
    uni.showToast({ title: '请上传证书', icon: 'none' })
    return
  }

  uni.showToast({ title: '保存成功', icon: 'success' })
}
</script>

<style scoped lang="scss">
.certificate-form {
  padding: 0 30rpx;
}

.footer {
  margin-top: 30rpx;
  padding: 0 30rpx 30rpx;
}
</style>
