<template>
  <view class="role-page">
    <view class="nav-wrapper">
      <TopNavbar title="选择项目类型" @click-left="goBack" />
    </view>

    <view class="search-wrapper">
      <view class="search-input">
        <wd-icon name="search1" size="40rpx" color="#B1B1C0" style="margin-right: 22rpx;" />
        <input
          v-model="searchKeyword"
          class="search-field"
          type="text"
          placeholder="搜索项目名称"
          placeholder-style="color:#bfc6d7;font-size:26rpx"
          confirm-type="search"
        >
      </view>
    </view>

    <view class="content">
      <scroll-view scroll-y class="category-list">
        <view
          v-for="category in roleCategories"
          :key="category.id"
          class="category-item"
          :class="{ active: category.id === selectedCategoryId }"
          @click="selectCategory(category.id)"
        >
          {{ category.name }}
        </view>
      </scroll-view>

      <scroll-view scroll-y class="role-list">
        <view class="role-header">
          {{ listTitle }}
        </view>

        <view v-if="displayedRoles.length" class="role-grid">
          <view
            v-for="role in displayedRoles"
            :key="role.name"
            class="role-tag"
            :class="{ selected: role.name === selectedRoleName }"
            @click="handleRoleSelect(role)"
          >
            {{ role.name }}
          </view>
        </view>
        <view v-else class="empty">
          暂无匹配的项目类型
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TopNavbar from '@/components/common/TopNavbar.vue'

declare const getOpenerEventChannel: () => UniApp.EventChannel

definePage({
  navigationStyle: 'custom',
})

interface RoleCategory {
  id: string
  name: string
  roles: string[]
}

interface RoleItem {
  name: string
  categoryId: string
  categoryName: string
}

const ROLE_STORAGE_KEY = 'projectRole'

const eventChannel = typeof getOpenerEventChannel === 'function' ? getOpenerEventChannel() : null

const roleCategories: RoleCategory[] = [
  {
    id: 'recommend',
    name: '为你推荐',
    roles: ['会计', '建筑木工', 'UI设计师', '视觉设计师', '塔吊安装/维修', '美工', '包装设计', '交互设计师'],
  },
  {
    id: 'decoration',
    name: '装修/房屋翻新',
    roles: ['水电工', '泥瓦工', '木工', '装修设计', '家装监理', '智能家居安装'],
  },
  {
    id: 'construction',
    name: '建筑工程',
    roles: ['项目经理', '结构工程师', 'BIM工程师', '资料员', '安全员', '测量员'],
  },
  {
    id: 'machinery',
    name: '工程机械司机',
    roles: ['挖掘机司机', '吊车司机', '铲车司机', '混凝土泵车司机', '压路机司机'],
  },
  {
    id: 'logistics',
    name: '物流/仓储/司机',
    roles: ['仓库主管', '物流专员', '配送司机', '叉车工', '快递员'],
  },
  {
    id: 'manufacture',
    name: '生产制造/普工/技工',
    roles: ['普工', '数控车工', '焊工', '钳工', '质检员', '设备维护'],
  },
  {
    id: 'retail',
    name: '零售/生活服务',
    roles: ['导购', '店长', '客服专员', '美容师', '家政服务', '保洁'],
  },
  {
    id: 'catering',
    name: '餐饮',
    roles: ['中餐厨师', '西餐厨师', '面点师', '餐厅经理', '茶艺师'],
  },
  {
    id: 'hotel',
    name: '酒店/旅游',
    roles: ['前台', '客房服务', '旅行顾问', '导游', '宴会策划'],
  },
  {
    id: 'sales',
    name: '销售',
    roles: ['销售顾问', '渠道经理', '大客户经理', '商务拓展', '电商运营'],
  },
  {
    id: 'hr',
    name: '人力/行政/财务/法务',
    roles: ['人事专员', '招聘经理', '行政助理', '财务专员', '法务专员'],
  },
  {
    id: 'hr2',
    name: '人力/行政/财务/法务',
    roles: ['人事专员', '招聘经理', '行政助理', '财务专员', '法务专员'],
  },
  {
    id: 'h3',
    name: '人力/行政/财务/法务',
    roles: ['人事专员', '招聘经理', '行政助理', '财务专员', '法务专员'],
  },
]

const selectedCategoryId = ref(roleCategories[0]?.id || '')
const searchKeyword = ref('')
const selectedRoleName = ref('')

const storedRole = uni.getStorageSync(ROLE_STORAGE_KEY)
if (storedRole?.role) {
  selectedRoleName.value = storedRole.role
  if (storedRole.categoryId) {
    selectedCategoryId.value = storedRole.categoryId
  }
}

const activeCategory = computed(() => roleCategories.find(category => category.id === selectedCategoryId.value) || roleCategories[0])

const currentRoles = computed<RoleItem[]>(() => {
  if (!activeCategory.value) {
    return []
  }
  return activeCategory.value.roles.map(role => ({
    name: role,
    categoryId: activeCategory.value!.id,
    categoryName: activeCategory.value!.name,
  }))
})

const allRoles = computed<RoleItem[]>(() =>
  roleCategories.flatMap(category =>
    category.roles.map(role => ({
      name: role,
      categoryId: category.id,
      categoryName: category.name,
    })),
  ),
)

const displayedRoles = computed<RoleItem[]>(() => {
  const keyword = searchKeyword.value.trim()
  if (!keyword) {
    return currentRoles.value
  }
  return allRoles.value.filter(role => role.name.includes(keyword))
})

const listTitle = computed(() => {
  if (searchKeyword.value.trim()) {
    return '搜索结果'
  }
  return activeCategory.value?.name || ''
})

function selectCategory(id: string) {
  selectedCategoryId.value = id
  searchKeyword.value = ''
}

function handleRoleSelect(role: RoleItem) {
  selectedCategoryId.value = role.categoryId
  selectedRoleName.value = role.name
  uni.setStorageSync(ROLE_STORAGE_KEY, role)
  eventChannel?.emit('selectRole', {
    role: role.name,
    categoryId: role.categoryId,
    categoryName: role.categoryName,
  })
  uni.showToast({
    title: '已选择',
    icon: 'success',
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 400)
}

function goBack() {
  uni.navigateBack()
}
</script>

<style scoped>
.role-page {
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.nav-wrapper {
  position: sticky;
  top: 0;
  z-index: 20;
  background: #fff;
}

.search-wrapper {
  padding: 18rpx 32rpx 12rpx;
  margin-bottom: 30rpx;
}

.search-input {
  display: flex;
  align-items: center;
  background: #f6f7fb;
  border-radius: 40rpx;
  padding: 0 30rpx;
  height: 80rpx;
}

.search-field {
  flex: 1;
  font-size: 24rpx;
  color: #989ca2;
}

.content {
  flex: 1;
  display: flex;
  border-top: 2rpx solid #f0f2f6;
}

.category-list {
  width: 32%;
  background: #fff;
  height: calc(100vh - 180px);
  border-right: 1rpx solid #e3e6ef;
}

.category-item {
  position: relative;
  padding: 28rpx 24rpx 28rpx 36rpx;
  margin: 30rpx 0;
  font-size: 28rpx;
  color: #333333;
  border-bottom: 2rpx solid transparent;
}

.category-item.active {
  color: #5275ff;
  font-weight: 600;
  background: #fff;
}

.category-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 30rpx;
  bottom: 30rpx;
  width: 4rpx;
  background: #537bff;
}

.role-list {
  flex: 1;
  padding: 0 32rpx 40rpx;
  height: calc(100vh - 180px);
}

.role-header {
  font-size: 28rpx;
  font-weight: 600;
  color: #2e3038;
  padding: 28rpx 0;
}

.role-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.role-tag {
  width: calc(50% - 10rpx);
  text-align: center;
  padding: 24rpx 0;
  background: #f6f7fb;
  border-radius: 20rpx;
  font-size: 26rpx;
  color: #3a3d4a;
  transition: all 0.2s;
}

.role-tag.selected {
  background: #e5ebff;
  color: #3652ff;
  font-weight: 600;
  box-shadow: inset 0 0 0 2rpx #3652ff;
}

.empty {
  padding: 80rpx 0;
  text-align: center;
  color: #a0a7b8;
  font-size: 26rpx;
}
</style>
