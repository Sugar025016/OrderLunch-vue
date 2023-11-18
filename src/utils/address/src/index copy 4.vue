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

const clearArea = () => {
  console.log('------------------', a.value)
  console.log('------------------', b.value)
}

function mergeEntries(data) {
  var mergedData = {}

  data.forEach(function (entry) {
    var key = entry['縣市名稱'] + entry['鄉鎮市區']

    if (!mergedData[key]) {
      mergedData[key] = {
        郵遞區號: entry['郵遞區號'],
        縣市名稱: entry['縣市名稱'],
        鄉鎮市區: entry['鄉鎮市區'],
        原始路名: [entry['原始路名']], // 將原始路名初始化為一個陣列
      }
    } else {
      // 將原始路名添加到陣列中
      if (!mergedData[key]['原始路名'].includes(entry['原始路名'])) {
        mergedData[key]['原始路名'].push(entry['原始路名'])
      }
    }
  })

  // Convert the merged data object to an array
  var mergedArray = Object.values(mergedData)

  return mergedArray
}

var mergedResult = mergeEntries(addr.addr)

console.log(mergedResult)

// 將 JSON 數據轉換為 JS 數據
// var jsData = jsonData.map(function(entry) {
//     return {
//         "郵遞區號": entry["郵遞區號"],
//         "縣市名稱": entry["縣市名稱"],
//         "鄉鎮市區": entry["鄉鎮市區"],
//         "原始路名": entry["原始路名"]
//     };
// });

// 合併相同的縣市名稱、鄉鎮市區並刪除投遞範圍
var mergedData = {}

mergedResult.forEach(function (entry) {
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

console.log(mergedData)

var cities = Object.keys(mergedData)

const city: string[] = Object.keys(mergedData)
// const city: string[] = Object.keys(mergedData)

// 輸出結果
console.log(cities)

////////////////////////////////////////////////////////////////

// function mergeEntries2(data) {
//     var mergedData = {};

//     data.forEach(function(entry) {
//         var key = entry["縣市名稱"];

//         if (!mergedData[key]) {
//             mergedData[key] = {
//                 "郵遞區號": entry["郵遞區號"],
//                 "縣市名稱": entry["縣市名稱"],
//                 "鄉鎮市區": [entry["鄉鎮市區"]],
//                 "原始路名": entry["原始路名"] // 將原始路名初始化為一個陣列
//             };
//         } else {
//             // 將原始路名添加到陣列中
//             if (!mergedData[key]["鄉鎮市區"].includes(entry["鄉鎮市區"])) {
//                 mergedData[key]["鄉鎮市區"].push(entry["鄉鎮市區"]);

//             }
//         }
//     });

//     // Convert the merged data object to an array
//     var mergedArray = Object.values(mergedData);

//     return mergedArray;
// }

// var mergedResult2 = mergeEntries2(mergedResult);

// console.log(mergedResult2)

//////////////////////////////////////////////////////////////////////

// Function to merge entries with the same "鄉鎮市區"
// function mergeEntriesByTown(data) {
//     var mergedData = {};

//     data.forEach(function (entry) {
//         var key = entry["鄉鎮市區"];

//         if (!mergedData[key]) {
//             mergedData[key] = {
//                 "鄉鎮市區": entry["鄉鎮市區"],
//                 "合併條目": [{
//                     "郵遞區號": entry["郵遞區號"],
//                     "原始路名": entry["原始路名"],
//                     "縣市名稱": entry["縣市名稱"]
//                 }]
//             };
//         } else {
//             mergedData[key]["合併條目"].push({
//                 "郵遞區號": entry["郵遞區號"],
//                 "原始路名": entry["原始路名"],
//                 "縣市名稱": entry["縣市名稱"]
//             });
//         }
//     });

//     // Convert the merged data object to an array
//     var mergedArray = Object.values(mergedData);

//     return mergedArray;
// }

// // Call the mergeEntriesByTown function with your JSON data
// var mergedByTown = mergeEntriesByTown(addr.addr);

// console.log(mergedByTown);
// // Function to merge entries with the same "縣市名稱"
// function mergeEntriesByCity(data) {
//     var mergedData = {};

//     data.forEach(function (entry) {
//         var key = entry["縣市名稱"];

//         if (!mergedData[key]) {
//             mergedData[key] = {
//                 "縣市名稱": entry["縣市名稱"],
//                 "合併條目": entry["合併條目"]
//             };
//         } else {
//             mergedData[key]["合併條目"] = mergedData[key]["合併條目"].concat(entry["合併條目"]);
//         }
//     });

//     // Convert the merged data object to an array
//     var mergedArray = Object.values(mergedData);

//     return mergedArray;
// }

// // Call the mergeEntriesByCity function with the result from the previous step
// var mergedResult = mergeEntriesByCity(mergedByTown);

// // Output the final merged result
// console.log(mergedResult);

// const center = reactive({ lat: 40.689247, lng: -74.044502 })

// const address = ref('');

// const geocodeAddress = async () => {
//   try {
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//         address.value
//       )}&key=AIzaSyDSmXXHL5GjsVDDSukChSmKlF3IPI93Mok`
//     );
//     const data = await response.json();

//     if (data.results.length > 0) {
//       const location = data.results[0].geometry.location;
//       center.lat = location.lat;
//       center.lng = location.lng;
//     } else {
//       alert('Address not found!');
//     }
//   } catch (error) {
//     console.error('Error geocoding address:', error);
//   }
// };
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
}

#map {
  height: 100%;
}
</style>
