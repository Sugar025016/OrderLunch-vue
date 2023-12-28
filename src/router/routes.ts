export const constantRoute = [
  {
    path: '/',
    component: () => import('@/views/buy/index.vue'),
    name: 'home',
    meta: {
      title: 'buy',
      hidden: false,
      icon: '',
      mustToken: false,
    },
    redirect: '/BuyShops',
    children: [
      {
        path: '/BuyShops',
        component: () => import('@/components/Buy/BuyShops/src/index.vue'),
        name: 'BuyShops',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: false,
        },
      },
      {
        path: '/BuyMember',
        component: () => import('@/components/Buy/BuyMember/src/index.vue'),
        meta: {
          title: 'BuyMember',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
        redirect: '/BuyMember/profile/:number',
        children: [
          {
            path: '/BuyMember/profile/:number',
            name: 'profile',
            component: () =>
              import('@/components/Buy/BuyMember/src/profile/index.vue'),
            meta: {
              title: 'profile',
              hidden: false,
              icon: 'HomeFilled',
              mustToken: true,
            },
          },
          {
            path: 'changeProfile/:number',
            name: 'changeProfile',
            component: () =>
              import('@/components/Buy/BuyMember/src/changeProfile/index.vue'),
            meta: {
              title: 'changeProfile',
              hidden: false,
              icon: 'HomeFilled',
              mustToken: true,
            },
          },
          {
            path: 'changeCompany/:number',
            name: 'changeCompany',
            component: () =>
              import('@/components/Buy/BuyMember/src/changeCompany/index.vue'),
            meta: {
              title: 'changeCompany',
              hidden: false,
              icon: 'HomeFilled',
              mustToken: true,
            },
          },
          {
            path: 'changePassword/:number',
            name: 'changePassword',
            component: () =>
              import('@/components/Buy/BuyMember/src/changePassword/index.vue'),
            meta: {
              title: 'changePassword',
              hidden: false,
              icon: 'HomeFilled',
              mustToken: true,
            },
          },
          {
            path: 'love/:number',
            name: 'love',
            component: () =>
              import('@/components/Buy/BuyMember/src/love/index.vue'),
            meta: {
              title: 'love',
              hidden: false,
              icon: 'HomeFilled',
              mustToken: true,
            },
          },
          {
            path: 'recommend/:number',
            name: 'recommend',
            component: () =>
              import('@/components/Buy/BuyMember/src/recommend/index.vue'),
            meta: {
              title: 'recommend',
              hidden: false,
              icon: 'HomeFilled',
              mustToken: true,
            },
          },
        ],
      },
      {
        path: 'BuyOrder',
        name: 'BuyOrder',
        component: () => import('@/components/Buy/BuyOrder/src/index.vue'),
        meta: {
          title: 'BuyOrder',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
      {
        path: 'BuyShop/:id',
        name: 'BuyShop',
        component: () => import('@/components/Buy/BuyShop/src/index.vue'),
        meta: {
          title: 'BuyShop',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: false,
        },
      },
      {
        path: 'BuyShopCart',
        name: 'BuyShopCart',
        component: () => import('@/components/Buy/BuyShopCart/src/index.vue'),
        meta: {
          title: 'BuyShopCart',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
      {
        path: 'BuyCheck',
        name: 'BuyCheck',
        component: () => import('@/components/Buy/BuyCheck/src/index.vue'),
        meta: {
          title: 'BuyCheck',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
    ],
  },
  {
    path: '/Login',
    component: () => import('@/views/loginRegister/index.vue'),
    meta: {
      title: 'loginRegister',
      hidden: false,
      icon: 'HomeFilled',
      mustToken: false,
    },
    redirect: '/Login',
    children: [
      {
        path: '/Login',
        component: () => import('@/components/Login/src/index.vue'),
        meta: {
          title: 'Login',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: false,
        },
      },
      {
        path: 'forgetPassword',
        component: () => import('@/components/ForgotPassword/src/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: false,
        },
      },
    ],
  },
  {
    path: '/Register',
    component: () => import('@/views/loginRegister/index.vue'),
    meta: {
      title: 'loginRegister',
      hidden: false,
      icon: 'HomeFilled',
      mustToken: false,
    },
    redirect: '/Register/member',
    children: [
      {
        path: 'member',
        component: () => import('@/components/Register/src/member/index.vue'),
        meta: {
          title: '註冊帳號',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: false,
        },
      },
      {
        path: 'shop',
        component: () => import('@/components/Register/src/shop/index.vue'),
        meta: {
          title: '註冊餐廳',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: false,
        },
      },
    ],
  },
  {
    path: '/Backstage',
    component: () => import('@/views/backstage/index.vue'),
    meta: {
      title: '後台',
      hidden: false,
      icon: 'HomeFilled',
      mustToken: true,
    },
    redirect: '/Backstage/shops',
    children: [
      {
        path: '/Backstage/shops',
        component: () =>
          import('@/components/Backstage/BackstageShops/src/index.vue'),
        meta: {
          title: 'Shops',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
      {
        path: '/Backstage/users',
        component: () =>
          import('@/components/Backstage/BackstageUser/src/index.vue'),
        meta: {
          title: 'users',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
      {
        path: 'product',
        component: () =>
          import('@/components/Backstage/BackstageProduct/src/index.vue'),
        meta: {
          title: 'product',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
      {
        path: 'category',
        component: () =>
          import('@/components/Backstage/BackstageCategory/src/index.vue'),
        meta: {
          title: 'ategory',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
    ],
  },

  {
    path: '/map',
    component: () => import('@/components/Map/src/index.vue'),
    meta: {
      title: '已完成訂單',
      hidden: false,
      icon: 'HomeFilled',
      mustToken: false,
    },
  },
  // {
  //   path: '/sell',
  //   component: () => import('@/views/sell/index.vue'),
  //   meta: {
  //     title: '餐廳設定',
  //     hidden: false,
  //     icon: 'HomeFilled',
  //     mustToken: false,
  //   },
  //   redirect: '/sell/Shop/:id',
  //   children: [
  //     {
  //       path: '/sell/Shop/:id',
  //       component: () => import('@/components/Sell/SellShop/src/Shop/src/index.vue'),
  //       meta: {
  //         title: 'Register',
  //         hidden: false,
  //         icon: 'HomeFilled',
  //         mustToken: false,
  //         id: 0,
  //       },
  //       // children: [
  //       //   {
  //       //     path: '/sell/Shop/:id',
  //       //     component: () => import('@/components/Sell/SellShop/src/Shop/src/index.vue'),
  //       //     meta: {
  //       //       title: 'Register',
  //       //       hidden: false,
  //       //       icon: 'HomeFilled',
  //       //       mustToken: false,
  //       //     },
  //       //   },
  //       // ],
  //     },

  //     {
  //       path: '/sell/product/:id',
  //       component: () => import('@/components/Sell/SellProduct/src/index.vue'),
  //       meta: {
  //         title: 'Register',
  //         hidden: false,
  //         icon: 'HomeFilled',
  //         mustToken: false,
  //       },

  //     },
  //     {
  //       path: '/sell/shop',
  //       component: () => import('@/components/Sell/SellShop/src/index.vue'),
  //       meta: {
  //         title: 'Register',
  //         hidden: false,
  //         icon: 'HomeFilled',
  //         mustToken: false,
  //       },
  //     },
  //   ],
  // },
]

export const sellShop = [
  {
    path: '/sell/:shopId',
    component: () => import('@/views/sell/index.vue'),
    meta: {
      title: '餐廳設定',
      hidden: false,
      icon: 'HomeFilled',
      mustToken: false,
      shopId: 0,
    },
    redirect: '/sell/:shopId/Shop',
    children: [
      {
        path: 'Shop',
        component: () =>
          import('@/components/Sell/SellShop/src/Shop/src/index.vue'),
        meta: {
          title: '商店編輯',
          hidden: false,
          icon: 'shopEdit',
          mustToken: false,
          id: 0,
        },
      },
      {
        path: 'product',
        component: () => import('@/components/Sell/SellProduct/index.vue'),
        meta: {
          title: '餐點編輯',
          hidden: false,
          icon: 'foodAdd',
          mustToken: false,
          id: 0,
        },
      },
      {
        path: 'orderNew',
        component: () => import('@/components/Sell/SellOrderNew/index.vue'),
        meta: {
          title: '新訂單',
          hidden: false,
          icon: 'order',
          mustToken: false,
        },
      },
      {
        path: 'orderHandle',
        component: () => import('@/components/Sell/SellOrderHandle/index.vue'),
        meta: {
          title: '待處理訂單',
          hidden: false,
          icon: 'order',
          mustToken: false,
        },
      },
      {
        path: 'orderFinish',
        component: () => import('@/components/Sell/SellOrderFinish/index.vue'),
        meta: {
          title: '已完成訂單',
          hidden: false,
          icon: 'order',
          mustToken: false,
        },
      },
    ],
  },
]

export const asyncRoute = [
  {
    path: '/Register',
    component: () => import('@/views/backstage/index.vue'),
    meta: {
      title: '後台',
      hidden: false,
      icon: 'HomeFilled',
      mustToken: true,
    },
    redirect: '/Register/member',
    children: [
      {
        path: 'member',
        component: () =>
          import('@/components/Backstage/BackstageShops/src/index.vue'),
        meta: {
          title: 'Shops',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
      {
        path: 'shop',
        component: () =>
          import('@/components/Backstage/BackstageUser/src/index.vue'),
        meta: {
          title: 'users',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
      {
        path: 'category',
        component: () =>
          import('@/components/Backstage/BackstageCategory/src/index.vue'),
        meta: {
          title: 'ategory',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
    ],
  },
]

export const menuRoutes = [
  {
    path: '/Backstage/shops',
    component: () => import('@/views/backstage/index.vue'),
    meta: {
      title: '後台',
      hidden: false,
      icon: 'HomeFilled',
      mustToken: true,
    },
    redirect: 'shops',
    children: [
      {
        path: 'shops',
        component: () =>
          import('@/components/Backstage/BackstageShops/src/index.vue'),
        meta: {
          title: 'Shops',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
      {
        path: 'users',
        component: () =>
          import('@/components/Backstage/BackstageUser/src/index.vue'),
        meta: {
          title: 'Users',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
      {
        path: 'product',
        component: () =>
          import('@/components/Backstage/BackstageProduct/src/index.vue'),
        meta: {
          title: 'Product',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
      {
        path: 'category',
        component: () =>
          import('@/components/Backstage/BackstageCategory/src/index.vue'),
        meta: {
          title: 'Category',
          hidden: false,
          icon: 'HomeFilled',
          mustToken: true,
        },
      },
    ],
  },
]

export const menuSellRoutes = [
  {
    path: '/sell/shop/:shopId',
    component: () =>
      import('@/components/Sell/SellShop/src/Shop/src/index.vue'),
    meta: {
      title: '編輯商店',
      hidden: false,
      icon: 'shopEdit',
      mustToken: true,
      shopId: 0,
    },
  },
  {
    path: '/sell/product/:shopId',
    component: () => import('@/components/Sell/SellProduct/index.vue'),
    meta: {
      title: '編輯商品',
      hidden: false,
      icon: 'productEdit',
      mustToken: true,
      shopId: 0,
    },
  },
]
export const anyRoute = {
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/404/index.vue'),
  name: '404',
  meta: {
    title: '404',
    hidden: true,
  },
}
