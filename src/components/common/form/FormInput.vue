<template>
  <view class="common-form-input" :class="[rootClass, disabled ? 'is-disabled' : '']">
    <view v-if="label" class="common-form-input__label" :class="[customLabelClass]">
      <text v-if="isRequired" class="common-form-input__required">*</text>
      {{ label }}
    </view>

    <view class="common-form-input__control">
      <input
        class="common-form-input__inner"
        :class="customInputClass"
        :type="type"
        :value="String(inputValue)"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <view v-if="showClear" class="common-form-input__clear" @click="handleClear">
        ×
      </view>
    </view>

    <view v-if="errorMessage" class="common-form-input__error">
      {{ errorMessage }}
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CommonFormField, CommonFormRule } from './context'
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { COMMON_FORM_KEY, COMMON_FORM_MODEL_KEY } from './context'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    label?: string
    placeholder?: string
    type?: string
    rules?: CommonFormRule[]
    customInputClass?: string
    customLabelClass?: string
    clearable?: boolean
    disabled?: boolean
    readonly?: boolean
    maxlength?: number
    customClass?: string
  }>(),
  {
    modelValue: '',
    label: '',
    placeholder: '',
    type: 'text',
    rules: () => [],
    customInputClass: '',
    customLabelClass: '',
    clearable: false,
    disabled: false,
    readonly: false,
    maxlength: 140,
    customClass: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'input', value: string | number): void
  (e: 'clear'): void
}>()

const errorMessage = ref('')
const inputValue = computed(() => props.modelValue ?? '')
const rootClass = computed(() => [
  'common-form-input',
  props.customClass,
  errorMessage.value ? 'is-error' : '',
].filter(Boolean))
const showClear = computed(
  () => !!(props.clearable && !props.disabled && !props.readonly && String(inputValue.value).length),
)
const isRequired = computed(() => props.rules?.some(rule => rule.required))

function updateValue(value: string) {
  emit('update:modelValue', value)
}

function handleInput(event: any) {
  const value = event?.detail?.value ?? event?.target?.value ?? ''
  updateValue(value)
  emit('input', value)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
  void validate()
}

function handleClear() {
  updateValue('')
  emit('clear')
  void validate()
}

async function validate() {
  if (!props.rules?.length) {
    errorMessage.value = ''
    return true
  }

  const value = inputValue.value

  for (const rule of props.rules) {
    if (rule.required && (value === '' || value === null || value === undefined)) {
      errorMessage.value = rule.message || '该字段为必填项'
      return false
    }

    if (rule.validator) {
      try {
        const result = await rule.validator(value, formModel?.value ?? null)
        if (result === false) {
          errorMessage.value = rule.message || '输入不合法'
          return false
        }
        if (typeof result === 'string') {
          errorMessage.value = result
          return false
        }
      }
      catch (error) {
        errorMessage.value = rule.message || '输入不合法'
        return false
      }
    }
  }

  errorMessage.value = ''
  return true
}

watch(
  () => props.modelValue,
  () => {
    if (errorMessage.value) {
      void validate()
    }
  },
)

const formContext = inject(COMMON_FORM_KEY, null)
const formModel = inject(COMMON_FORM_MODEL_KEY, null)
const field: CommonFormField = {
  validate,
}

onMounted(() => {
  formContext?.registerField(field)
})

onBeforeUnmount(() => {
  formContext?.unregisterField(field)
})

defineExpose({ validate })
</script>

<style lang="scss" scoped>
.common-form-input {
  display: flex;
  flex-direction: column;
  min-height: 108rpx;
  width: 100%;
  border-bottom: 1rpx solid #e3e6ef;
  margin-top: 46rpx;
}

.common-form-input__label {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 24rpx;
  color: #333333;
  margin-bottom: 14rpx;
}

.common-form-input__required {
  color: #ff6b6b;
  margin-right: 8rpx;
}

.common-form-input__control {
  display: flex;
  align-items: center;
}

.common-form-input__inner {
  flex: 1;
  border: none;
  font-weight: 500;
  font-size: 28rpx;
  color: #c0c0c0;
}

.common-form-input__clear {
  margin-left: 16rpx;
  font-size: 32rpx;
  color: #c4c4c4;
}

.common-form-input__error {
  font-size: 24rpx;
  color: #ff6b6b;
}
</style>
