// @ts-ignore
/* eslint-disable */

declare namespace API {
  /**
   * 用户类
   */
  type CurrentUser = {
    id?: number;
    username?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    age?: number,
    grade?: string,
    colleage?: string,
    major?: string,
    interest?: string,
    contactinfo?: string,
    userStatus?: number;
    userRole?: number;
    phone?: string;
    createTime?: Date;
    updateTime?: Date;

  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterResult = number;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  /**
   * 通用返回类
   */
  type BaseResponse<T> = {
    code: number,
    data: T,
    message: string,
    description: string,
  }

  /**
   * 用户删除请求
   */
  interface UserDeleteRequest {
    id: number;
  }

  /**
   * 用户更新请求
   */
  interface UserUpdateRequest {
    id: number;
    username?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    userRole?: number;
  }

  /**
   * 用户创建请求
   */
  interface UserAddRequest {
    username: string;
    userAccount: string;
    avatarUrl?: string;
    userRole: number;
  }

  /**
   * 帖子类
   */
  type Post = {
    id: number;
    content: string;
    photo: string;
    reviewStatus: number;
    reviewMessage?: string;
    viewNum: number;
    thumbNum: number;
    userId: number;
    createTime: Date;
    updateTime: Date;
  }

  /**
   * 帖子和用户类
   */
  type PostWithUser = {
    id: number;
    content: string;
    photo: string;
    reviewStatus: number;
    reviewMessage?: string;
    viewNum: number;
    thumbNum: number;
    userId: number;
    createTime: Date;
    updateTime: Date;
    user: CurrentUser;
    hasThumb: boolean;

  }

  /**
   * 帖子删除请求
   */
  interface PostDeleteRequest {
    id: number;
  }
  /**
   * 帖子创建请求
   */
  interface PostAddRequest {
    content: string;
    photo: string;
    userId: number;
  }
  /**
   * 帖子更新请求
   */
  type PostUpdateRequest = {
    id: number;
    content?: string;
    photo?: string;
    reviewStatus?: number;
    reviewMessage?: string;
    viewNum?: number;
    thumbNum?: number;
    userId?: number;
    createTime?: Date;
    updateTime?: Date;
  }

  /**
   * 帖子点赞请求
   */
  interface PostDoThumbRequest {
    postId: number;
  }

  /**
   * 视图
   */
  interface PostVO extends PostWithUser {
    hasThumb: boolean;
  }



  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
