import type { InjectionKey, Ref } from 'vue'

export interface CommonFormRule {
  required?: boolean
  message?: string
  validator?: (value: any, model?: Record<string, any> | null) => boolean | string | Promise<boolean | string>
}

export interface CommonFormField {
  validate: () => boolean | Promise<boolean>
}

export interface CommonFormContext {
  registerField: (field: CommonFormField) => void
  unregisterField: (field: CommonFormField) => void
}

export type CommonFormInstance = {
  validate: () => Promise<boolean>
}

export const COMMON_FORM_KEY: InjectionKey<CommonFormContext> = Symbol('common-form')
export const COMMON_FORM_MODEL_KEY: InjectionKey<Ref<Record<string, any> | null>> = Symbol('common-form-model')
