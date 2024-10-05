
import pinia from './store'
import router from '@/router'
import setting from './setting'
//@ts-expect-error-去錯誤訊息
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import useSellShopStore from './store/modules/sellShop'
import { useRouter } from 'vue-router'
// import Loading from 'vue-loading-overlay'
// import 'vue-loading-overlay/dist/css/index.css'
import  useLoadingStore  from '@/store/modules/loading';




nprogress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)
const loadingStore = useLoadingStore()
let $router = useRouter()
// 全域前置守衛

async function loadDynamicRoutes() {
  console.log('-------------')
  const token = await userStore.token
  if (token && !userStore.username) {
    try {
      console.log('000000000')
      await userStore.userInfo()
    } catch (error) {
      await userStore.userClear()
    }

    console.log('44444444444')
  }
}
await loadDynamicRoutes()
router.beforeEach(async (to, from, next) => {
  const shopStore = useSellShopStore(pinia)
  nprogress.start()
  loadingStore.startLoading()
  console.log('5555555555', router.getRoutes())
  // console.log("5555555555-$router",$router.getRoutes())
  document.title = to.meta.title + ` | ${setting.title}`
  document.title = `${setting.title}`
  const token = userStore.token
  if (to.meta.mustToken) {
    if (token) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      if (to.path == '/login') {
        next()
      } else {
        next({ path: '/login', query: { redirect: to.path } })
      }
    }
  } else if (to.path === '/login' && token) {
    next({ path: '/' })
  } else {
    console.log('66666666666', router.getRoutes())
    next()
  }
})
// 全域後置守衛

router.afterEach((route) => {
  nprogress.done()
  loadingStore.stopLoading()
})
