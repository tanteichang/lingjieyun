<template>
  <view :class="rootClass">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CommonFormField, CommonFormInstance } from './context'
import { computed, provide, toRef } from 'vue'
import { COMMON_FORM_KEY, COMMON_FORM_MODEL_KEY } from './context'

defineOptions({
  options: {
    styleIsolation: 'shared', // 允许样式穿透（微信小程序）
  },
})

const props = withDefaults(
  defineProps<{
    model?: Record<string, any> | null
    customClass?: string
  }>(),
  {
    model: () => ({}),
    customClass: '',
  },
)

const rootClass = computed(() => ['common-form', props.customClass].filter(Boolean).join(' '))

const modelRef = toRef(props, 'model')

const fields = new Set<CommonFormField>()

function registerField(field: CommonFormField) {
  fields.add(field)
}

function unregisterField(field: CommonFormField) {
  fields.delete(field)
}

provide(COMMON_FORM_KEY, {
  registerField,
  unregisterField,
})

provide(COMMON_FORM_MODEL_KEY, modelRef)

async function validate(): Promise<boolean> {
  if (!fields.size)
    return true
  const results = await Promise.all(Array.from(fields).map(field => field.validate()))
  return results.every(Boolean)
}

defineExpose<CommonFormInstance>({
  validate,
})
</script>

<style scoped lang="scss">
.common-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
}

.common-form :deep(.common-form-field) {
  border-bottom: 1rpx solid #e3e6ef;
}

.common-form :deep(.common-form-field:last-child) {
  border-bottom: none;
}
</style>
