<template>
  <div>
    111111111111111111111111111
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

    <!-- {{ mergedData }}
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
    </el-select> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import cityAreas from '@/utils/areaData.js'
import addr from '@/utils/address.json'

// console.log("///////",addr.addr)
// const a = ref('')

// const b = ref('')

console.log('--------------1111111111111111------------------')
interface InputData {
  addr: {
    郵遞區號: string
    縣市名稱: string
    鄉鎮市區: string
    原始路名: string
    投遞範圍: string
  }[]
}

// 定義輸出 MergedData 的類型
interface MergedData {
  city: [
    {
      cityKey: number
      cityName: string
      area: [
        {
          areaKey: number
          areaName: string
          streets: [
            {
              streetKey: number
              streetName: string
            },
          ]
        },
      ]
    },
  ]
}
let a = 0
// 轉換 JSON 數據為 MergedData
function convertToMergedData(inputData: InputData): MergedData {
  // 使用物件來存儲合併後的數據
  const mergedData: MergedData = {
    city: [],
  }

  // 遍歷 JSON 數據
  inputData.addr.forEach((entry) => {
    // 查找是否已經存在這個城市
    const cityIndex = mergedData.city.findIndex(
      (city) => city.cityName === entry['縣市名稱'],
    )

    if (cityIndex === -1) {
      a++
      // 如果城市不存在，則創建一個新的城市對象
      const newCity = {
        cityKey: mergedData.city.length + 1,
        cityName: entry['縣市名稱'],
        area: [
          {
            areaKey: 1,
            areaName: entry['鄉鎮市區'],
            streets: [
              {
                streetKey: 1,
                streetName: entry['原始路名'],
              },
            ],
          },
        ],
      }
      // 添加到 mergedData 中
      mergedData.city.push(newCity)
    } else {
      // 如果城市已存在，查找是否已經存在這個區域
      const areaIndex = mergedData.city[cityIndex].area.findIndex(
        (area) => area.areaName === entry['鄉鎮市區'],
      )

      if (areaIndex === -1) {
        a++
        // 如果區域不存在，創建一個新的區域對象
        const newArea = {
          areaKey: mergedData.city[cityIndex].area.length + 1,
          areaName: entry['鄉鎮市區'],
          streets: [
            {
              streetKey: 1,
              streetName: entry['原始路名'],
            },
          ],
        }
        // 添加到 mergedData 中
        mergedData.city[cityIndex].area.push(newArea)
      } else {
        // 如果區域已存在，直接將街道添加到區域中
        // const newStreet = {
        //   streetKey: mergedData.city[cityIndex].area[areaIndex].streets.length + 1,
        //   streetName: entry["原始路名"],
        // };
        // // 添加到 mergedData 中
        // mergedData.city[cityIndex].area[areaIndex].streets.push(newStreet);

        const areaIndex = mergedData.city[cityIndex].area.findIndex(
          (area) => area.areaName === entry['鄉鎮市區'],
        )

        const streetsIndex = mergedData.city[cityIndex].area[
          areaIndex
        ].streets.findIndex(
          (streets) => streets.streetName === entry['原始路名'],
        )
        if (streetsIndex === -1) {
          a++

          const newStreet = {
            streetKey:
              mergedData.city[cityIndex].area[areaIndex].streets.length + 1,
            streetName: entry['原始路名'],
          }
          // 添加到 mergedData 中
          mergedData.city[cityIndex].area[areaIndex].streets.push(newStreet)
        }
      }
    }
  })

  console.log('//////////////', a)
  console.log(mergedData)
  return mergedData
}

// 測試轉換函數
const inputData: InputData = addr
const result: MergedData = convertToMergedData(inputData)
console.log(result)
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
