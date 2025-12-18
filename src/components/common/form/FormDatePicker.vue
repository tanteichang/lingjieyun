<template>
  <view :class="rootClass">
    <view class="common-form-date-picker__wrapper" @click="handleTogglePopup">
      <view>
        <view v-if="label" class="common-form-date-picker__label" :class="customLabelClass">
          <text v-if="isRequired" class="common-form-date-picker__required">*</text>
          {{ label }}
        </view>
      </view>
      <view class="common-form-date-picker__content" :class="customValueClass">
        <text v-if="displayValue" class="common-form-date-picker__value">
          {{ displayValue }}
        </text>
        <text v-else class="common-form-date-picker__placeholder">
          {{ placeholderText }}
        </text>
        <wd-icon name="arrow-right" color="#537BFF" class="common-form-date-picker__arrow" />
      </view>
    </view>
    <view v-if="errorMessage" class="common-form-date-picker__error">
      {{ errorMessage }}
    </view>
  </view>

  <wd-popup
    v-model="visible"
    position="bottom"
    safe-area-inset-bottom
    custom-class="common-form-date-picker__popup"
  >
    <view class="common-form-date-picker__popup-inner">
      <view class="common-form-date-picker__toolbar">
        <view class="common-form-date-picker__action" @click="handleCancel">
          取消
        </view>
        <view class="common-form-date-picker__title">
          {{ title }}
        </view>
        <view class="common-form-date-picker__action is-confirm" @click="handleConfirm">
          确定
        </view>
      </view>

      <view v-if="isRangeMode" class="common-form-date-picker__range">
        <view class="common-form-date-picker__range-tabs">
          <view
            class="common-form-date-picker__tab"
            :class="{ 'is-active': activeRange === 'start' }"
            @click="setActiveRange('start')"
          >
            <view class="common-form-date-picker__tab-label">
              {{ startPlaceholder }}
            </view>
            <view class="common-form-date-picker__tab-value">
              {{ formatRangeTabValue(rangeStartValue) }}
            </view>
          </view>
          <view
            class="common-form-date-picker__tab"
            :class="{ 'is-active': activeRange === 'end' }"
            @click="setActiveRange('end')"
          >
            <view class="common-form-date-picker__tab-label">
              {{ endPlaceholder }}
            </view>
            <view class="common-form-date-picker__tab-value">
              {{ formatRangeTabValue(rangeEndValue) }}
            </view>
          </view>
        </view>
        <view class="common-form-date-picker__range-picker">
          <wd-datetime-picker-view
            v-model="rangePickerValue"
            :type="type"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </view>
      </view>
      <view v-else class="common-form-date-picker__single">
        <wd-datetime-picker-view
          v-model="singleValue"
          :type="type"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </view>
    </view>
  </wd-popup>
</template>

<script setup lang="ts">
import type { CommonFormField, CommonFormRule } from './context'
import type { DateTimeType } from '@/uni_modules/wot-design-uni/components/wd-datetime-picker-view/types'
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { COMMON_FORM_KEY, COMMON_FORM_MODEL_KEY } from './context'

type DateInput = string | number | Date | null | undefined

const props = withDefaults(
  defineProps<{
    modelValue?: DateInput | DateInput[]
    label?: string
    placeholder?: string
    startPlaceholder?: string
    endPlaceholder?: string
    rules?: CommonFormRule[]
    type?: DateTimeType
    minDate?: number
    maxDate?: number
    valueFormat?: string
    valueType?: 'format' | 'timestamp'
    title?: string
    customClass?: string
    customLabelClass?: string
    customValueClass?: string
    disabled?: boolean
  }>(),
  {
    modelValue: '',
    label: '',
    placeholder: '请选择时间',
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    rules: () => [],
    type: 'year-month' as DateTimeType,
    minDate: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
    maxDate: new Date(new Date().getFullYear() + 10, 11, 31, 23, 59, 59).getTime(),
    valueFormat: 'YYYY-MM',
    valueType: 'format',
    title: '选择时间',
    customClass: '',
    customLabelClass: '',
    customValueClass: '',
    disabled: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number | (string | number)[]): void
  (event: 'change', value: string | number | (string | number)[]): void
}>()

const visible = ref(false)
const errorMessage = ref('')
const singleValue = ref<number>(Date.now())
const rangeStartValue = ref<number>(Date.now())
const rangeEndValue = ref<number>(Date.now())
const rangePickerValue = ref<number>(Date.now())
const activeRange = ref<'start' | 'end'>('start')

const isRangeMode = computed(() => Array.isArray(props.modelValue))
const placeholderText = computed(() =>
  isRangeMode.value ? `${props.startPlaceholder} - ${props.endPlaceholder}` : props.placeholder,
)
const isRequired = computed(() => props.rules?.some(rule => rule.required))
const rootClass = computed(() =>
  [
    'common-form-date-picker',
    props.customClass,
    errorMessage.value ? 'is-error' : '',
    props.disabled ? 'is-disabled' : '',
  ]
    .filter(Boolean)
    .join(' '),
)

const displayValue = computed(() => {
  if (Array.isArray(props.modelValue)) {
    const [start, end] = props.modelValue
    const startText = formatDisplayValue(start)
    const endText = formatDisplayValue(end)
    if (startText || endText) {
      return `${startText || '--'} ~ ${endText || '--'}`
    }
    return ''
  }
  return formatDisplayValue(props.modelValue)
})

function padZero(value: number, length = 2) {
  return `${value}`.padStart(length, '0')
}

function formatDate(value: number, format: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime()))
    return ''
  const replacements: Record<string, string> = {
    YYYY: `${date.getFullYear()}`,
    MM: padZero(date.getMonth() + 1),
    DD: padZero(date.getDate()),
    HH: padZero(date.getHours()),
    mm: padZero(date.getMinutes()),
    ss: padZero(date.getSeconds()),
  }
  return Object.keys(replacements).reduce((result, token) => {
    return result.replace(new RegExp(token, 'g'), replacements[token])
  }, format)
}

function parseDateString(value: string): number | null {
  const normalized = value.replace(/-/g, '/')
  const timestamp = new Date(normalized).getTime()
  if (Number.isNaN(timestamp))
    return null
  return timestamp
}

function formatDisplayValue(value?: DateInput) {
  if (value === null || value === undefined || value === '') {
    return ''
  }
  const timestamp = typeof value === 'number' ? value : toTimestamp(value)
  return formatDate(timestamp, props.valueFormat)
}

function formatRangeTabValue(value?: number) {
  if (value === undefined || value === null)
    return '--'
  return formatDate(value, props.valueFormat)
}

function clampTimestamp(value: number) {
  return Math.min(Math.max(value, props.minDate), props.maxDate)
}

function toTimestamp(value?: DateInput): number {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return clampTimestamp(value)
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return clampTimestamp(value.getTime())
  }
  if (typeof value === 'string' && value) {
    const numeric = Number(value)
    if (!Number.isNaN(numeric) && props.valueType === 'timestamp') {
      return clampTimestamp(numeric)
    }
    const parsed = parseDateString(value)
    if (parsed !== null)
      return clampTimestamp(parsed)
  }
  return clampTimestamp(Date.now())
}

function hasPrimitiveValue(value?: DateInput) {
  return !(value === null || value === undefined || value === '')
}

function syncPickerFromModel() {
  if (Array.isArray(props.modelValue)) {
    const [startRaw, endRaw] = props.modelValue
    const start = hasPrimitiveValue(startRaw) ? toTimestamp(startRaw) : clampTimestamp(Date.now())
    const end = hasPrimitiveValue(endRaw) ? toTimestamp(endRaw) : start
    rangeStartValue.value = start
    rangeEndValue.value = end < start ? start : end
    syncRangePickerValue()
  }
  else {
    singleValue.value = toTimestamp(props.modelValue)
  }
}

function syncRangePickerValue() {
  if (!isRangeMode.value)
    return
  rangePickerValue.value = activeRange.value === 'start' ? rangeStartValue.value : rangeEndValue.value
}

watch(
  () => props.modelValue,
  () => {
    syncPickerFromModel()
    if (errorMessage.value) {
      void validate()
    }
  },
  { immediate: true, deep: true },
)

watch(
  () => visible.value,
  (val) => {
    if (val) {
      syncPickerFromModel()
      activeRange.value = 'start'
    }
  },
)

watch(
  () => activeRange.value,
  () => {
    syncRangePickerValue()
  },
)

watch(
  () => rangePickerValue.value,
  (value) => {
    if (!isRangeMode.value)
      return
    if (activeRange.value === 'start') {
      rangeStartValue.value = value
      if (value > rangeEndValue.value) {
        rangeEndValue.value = value
      }
    }
    else {
      rangeEndValue.value = value
      if (value < rangeStartValue.value) {
        rangeStartValue.value = value
      }
    }
  },
)

function setActiveRange(part: 'start' | 'end') {
  activeRange.value = part
}

function handleTogglePopup() {
  if (props.disabled)
    return
  visible.value = true
}

function handleCancel() {
  visible.value = false
  syncPickerFromModel()
}

function getOutputValue(value: number): string | number {
  return props.valueType === 'timestamp' ? value : formatDate(value, props.valueFormat)
}

function emitValue() {
  if (isRangeMode.value) {
    return [getOutputValue(rangeStartValue.value), getOutputValue(rangeEndValue.value)]
  }
  return getOutputValue(singleValue.value)
}

function handleConfirm() {
  const value = emitValue()
  emit('update:modelValue', value)
  emit('change', value)
  visible.value = false
  void validate()
}

function hasValueFilled(value: DateInput | DateInput[]) {
  if (Array.isArray(value)) {
    if (!value.length)
      return false
    return value.every(item => hasPrimitiveValue(item))
  }
  return hasPrimitiveValue(value)
}

async function validate() {
  if (!props.rules?.length) {
    errorMessage.value = ''
    return true
  }

  const value = props.modelValue
  const filled = hasValueFilled(value ?? '')

  for (const rule of props.rules) {
    if (rule.required && !filled) {
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

<style scoped lang="scss">
.common-form-date-picker {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1rpx solid #e3e6ef;
  padding: 30rpx 0;

  &__wrapper {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 16rpx;
  }

  &__label {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 24rpx;
    color: #333333;
    margin-right: 0;
    flex: 0 0 auto;
    white-space: nowrap;
    width: auto;
  }

  &__required {
    color: #ff6b6b;
    margin-right: 8rpx;
  }

  &__content {
    flex: 1;
    min-height: 44rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__value {
    color: #333333;
  }

  &__placeholder {
    color: #c4c4c4;
  }

  &__arrow {
    font-size: 28rpx;
    color: #c4c4c4;
    margin-left: 12rpx;
  }

  &__error {
    margin-top: 12rpx;
    font-size: 22rpx;
    color: #ff6b6b;
  }

  &__popup-inner {
    background: #ffffff;
  }

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
  }

  &__action {
    font-size: 28rpx;
    color: #999999;

    &.is-confirm {
      color: #537bff;
    }
  }

  &__title {
    font-size: 28rpx;
    font-weight: 600;
    color: #333333;
  }

  &__range {
    padding: 30rpx 30rpx 0;
  }

  &__single {
    padding: 30rpx;
  }

  &__range-tabs {
    display: flex;
    gap: 20rpx;
    margin-bottom: 30rpx;
  }

  &__tab {
    flex: 1;
    border-radius: 16rpx;
    background: #f5f6fa;
    padding: 20rpx 24rpx;
    transition: background 0.2s ease;
  }

  &__tab-label {
    font-size: 24rpx;
    color: #999999;
  }

  &__tab-value {
    margin-top: 10rpx;
    font-size: 28rpx;
    font-weight: 600;
    color: #333333;
    word-break: break-all;
  }

  &__tab.is-active {
    background: #537bff;
  }

  &__tab.is-active .common-form-date-picker__tab-label,
  &__tab.is-active .common-form-date-picker__tab-value {
    color: #ffffff;
  }

  &__range-picker {
    padding-bottom: 30rpx;
  }

  &__single :deep(.wd-picker-view),
  &__range-picker :deep(.wd-picker-view) {
    width: 100%;
  }

  &.is-disabled {
    opacity: 0.6;
  }
}
</style>
