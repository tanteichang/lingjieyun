import type { MockItem } from '../index'
import type { Job, JobDetail } from '@/types/job'
import mockJobDetailData from '../../../mockServer/src/job/data/job-detail'
import mockJobsData from '../../../mockServer/src/job/data/job-list'
import { createResponse } from '../index'

// 获取岗位列表接口Mock
export const getJobListMock: MockItem = {
  request: {
    url: '/api/v1/job/list',
    method: 'GET',
  },
  response: (request: { params?: { page?: string | number, pageSize?: string | number, keyword?: string, category?: string, sort?: string } }) => {
    const { page = 1, pageSize = 10, keyword = '', category = 'all', sort = 'hot' } = request.params || {}

    // 模拟岗位数据（从JS模块加载）
    const mockJobs: Job[] = mockJobsData

    // 筛选数据
    let filteredJobs = [...mockJobs]

    // 关键词筛选
    if (keyword) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.includes(keyword)
        || job.companyName.includes(keyword),
      )
    }

    // 分类筛选
    if (category !== 'all') {
      filteredJobs = filteredJobs.filter(job => job.category === category)
    }

    // 排序
    switch (sort) {
      case 'salary':
        filteredJobs.sort((a, b) => {
          const salaryA = Number.parseInt(a.salary.split('-')[1]) || 0
          const salaryB = Number.parseInt(b.salary.split('-')[1]) || 0
          return salaryB - salaryA
        })
        break
      case 'newest':
        filteredJobs.sort((a, b) => {
          return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
        })
        break
      case 'hot':
      default:
        // 热门排序（这里简单使用id倒序模拟）
        filteredJobs.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
    }

    // 分页
    const startIndex = (Number(page) - 1) * Number(pageSize)
    const endIndex = startIndex + Number(pageSize)
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

    return createResponse(200, {
      list: paginatedJobs,
      total: filteredJobs.length,
      page: Number.parseInt(String(page)),
      pageSize: Number.parseInt(String(pageSize)),
    }, '获取岗位列表成功')
  },
  delay: 600,
}

// 获取岗位详情接口Mock
export const getJobDetailMock: MockItem = {
  request: {
    url: '/api/v1/job/detail',
    method: 'GET',
  },
  response: (request: { params?: { id?: string } }) => {
    const { id } = request.params || {}

    // 模拟岗位详情数据（从JS模块加载，并使用请求中的id）
    const baseJobDetail: JobDetail = mockJobDetailData
    const mockJobDetail: JobDetail = {
      ...baseJobDetail,
      id,
    }

    return createResponse(200, mockJobDetail, '获取岗位详情成功')
  },
  delay: 400,
}

// 导出所有岗位相关的Mock
export const jobMocks: MockItem[] = [
  getJobListMock,
  getJobDetailMock,
]
