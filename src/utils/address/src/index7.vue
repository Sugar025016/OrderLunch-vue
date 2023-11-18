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
interface Entry {
  郵遞區號: string
  縣市名稱: string
  鄉鎮市區: string
  原始路名: string
}

interface MergedData {
  [city: string]: {
    [district: string]: [
      {
        streetKey: number
        streetName: string
      },
    ]
  }
}

// const jsonData: Entry[] =addr.addr

// 將 JSON 數據轉換為 JS 數據
// const jsData: Entry[] = jsonData.map(function (entry) {
//   return {
//     "郵遞區號": entry["郵遞區號"],
//     "縣市名稱": entry["縣市名稱"],
//     "鄉鎮市區": entry["鄉鎮市區"],
//     "原始路名": entry["原始路名"],
//   };
// });

// 合併相同的縣市名稱、鄉鎮市區並刪除投遞範圍
const mergedData: MergedData = {}

let c = 0
function mergeData(jsonData: Entry[]): MergedData {
  const jsData: Entry[] = jsonData.map(function (entry) {
    return {
      郵遞區號: entry.郵遞區號,
      縣市名稱: entry.縣市名稱,
      鄉鎮市區: entry.鄉鎮市區,
      原始路名: entry.原始路名,
    }
  })
  console.log(jsData)

  const mergedData: MergedData = {}

  jsData.forEach(function (entry) {
    const city = entry.縣市名稱
    const district = entry.鄉鎮市區
    const road = entry.原始路名
    // console.log(entry)
    if (!mergedData[city]) {
      mergedData[city] = {}
    }

    if (!mergedData[city][district]) {
      mergedData[city][district] = []
    }

    if (!mergedData[city][district].includes(road)) {
      const streetsIndex = mergedData[city][district].findIndex(
        (streets) => streets.streetName === entry['原始路名'],
      )
      if (streetsIndex === -1) {
        c++
        const newStreet1 = {
          streetKey: c,
          streetName: entry['原始路名'],
        }
        mergedData[city][district].push(newStreet1)
      }
    }
  })

  console.log(mergedData)
  return mergedData
}

const mergedResult: MergedData = mergeData(addr.addr)

console.log(mergedResult.value)
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
}

#map {
  height: 100%;
}
</style>

<!-- interface MergedData { cityName: string, area:{ areaName: string, street:[ ]} } -->
