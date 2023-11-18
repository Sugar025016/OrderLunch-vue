<template>
  <div>
    <input v-model="address" placeholder="Enter address" />
    <button @click="geocodeAddress">Geocode</button>
    <div id="map" style="height: 800px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet/'

const address = ref('台南')
let map: any

onMounted(() => {
  map = L.map('map').setView([0, 0], 2)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  }).addTo(map)
})
address.value = '台南市永康區復國二路46號'

const geocodeAddress = async () => {
  console.log('address', address.value)
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${address.value}&format=json`,
  )
  const data = await response.json()

  if (data.length > 0) {
    const { lat, lon } = data[0]
    map.setView([lat, lon], 13)
    L.marker([lat, lon]).addTo(map).bindPopup(address.value).openPopup()
  } else {
    alert('Address not found!')
  }
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 1000px;
}
.a {
  background-color: rgb(0, 255, 179);
  width: 100%;
  height: 1000px;
}
</style>
