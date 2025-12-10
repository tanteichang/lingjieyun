export interface ScrollListItem {
  id: string | number
  [key: string]: any
}

export interface UScrollListProps {
  // 列表数据
  list: ScrollListItem[]
  // 每项宽度，单位rpx
  itemWidth?: number
  // 每项高度，单位rpx
  itemHeight?: number
  // 每项间距，单位rpx
  itemGap?: number
  // 左右内边距，单位rpx
  padding?: number
  // 容器高度，单位rpx
  height?: number
  // 是否显示滚动条
  showScrollbar?: boolean
  // 是否启用滚动动画
  scrollWithAnimation?: boolean
  // 滚动到指定项的索引
  scrollIntoView?: number
  // 自定义类名
  customClass?: string
  // 自定义样式
  customStyle?: string
}

export interface UScrollListEmits {
  itemClick: [item: ScrollListItem, index: number]
  scroll: [event: any]
}

export interface UScrollListExpose {
  // 滚动到指定项
  scrollToItem: (index: number) => void
  // 滚动视图实例
  scrollView: any
}
