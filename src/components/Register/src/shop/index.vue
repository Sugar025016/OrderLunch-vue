<script setup lang="ts">
import { ref } from 'vue'
import address from '@/utils/address.js'
import { Address } from '@/api/type'

const checked1 = ref(true)

let selectedOption1 = ref(-1)
let selectedOption2 = ref(-1)
let selectedOption3 = ref(-1)

let data: Address = {
  city: '',
  area: '',
  detail: '',
  street: '',
}
const changeCity = () => {
  data.area = ''
  data.street = ''
  selectedOption2.value = -1
  selectedOption3.value = -1

  data.city =
    selectedOption1.value < 0
      ? undefined
      : address[selectedOption1.value].cityName
  console.log(selectedOption1.value)
  console.log(
    'address[selectedOption1.value].cityName',
    address[selectedOption1.value].areas,
  )
  getC1()
}

const changeArea = () => {
  data.street = ''
  selectedOption3.value = -1
  data.area =
    selectedOption2.value < 0
      ? undefined
      : address[selectedOption1.value].areas[selectedOption2.value].areaName

  getC1()
}

const changeStreet = () => {
  data.area =
    selectedOption3.value < 0
      ? undefined
      : address[selectedOption1.value].areas[selectedOption2.value].streets[
          selectedOption3.value
        ].streetName
  getC1()
}
const getC1 = async () => {
  // shopStore.shopSearch = data
  // shopStore.shopArr.clear()
  // await shopStore.getShopPage()
}
</script>
<template>
  <div class="register-member">
    <div class="table">
      <span class="table-title">註冊餐廳</span>
      <div class="table-content">
        <label>餐廳名稱</label>
        <input type="text" class="rounded-input" placeholder="帳號" />
      </div>
      <div class="table-content">
        <label>餐廳電話</label>
        <input type="text" class="rounded-input" placeholder="输入文本" />
      </div>
      <div class="table-content">
        <label>餐廳介紹</label>
        <input type="text" class="rounded-input" placeholder="输入文本" />
      </div>
      <div class="table-content">
        <label>餐廳地址</label>
        <div class="address">
          <div class="form-item">
            <div class="custom-select-wrapper">
              <select
                class="custom-select"
                v-model="selectedOption1"
                @change="changeCity"
              >
                <option selected value="-1">縣市</option>
                <option
                  v-for="(item, index) in address"
                  :key="index"
                  :label="item.cityName"
                  :value="index"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-item">
            <div class="custom-select-wrapper">
              <select
                class="custom-select area"
                :disabled="selectedOption1 < 0"
                v-model="selectedOption2"
                @change="changeArea"
              >
                <option selected value="-1">鄉鎮[市]區</option>
                <option
                  v-if="selectedOption1 > -1"
                  v-for="(area, index) in address[selectedOption1].areas"
                  :key="area.areaName"
                  :value="index"
                  :label="area.areaName"
                >
                  {{ area }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-item item-grid">
            <div class="custom-select-wrapper">
              <select
                class="custom-select area"
                :disabled="selectedOption2 < 0"
                v-model="selectedOption3"
                @change="changeStreet"
              >
                <option selected value="-1">路(街)名或鄉里名稱</option>
                <option
                  v-if="selectedOption2 > -1"
                  v-for="(street, index) in address[selectedOption1].areas[
                    selectedOption2
                  ].streets"
                  :key="street.streetName"
                  :value="index"
                  :label="street.streetName"
                >
                  {{ street }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-item item-grid">
            <input type="text" class="rounded-input" placeholder="詳細地址" />
          </div>
        </div>
      </div>
      <el-checkbox v-model="checked1" label="Option 1" size="large" />
      <el-button size="large" round>確認</el-button>
      <a></a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-member {
  display: flex;
  // align-items:center;
  justify-content: center;
  flex-direction: column;
  // background-color: aquamarine;

  .title {
    margin: 0 auto;
    vertical-align: middle;
    font-size: 35px;
    color: $color;
    font-weight: 700;
  }

  .table {
    margin: 20px auto;
    min-width: 350px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    .table-title {
      margin: 20px auto;
      vertical-align: middle;
      font-size: 36px;
      color: rgb(80, 80, 80);
      font-weight: 700;
    }
    .table-content {
      display: flex;
      flex-direction: column;
      margin: 0 0 15px 0;

      .rounded-input {
        border: 1px solid #ccc;
        border-radius: 20px;
        margin-bottom: 10px;
        padding: 8px 16px;
        height: 40px;

        background-color: white;
      }
      label {
        margin: 5px;
      }
    }
    button {
      // display: block;
      display: flex;
      background-color: $color;
      width: 100%;
      color: white;
    }
    .custom-select-wrapper {
      width: 100%;
      position: relative;
      right: 0;
      left: 0;
      select::-ms-expand {
        display: none;
      }
      .custom-select {
        width: 100%;
        height: 40px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: transparent;
        border: 1px solid $border;
        border-radius: 50px;
        padding: 8px 16px;
        font-size: 16px;
        font-weight: 500;
        color: $font;
        outline: none;
        cursor: pointer; /* 預設游標樣式 */
        // background-color: rgb(255, 255, 255);
        z-index: 2;
        background: url('@/assets/icons/expand.png') no-repeat;
        background-size: 20px;
        background-position: right 10px center;
        background-color: white;
      }

      .custom-select:hover {
        border: 1px solid $color;
      }

      /* 禁用時游標變換成禁止圖示 */
      .custom-select:disabled {
        // color: #999;
        color: #777777;
        cursor: not-allowed;
      }
    }
    .address {
      display: grid;
      grid-template-columns: 12fr 12fr;
      grid-column-gap: 10px;
      .form-item {
        margin: 0 0 10px 0;
        .rounded-input {
          border: 1px solid #ccc;
          border-radius: 20px;
          margin-bottom: 0;
          width: auto;
          min-width: 350px;
        }
      }
      .item-grid {
        grid-column: span 2;
      }
    }
  }
  .register {
    margin: auto;
  }
  .social-media {
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    min-width: 350px;
  }
}
</style>
