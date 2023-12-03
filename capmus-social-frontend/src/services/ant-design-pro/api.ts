// @ts-ignore
/* eslint-disable */
import  request  from '@/plugins/globalRequest';

/** 获取当前的用户 GET /api/user/current **/
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<Record<string, any>>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/login/account */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索用户 GET /api/notices */
export async function listUsers(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/list', {
    method: 'GET',
    ...(options || {}),

  });
}

/**
 * 删除用户（管理员）
 * @param params
 */
export async function deleteUser(params: API.UserDeleteRequest) {
  return request<API.BaseResponse<boolean>>(`/api/post/delete/` + params.id, {
    method: 'DELETE',
    // params: { ...params },
    headers: {
      'Content-Type': 'application/json',
    },
    // data: params,
  });
}

/**
 * 更新用户（管理员）
 * @param params
 */
export async function updateUser(params: API.UserUpdateRequest) {
  return request<API.BaseResponse<boolean>>(`/api/user/update/` + params.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,

  });
}

/**
 * 更新用户（管理员）
 * @param params
 */
export async function updateLoginUser(params: API.UserUpdateRequest) {
  return request<API.BaseResponse<boolean>>(`/api/user/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 创建用户（管理员）
 * @param params
 */
export async function addUser(params: API.UserAddRequest) {
  return request<API.BaseResponse<number>>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}


/** 查询所有帖子 GET /api/notices */
export async function listPost(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.Post>>('/api/post/list', {
    method: 'GET',
    ...(options || {}),

  });
}

/** 查询所有帖子及发布者信息 GET /api/notices */
export async function listPostWithUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.PostWithUser>>('/api/post/listwithuser', {
    method: 'GET',
    ...(options || {}),

  });
}

/**
 * 删除帖子（管理员）
 * @param params
 */
export async function deletePost(params: API.PostDeleteRequest) {
  return request<API.BaseResponse<boolean>>(`/api/post/delete/` + params.id, {
    method: 'DELETE',
    // params: { ...params },
    headers: {
      'Content-Type': 'application/json',
    },
    // data: params,
  });
}

/**
 * 创建帖子
 * @param params
 */
export async function addPost(params: API.PostAddRequest) {
  return request<API.BaseResponse<number>>('/api/post/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
/**
 * 更新帖子
 * @param params
 */
export async function updatePost(params: API.PostUpdateRequest) {
  return request<API.BaseResponse<boolean>>(`/api/post/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
/**
 * 点赞 / 取消点赞
 * @param params
 */
export async function postDoThumb(params: API.PostDoThumbRequest) {
  return request<API.BaseResponse<number>>(`/api/post/thumb`, {
    method: 'POST',
    params: { ...params },
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}



/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),

  });
}


/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
