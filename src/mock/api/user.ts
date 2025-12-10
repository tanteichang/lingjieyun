import type { MockItem } from '../index'

// 用户登录接口Mock
export const loginMock: MockItem = {
  request: {
    url: '/api/user/login',
    method: 'POST',
  },
  response: (request) => {
    const { username, password } = request.data || {}

    // 模拟登录验证
    if (username === 'admin' && password === '123456') {
      return {
        code: 200,
        message: '登录成功',
        data: {
          token: 'mock-token-123456',
          userInfo: {
            id: 1,
            username: 'admin',
            nickname: '管理员',
            avatar: 'https://example.com/avatar.jpg',
            role: 'admin',
          },
        },
      }
    }
    else if (username === 'user' && password === '123456') {
      return {
        code: 200,
        message: '登录成功',
        data: {
          token: 'mock-token-789012',
          userInfo: {
            id: 2,
            username: 'user',
            nickname: '普通用户',
            avatar: 'https://example.com/avatar.jpg',
            role: 'user',
          },
        },
      }
    }
    else {
      return {
        code: 401,
        message: '用户名或密码错误',
      }
    }
  },
  delay: 500,
}

// 获取用户信息接口Mock
export const getUserInfoMock: MockItem = {
  request: {
    url: '/api/user/info',
    method: 'GET',
  },
  response: () => {
    return {
      code: 200,
      message: '获取用户信息成功',
      data: {
        id: 1,
        username: 'admin',
        nickname: '管理员',
        avatar: 'https://example.com/avatar.jpg',
        role: 'admin',
        email: 'admin@example.com',
        phone: '13800138000',
        createdAt: '2023-01-01 00:00:00',
      },
    }
  },
  delay: 300,
}

// 更新用户信息接口Mock
export const updateUserInfoMock: MockItem = {
  request: {
    url: '/api/user/info',
    method: 'PUT',
  },
  response: (request) => {
    const updateData = request.data || {}

    return {
      code: 200,
      message: '更新用户信息成功',
      data: {
        id: 1,
        username: 'admin',
        nickname: updateData.nickname || '管理员',
        avatar: updateData.avatar || 'https://example.com/avatar.jpg',
        role: 'admin',
        email: updateData.email || 'admin@example.com',
        phone: updateData.phone || '13800138000',
        createdAt: '2023-01-01 00:00:00',
      },
    }
  },
  delay: 400,
}

// 用户列表接口Mock
export const getUserListMock: MockItem = {
  request: {
    url: '/api/user/list',
    method: 'GET',
  },
  response: () => {
    return {
      code: 200,
      message: '获取用户列表成功',
      data: {
        list: [
          {
            id: 1,
            username: 'admin',
            nickname: '管理员',
            avatar: 'https://example.com/avatar.jpg',
            role: 'admin',
            status: 1,
          },
          {
            id: 2,
            username: 'user',
            nickname: '普通用户',
            avatar: 'https://example.com/avatar.jpg',
            role: 'user',
            status: 1,
          },
          {
            id: 3,
            username: 'test',
            nickname: '测试用户',
            avatar: 'https://example.com/avatar.jpg',
            role: 'user',
            status: 0,
          },
        ],
        total: 3,
        page: 1,
        pageSize: 10,
      },
    }
  },
  delay: 600,
}

// 导出所有用户相关的Mock
export const userMocks: MockItem[] = [
  loginMock,
  getUserInfoMock,
  updateUserInfoMock,
  getUserListMock,
]
