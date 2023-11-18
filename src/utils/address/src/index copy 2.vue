<template>
  <div>
    <input v-model="address" placeholder="輸入地址" />
    <button @click="geocodeAddress">轉換座標</button>
    <GmapMap :center="center" :zoom="zoom">
      <GmapMarker :position="markerPosition" />
    </GmapMap>
  </div>
</template>

<script setup lang="ts">
// 在 setup 中引入 Google Maps API
import { ref, onMounted } from 'vue'

const googleMapApiKey = 'AIzaSyDSmXXHL5GjsVDDSukChSmKlF3IPI93Mok'
const map = ref(null)

onMounted(() => {
  // 使用 window 對象上的 google 屬性確認 Google Maps API 是否已經載入
  if (window.google) {
    initMap()
    geocodeAddress()
  } else {
    // 如果 google 對象未定義，等待 API 載入
    window.initGoogleMap = initMap
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&callback=initGoogleMap`
    script.defer = true
    script.async = true
    document.head.appendChild(script)
  }
})

const initMap = () => {
  // 在這裡使用 Google Maps API 初始化地圖
  // 這裡只是一個簡單的範例，你需要根據實際需求進行配置
  map.value = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 8,
  })
}

import { GoogleMap, Circle, Geocoder, gmapApi } from 'vue3-google-map'
// import { gmapApi } from 'vue-google-maps';

const address = ref('')
const center = ref({ lat: 0, lng: 0 })
const zoom = ref(10)
const markerPosition = ref({ lat: 0, lng: 0 })

const geocodeAddress = () => {
  const geocoder = new gmapApi.Geocoder()

  geocoder.geocode({ address: address.value }, (results, status) => {
    if (status === 'OK') {
      const location = results[0].geometry.location
      center.value = { lat: location.lat(), lng: location.lng() }
      markerPosition.value = { lat: location.lat(), lng: location.lng() }
      zoom.value = 15 // 設定放大級別
    } else {
      alert('地址轉換失敗')
    }
  })
}
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
}

#map {
  height: 100%;
}
</style>
