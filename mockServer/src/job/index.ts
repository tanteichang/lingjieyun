import type { Job, JobDetail, JobListResponse } from '../../../src/types/job.d.ts'
import type { RouteDefinition, RouteHandler } from '../router.js'
import jobDetailTemplate from './data/job-detail.js'
import jobList from './data/job-list.js'

type SortType = 'hot' | 'salary' | 'newest'

function getJobs(): Job[] {
  return [...jobList]
}

function parseNumber(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function buildJobList(params: URLSearchParams): JobListResponse {
  const page = parseNumber(params.get('page'), 1)
  const pageSize = parseNumber(params.get('pageSize'), 10)
  const keyword = (params.get('keyword') || '').trim()
  const category = params.get('category') || 'all'
  const sort = (params.get('sort') || 'hot') as SortType

  let filteredJobs = getJobs()

  if (keyword) {
    filteredJobs = filteredJobs.filter(job => job.title.includes(keyword) || job.companyName.includes(keyword))
  }

  if (category !== 'all') {
    filteredJobs = filteredJobs.filter((job: Job) => job.category === category)
  }

  switch (sort) {
    case 'salary':
      filteredJobs.sort((a, b) => {
        const salaryA = Number.parseInt(a.salary.split('-')[1]) || 0
        const salaryB = Number.parseInt(b.salary.split('-')[1]) || 0
        return salaryB - salaryA
      })
      break
    case 'newest':
      filteredJobs.sort((a, b) => new Date(b.createTime || '').getTime() - new Date(a.createTime || '').getTime())
      break
    case 'hot':
    default:
      filteredJobs.sort((a, b) => Number.parseInt(b.id, 10) - Number.parseInt(a.id, 10))
  }

  const startIndex = (page - 1) * pageSize
  const list = filteredJobs.slice(startIndex, startIndex + pageSize)

  return {
    list,
    total: filteredJobs.length,
    page,
    pageSize,
  }
}

function buildJobDetail(id: string): JobDetail | null {
  if (!id) {
    return null
  }

  const selectedJob = jobList.find((job: Job) => job.id === id)
  return {
    ...jobDetailTemplate,
    ...selectedJob,
    id,
  }
}

const handleJobList: RouteHandler<JobListResponse> = (params) => {
  const data = buildJobList(params)
  return {
    statusCode: 200,
    body: {
      code: 200,
      message: '获取岗位列表成功',
      data,
    },
    delay: 600,
  }
}

const handleJobDetail: RouteHandler<JobDetail | null> = (params) => {
  const id = params.get('id')

  if (!id) {
    return {
      statusCode: 400,
      body: {
        code: 400,
        message: '缺少岗位ID',
        data: null,
      },
    }
  }

  const detail = buildJobDetail(id)

  if (!detail) {
    return {
      statusCode: 404,
      body: {
        code: 404,
        message: '岗位不存在',
        data: null,
      },
    }
  }

  return {
    statusCode: 200,
    body: {
      code: 200,
      message: '获取岗位详情成功',
      data: detail,
    },
    delay: 400,
  }
}

const API_PREFIX = '/mock/api/v1/job'

export const jobRoutes: RouteDefinition[] = [
  { method: 'GET', path: `${API_PREFIX}/list`, handler: handleJobList },
  { method: 'GET', path: `${API_PREFIX}/detail`, handler: handleJobDetail },
]
