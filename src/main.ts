import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import pinia from '@/store'
import 'virtual:svg-icons-register'
import globeComponent from '@/components'
import ElementPlus from 'element-plus'
import '@/permission'

import 'bootstrap'
// import "../node_modules/bootstrap/scss/_modal.scss";
// import 'bootstrap/dist/css/bootstrap.min.css';

//@ts-expect-error-123
import zhCn from 'element-plus/dist/locale/zh-tw.mjs'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// import '@/styles/index.css'
// import '@/styles/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'
// import { Loader } from "@googlemaps/js-api-loader"

import 'leaflet/dist/leaflet.css'

const app = createApp(App)

const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY'
app.config.globalProperties.$googleMapsApiKey = googleMapsApiKey

app.use(globeComponent)
app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
