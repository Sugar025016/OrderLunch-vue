<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { apiGetCart } from '@/api/cart'
import { CartResponseData, CartsData } from '@/api/cart/type'
import useUserStore from '@/store/modules/user'
import cityAreas from '@/utils/areaData.js'
import { Address } from '@/api/user/type'
import { Schedule, Schedules, TimePeriod, TimePeriods } from '@/api/shop/type'

const city: string[] = Object.keys(cityAreas)

const formSize = ref('default')

let address = reactive<Address>({
  id: 0,
  city: '',
  area: '',
  detail: '',
})

let userStore = useUserStore()

let $router = useRouter()

const sum = ref(0)

const carts = ref<CartsData>({
  shopName: '',
  orderable: false,
  cartResponses: [],
  schedules: [],
})

const link = () => {
  if (carts.value.shopId) {
    $router.push('/BuyShop/' + carts.value.shopId)
  } else {
    $router.push('/')
  }
}
// const dateOptions = ref<MyDate[]>([])

const dateOptions = ref<MyDateDisabled[]>([])

const date = ref(0)
const selectedDate = ref<MyDateDisabled>({
  year: 0,
  month: 0,
  date: 0,
  show: '',
  week: 0,
  disabled: false,
  schedule: {
    week: 0,
    timePeriods: [],
  },
  times: [],
})

const textarea = ref('')

// 计算日期选项
const startOptionDay = new Date()
const oneWeekLater = new Date()
oneWeekLater.setDate(startOptionDay.getDate() + 7)

const selectedTime = ref<string | null>(null)

const availableTimes = (date: number, timePeriods: TimePeriods) => {
  const times: string[] = []

  timePeriods?.forEach((v: TimePeriod) => {
    const [startHours, startMinutes] = v.startTime.split(':').map(Number)

    if (v.endTime === '00:00') {
      v.endTime = '24:00'
    }
    const [endHours, endMinutes] = v.endTime.split(':').map(Number)

    const startTime1 = new Date()
    const endTime1 = new Date()

    //設定當天可訂購時間
    if (startOptionDay.getDate() === date) {
      const nowTime = new Date()
      const nowHours = nowTime.getHours() + 1
      const nowMinutes = Math.ceil(nowTime.getMinutes() / 10) * 10
      const startMinutesAll = startHours * 60 + startMinutes
      const endMinutesAll = endHours * 60 + endMinutes
      const nowMinutesAll = nowHours * 60 + nowMinutes
      if (nowMinutesAll <= startMinutesAll) {
        startTime1.setHours(startHours, startMinutes, 0, 0)
        endTime1.setHours(endHours, endMinutes, 0, 0)
      } else if (nowMinutesAll <= endMinutesAll) {
        startTime1.setHours(nowHours, nowMinutes, 0, 0)
        endTime1.setHours(endHours, endMinutes, 0, 0)
      } else {
        startTime1.setHours(24, 0, 0, 0)
        endTime1.setHours(23, 0, 0, 0)
      }
    } else {
      startTime1.setHours(startHours, startMinutes, 0, 0)
      endTime1.setHours(endHours, endMinutes, 0, 0)
    }

    const interval = 10 * 60 * 1000 // 10分
    let currentTime1 = startTime1.getTime()
    while (currentTime1 <= endTime1.getTime()) {
      const time = new Date(currentTime1)
      times.push(formatTime(time))
      currentTime1 += interval
    }
  })

  return times
    .filter((item) => item !== '00:00')
    .sort()
    .concat('24:00') // Array.from(new Set(times)).sort()
}

// 辅助函数，将时间格式化为HH:mm字符串
function formatTime(time: Date) {
  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

type MyDateDisabled = {
  year: number
  month: number
  date: number
  show: string
  week: number
  disabled: boolean
  schedule: Schedule
  times: string[]
}

const getCart = async () => {
  let res: CartResponseData = await apiGetCart()
  console.log('getCart', res)
  if (res.code === 200) {
    carts.value = res.data
    userStore.cartCount = res.data.cartResponses.reduce(
      (total, cartData) => total + cartData.qty,
      0,
    )

    sum.value = carts.value.cartResponses.reduce(
      (total, v) => total + v.qty * v.productResponse.price,
      0,
    )
  }
  while (startOptionDay <= oneWeekLater) {
    let schedule = (carts.value.schedules as Schedules)[
      startOptionDay.getDay()
    ] as Schedule
    let timePeriods = schedule?.timePeriods as TimePeriods

    const times: string[] = availableTimes(
      startOptionDay.getDate(),
      timePeriods,
    )
    const disabled: boolean = !(timePeriods?.length > 0 && times.length > 0)
    const show: string =
      startOptionDay.getFullYear() +
      ' - ' +
      (startOptionDay.getMonth() + 1) +
      ' - ' +
      startOptionDay.getDate() +
      (disabled ? ' 休息' : '')

    const dateData = ref<MyDateDisabled>({
      year: startOptionDay.getFullYear(),
      month: startOptionDay.getMonth() + 1,
      date: startOptionDay.getDate(),
      show: show,
      week: schedule.week,
      disabled: disabled,
      schedule: schedule,
      times: times,
    })

    dateOptions.value.push(dateData.value)
    selectedDate.value = dateOptions.value.find(
      (v) => !v.disabled,
    ) as MyDateDisabled
    selectedTime.value = await selectedDate.value.times[0]
    startOptionDay.setDate(startOptionDay.getDate() + 1)
    isFirst = false
  }
}
let isFirst: boolean = true
watch(
  selectedDate,
  () => {
    if (!isFirst) {
      selectedTime.value = ''
    }
  },
  {
    // 選項
    immediate: false, // 設置為 false 以防止立即執行
    deep: true,
  },
)
onMounted(() => {
  getCart()
})

// const validatorShopName = (rule: any, value: any, callBack: any) => {
//   if (value.trim().length >= 2) {
//     callBack()
//   } else {
//     callBack(new Error('店名稱至少2位'))
//   }
// }

// const validatorShopPhone = (rule: any, value: any, callBack: any) => {
//   if (value.trim().length >= 10 && value.trim().length <= 11) {
//     callBack()
//   } else {
//     callBack(new Error('電話至少10位~11位'))
//   }
// }

// const validatorShopDescription = (rule: any, value: any, callBack: any) => {
//   if (value.trim().length <= 255) {
//     callBack()
//   } else {
//     callBack(new Error('介紹不可超過255個字'))
//   }
// }

const validatorShopAddressDetail = (rule: any, value: any, callBack: any) => {
  if (value.trim().length <= 255) {
    callBack()
  } else {
    callBack(new Error('地址不可超過255個字'))
  }
}
const validateNotEmptyString = (rule: any, value: any, callback: any) => {
  if (value.trim() === '') {
    callback(new Error('請輸入地址'))
  } else {
    callback()
  }
}
const addressRules = {
  'address.city': [
    { required: true, message: '區域不能為空', trigger: 'change' },
  ],
  'address.area': [
    { required: true, message: '區域不能為空', trigger: 'change' },
  ],
  'address.detail': [
    {
      required: true,
      message: 'Detail cannot be empty',
      trigger: 'blur',
      validator: validatorShopAddressDetail,
    },
    {
      validator: validateNotEmptyString,
      trigger: 'blur',
      message: '地址不能為空',
    },
  ],
}
</script>
<template>
  <div class="shopCart">
    <div class="shopCart-header">
      <h1>訂單資料確認</h1>
    </div>
    <div class="shopCart-body">
      <el-row class="shopCart-body" :gutter="20">
        <el-col :span="16">
          <div class="date-time-item">
            <span>外送時間：</span>
            <div class="date-time">
              <el-select
                v-model="selectedDate"
                placeholder="请选择日期"
                size="large"
                value-key="date"
                :label="selectedDate.show"
              >
                <el-option
                  v-for="(date, i) in dateOptions"
                  :key="i + 1"
                  :label="date.show"
                  :value="date"
                  :disabled="date.disabled"
                />
              </el-select>
              <!-- <el-select v-model="value" value-key="id" placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.label"
                  :value="item"
                />
              </el-select> -->
              <el-select
                v-model="selectedTime"
                placeholder="請選擇時間"
                size="large"
                no-data-text="請先選擇日期"
              >
                <el-option
                  v-for="time in selectedDate.times"
                  :key="time"
                  :label="time"
                  :value="time"
                ></el-option>
              </el-select>
            </div>
          </div>

          <hr />
          <div class="address">
            <span>外送地址：</span>
            <div v-if="userStore.address">
              <span>
                {{
                  userStore.address.city +
                  userStore.address.area +
                  userStore.address.detail
                }}
              </span>
              <el-button
                type="primary"
                size="large"
                class="button-wight"
                v-if="!userStore.address"
                round
                plain
              >
                新增
              </el-button>
            </div>

            <div v-else class="address-add">
              <el-form
                ref="ruleFormRef"
                :model="address"
                :rules="addressRules"
                label-width="120px"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
                label-position="top"
              >
                <el-form-item prop="address.city">
                  <el-select
                    v-model="address.city"
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
                </el-form-item>
                <el-form-item prop="address.area">
                  <el-select
                    v-model="address.area"
                    class="m-2"
                    placeholder="請選擇區域"
                    size="large"
                    no-data-text="請先選擇城市"
                  >
                    <el-option
                      v-for="item in cityAreas[
                        address.city as keyof typeof cityAreas
                      ]"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item prop="address.detail">
                  <el-input
                    v-model="address.detail"
                    size="large"
                    placeholder="请您输入外送地址"
                  ></el-input>
                </el-form-item>
                <el-button
                  type="primary"
                  size="large"
                  class="button-wight"
                  round
                  plain
                >
                  確認
                </el-button>
              </el-form>
            </div>
          </div>

          <hr />
          <div class="textarea">
            <span>備註：</span>
            <!-- <el-form ref="ruleForm"  label-width="100px"> -->
            <el-form-item prop="desc">
              <el-input
                v-model="textarea"
                type="textarea"
                :minRows="2"
                :maxRows="6"
                :Rows="4"
              />
            </el-form-item>
            <!-- </el-form> -->
            <!-- <div>
              <el-input
                v-model="textarea"
                :rows="7"
                type="textarea"
                placeholder="Please input"
                maxlength="100"
              />
            </div> -->
            <!-- <el-button
              type="warning"
              size="large"
              class="button-wight"
              round
            ></el-button> -->
          </div>
        </el-col>
        <el-col :span="8">
          <div class="body-right">
            <span class="total">總金額:</span>
            <span class="total-data">NT${{ sum }}</span>
            <hr />
            <el-button type="warning" size="large" class="button-orange" round>
              送出訂單
            </el-button>
            <el-button
              type="warning"
              size="large"
              class="button-wight"
              @click="link"
              round
            >
              繼續購物
            </el-button>
            <el-button type="warning" size="large" class="button-wight" round>
              糾團
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @import "../node_modules/bootstrap/scss/_modal.scss";

@import '@/styles/bootstrap.scss';
$table-cell-padding-y: 1.5rem; //
$table-border-color: rgb(155, 155, 155); //
@import 'node_modules/bootstrap/scss/_tables.scss';

.is-disabled {
  // color: #ffffff63;
}
.shopCart {
  display: block;
  overflow: hidden;

  .shopCart-header {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 40px;
      margin: 20px 0;
    }
    span {
      font-size: 18px;
      margin: 10px 0;
      padding: 10px 0;
    }
  }
  .shopCart-body {
    .date-time-item {
      display: grid;
      // justify-content: space-between;
      // align-items: center;
      .date-time {
        margin: 5px;
        .el-select {
          margin-top: 5px;
          margin-left: 5px;
          width: 130px;
        }
        .el-select:first-child {
          margin-right: 5px;
          width: 150px;
        }
      }
    }
    .textarea {
      .el-form-item {
        width: 500px;
        margin: 10px;

        div {
          caret-color: white;
        }
      }
    }

    .address {
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      .address-add {
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        .el-form {
          display: grid;
          grid-template-columns:
            minmax(120px, 2fr) minmax(130px, 2fr) minmax(350px, 5fr)
            minmax(60px, 1fr);
          // grid-column-gap: 10px;
          grid-gap: 10px;
          margin: 10px;

          .el-form-item {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 0px;
            .el-form-item__label {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom: 0px;
              padding: 0 0 0 12px !important;
            }
            .el-select {
              margin: 0 !important;
            }
          }
          .el-button {
            margin: auto 0 auto 5px;
          }
          @media (max-width: $breakpoint-lg) {
            display: grid;
            grid-template-rows: auto auto; /* 調整每行的高度 */
            grid-template-columns: minmax(150px, 2fr) minmax(150px, 4fr) auto; /* 調整每列的寬度比例 */

            .el-form-item:nth-child(1) {
              grid-row: 1; /* 將第一個元素放置在第一行 */
              grid-column: 1; /* 將第一個元素放置在第一列 */
            }

            .el-form-item:nth-child(2) {
              grid-row: 1; /* 將第二個元素放置在第一行 */
              grid-column: 2; /* 將第二個元素放置在第二列 */
            }

            .el-form-item:nth-child(3) {
              grid-row: 2; /* 將第三個元素放置在第二行 */
              grid-column: 1 / span 2; /* 設置第三個元素佔第一列的80% */
            }

            .el-button {
              grid-row: 2; /* 將第四個元素放置在第二行 */
              grid-column: 3 / span 1; /* 設置第四個元素佔第二列的20% */
            }
          }

          @media (max-width: $breakpoint-xs) {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
    .body-right {
      margin: 10px;

      display: flex;
      flex-direction: column;
      .total {
        font-size: 20px;
        margin: 0 0 5px 10px;
        color: #818181;
      }
      .total-data {
        font-size: 30px;
        margin: 0 0 0 10px;
      }
      button {
        margin: 5px 0;
        background-color: $color;
        border: 0;
      }
      .button-wight {
        background-color: white;
        color: #000;
      }
      .button-orange:hover {
        background-color: rgb(253, 102, 20);
      }
      .button-wight:hover {
        background-color: rgba(253, 114, 1, 0.247);
        color: #000;
      }
    }
  }
  @media (max-width: $breakpoint-xs) {
    margin: 10px;
  }
}
</style>
