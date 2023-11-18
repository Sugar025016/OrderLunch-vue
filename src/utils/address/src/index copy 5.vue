<template>
  <div>
    <!-- <input v-model="address" placeholder="Enter address" />
    <button @click="geocodeAddress">Geocode</button> -->

    <!-- <GoogleMap
      api-key="AIzaSyDSmXXHL5GjsVDDSukChSmKlF3IPI93Mok"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="15"
    >
      <Marker v-if="center.lat && center.lng" :options="{ position: center }" />
    </GoogleMap> -->

    <!-- <el-form-item prop="city">
    <el-select
        v-model="a"
        class="m-2"
        placeholder="請選擇城市"
        size="large"
      >
        <el-option
          v-for="(item, index) in city"
          :key="index"
          :label="item"
          :value="item"
          :disabled="index === 0"
        />
        ：
      </el-select>
    </el-form-item> -->

    {{ mergedData }}
    <el-select v-model="a" class="m-2" placeholder="Select" size="large">
      <el-option v-for="item in city" :key="item" :label="item" :value="item" />
    </el-select>

    <el-select
      v-model="b"
      class="m-2"
      placeholder="請選擇區域"
      size="large"
      no-data-text="請先選擇城市"
      @change="clearArea()"
    >
      <el-option
        v-for="item in mergedData[a as keyof typeof mergedData]"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import cityAreas from '@/utils/areaData.js'
import addr from '@/utils/address.json'

// console.log("///////",addr.addr)
const a = ref('')

const b = ref('')
console.log(a.value)
var jsonData = addr.addr

const clearArea = () => {
  console.log('------------------', a.value)
  console.log('------------------', b.value)
} // 將 JSON 數據轉換為 JS 數據
var jsData = jsonData.map(function (entry) {
  return {
    郵遞區號: entry['郵遞區號'],
    縣市名稱: entry['縣市名稱'],
    鄉鎮市區: entry['鄉鎮市區'],
    原始路名: entry['原始路名'],
  }
})

// 合併相同的縣市名稱、鄉鎮市區並刪除投遞範圍
var mergedData = {}

jsData.forEach(function (entry) {
  var city = entry['縣市名稱']
  var district = entry['鄉鎮市區']
  var road = entry['原始路名']

  if (!mergedData[city]) {
    mergedData[city] = {}
  }

  if (!mergedData[city][district]) {
    mergedData[city][district] = []
  }

  if (!mergedData[city][district].includes(road)) {
    mergedData[city][district].push(road)
  }
})

console.log('///////////', mergedData)
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
}

#map {
  height: 100%;
}
</style>
