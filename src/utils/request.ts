// 二次封裝axios
import axios from 'axios'
import useUserStore from '@/store/modules/user'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import router from '@/router'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 500000,
})

request.interceptors.request.use(
  (config) => {
    const tokenValue = GET_TOKEN()
    if (tokenValue) {
      config.headers['X-CSRF-TOKEN'] = tokenValue
      config.headers['X-XSRF-TOKEN'] = tokenValue
      config.headers['token'] = tokenValue
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    console.log('response-----------', response)
    if (response.status === 200) {
      if (response.config.url === '/login') {
        const cookieValue = document.cookie.replace(
          /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
          '$1',
        )
        SET_TOKEN(cookieValue)
      }

      return Promise.resolve(response)

      // return Promise.resolve(response)
    } else {
      // return Promise.reject({
      //   data: response.data,
      //   status: response.status,
      // })

      return Promise.resolve(response)
    }
  },
  (error) => {
    const userStore = useUserStore()
    let message = ''

    if (error.response) {
      const status = error.response.status

      switch (status) {
        // 401: 未登錄
        case 203:
          message = '服务异常'
          break // 403 token過期
        // 401: 未登錄
        case 401:
          userStore.userClear()
          router.push('/login')
          message = '未登錄'
          break // 403 token過期
        case 403:
          router.push('/login')
          userStore.userClear()
          message = '登錄過期，請重新登錄'
          break
        case 404:
          message = '網絡請求不存在'
          break
        case 500:
          message = '服務器出現問題'
          break
        default:
          message = error.response.data.message
          break
      }

      // ElMessage({
      //   type: 'error',
      //   message,
      // })

      return Promise.resolve(error)
    }
  },
)

export default request
