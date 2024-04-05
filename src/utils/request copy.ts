// // 二次封裝axios
// import axios from 'axios'
// import { ElMessage } from 'element-plus/lib/components/index.js'
// import useUserStore from '@/store/modules/user'
// import { SET_TOKEN } from '@/utils/token'
// import router from '@/router'

// const request = axios.create({
//   baseURL: import.meta.env.VITE_APP_BASE_API,
//   timeout: 5000,
// })

// // axios.interceptors.request.use(function (config) {
// //   const userStore = useUserStore()
// //   const token = userStore.token;
// //   config.headers.Authorization =  token;

// //   return config;
// // });

// // import VueCookies from 'vue-cookies'

// function getXsrfTokenFromCookie(cookieString: string) {
//   // 将Cookie字符串拆分成单个Cookie键值对
//   const cookies = cookieString.split(';');

//   // 遍历每个Cookie键值对，查找XSRF-TOKEN
//   for (const cookie of cookies) {
//     // 将键值对拆分成键和值
//     const [name, value] = cookie.trim().split('=');

//     // 如果找到XSRF-TOKEN，返回其值
//     if (name === 'XSRF-TOKEN') {
//       return value;
//     }
//   }

//   // 如果未找到XSRF-TOKEN，返回null或抛出错误，具体取决于您的需求
//   return null;
// }

// // request.interceptors.request.use(
// //   (config) => {
// //     const userStore = useUserStore()
// //     console.log("userStore.token ///////////**********",userStore.token );
// //     if (userStore.token) {
// //       const xsrfToken = userStore.token // 从某个地方获取XSRF令牌
// //       if (xsrfToken) {
// //           config.headers['X-Xsrf-Token'] = xsrfToken;
// //       console.log("config.headers ************************** ///////////**********",config.headers );
// //       }
// //       config.headers.token = userStore.token
// //       // config.headers. = userStore.token
// //       // const token = userStore.getState().session.token;
// //       config.headers.Authorization =  userStore.token;
// //       console.log("config.headers.token ///////////**********",config.headers.token );
// //     }

// //     return config
// //   },
// //   (error) => {
// //     return Promise.reject(error)
// //   },
// // )

// request.interceptors.response.use(
//   (response) => {
//     if (response.status === 200) {
//       if (response.config.url === '/login') {


//         // SET_TOKEN(response.config.headers['X-XSRF-TOKEN'])
//         // userStore.token=response.config.headers['X-XSRF-TOKEN'];

//         // const xsrfToken = getXsrfTokenFromCookie(cookieString);
//         console.log("response.config.headers['Set-Cookie']------------", response);
//         console.log("response.config.headers['Set-Cookie']------------", response.config);
//         console.log("response.config.headers['Set-Cookie']------------", response.headers);
//         console.log("cookieSet-Cookie']------------", response.headers['set-cookie']);

//         VueCookies.set('name' , name, "1h") 
//         // const setCookieHeaders = response.headers.getAll('Set-Cookie');
//         // const setCookieHeaders = response.headers.get('Set-Cookie')
//         setCookieHeaders.forEach((cookieHeader: any) => {
//           console.log(cookieHeader); // 这里处理每个 Set-Cookie 值
//         });

//         // console.log("response.config.headers['Cookie']------------", response.config.headers['Cookie']);
//         axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
//         axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
//         // const xsrfToken = getXsrfTokenFromCookie(response.config.headers['Cookie']);

//         // console.log("xsrfToken------------", xsrfToken)
//         // if (xsrfToken) {
//         //   SET_TOKEN(xsrfToken)

//         // }

//       }

//       return Promise.resolve(response);
//       // return Promise.resolve(response)
//     } else {
//       return Promise.reject({
//         data: response.data,
//         code: response.status,
//       })
//     }
//   },
//   (error) => {
//     const userStore = useUserStore()
//     let message = ''

//     if (error.response) {
//       const status = error.response.status

//       switch (status) {
//         // 401: 未登錄
//         case 203:
//           message = '服务异常'
//           break // 403 token過期
//         // 401: 未登錄
//         case 401:
//           userStore.userClear()
//           router.push('/login')
//           message = '未登錄'
//           break // 403 token過期
//         case 403:
//           router.push('/login')
//           userStore.userClear()
//           message = '登錄過期，請重新登錄'
//           break
//         case 404:
//           message = '網絡請求不存在'
//           break
//         case 500:
//           message = '服務器出現問題'
//           break
//         default:
//           message = error.response.data.message
//           break
//       }
//       ElMessage({
//         type: 'error',
//         message,
//       })
//       alert(message) //錯誤彈窗，可以用ant模板代替
//       return Promise.resolve({
//         data: error.response.data.errors,
//         code: error.response.status,
//       })
//     }
//   },
// )

// export default request
