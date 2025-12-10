// 获取系统信息
const systemInfo = uni.getSystemInfoSync()
// 获取屏幕宽度（单位：px）
const screenWidth = systemInfo.screenWidth

/**
 * 将px转换为rpx
 * @param px - 像素值
 * @returns 转换后的rpx值
 */
export function pxToRpx(px: number): number {
  return px * (750 / screenWidth)
}

/**
 * 将rpx转换为px
 * @param rpx - 响应式像素值
 * @returns 转换后的px值
 */
export function rpxToPx(rpx: number): number {
  return rpx * (screenWidth / 750)
}
