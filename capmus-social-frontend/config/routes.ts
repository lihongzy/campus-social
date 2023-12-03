export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: '注册',
        path: '/user/register',
        component: './user/Register',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/square',
    name: '校园广场',
    icon: 'smile',
    component: './Square/',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/user-mange',
        name: '用户管理',
        icon: 'smile',
        component: './Admin/UserMange',
      },
      {
        path: '/admin/post-mange',
        name: '帖子管理',
        icon: 'smile',
        component: './Admin/PostMange',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/square',
  },

  {
    name: '个人设置',
    icon: 'smile',
    path: '/accountsettings',
    component: './AccountSettings',
  },
  {
    component: './404',
  },
];
