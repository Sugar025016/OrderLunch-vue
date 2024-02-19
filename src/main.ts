import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import pinia from '@/store'
import 'virtual:svg-icons-register'
import globeComponent from '@/components'
import ElementPlus from 'element-plus'
import '@/permission'

import 'bootstrap'

//@ts-expect-error-123
import zhCn from 'element-plus/dist/locale/zh-tw.mjs'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import '@/styles/index.scss'

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
