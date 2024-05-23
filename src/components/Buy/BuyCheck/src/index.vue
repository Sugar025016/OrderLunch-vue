<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { reqGetCart } from '@/api/cart'
import { CartResponseData, CartsData } from '@/api/cart/type'
import useUserStore from '@/store/modules/user'
import { UserAddressResponseData } from '@/api/user/type'
import { Address, ResultResponse } from '@/api/type'

import EditAddressModal from './editAddressModal.vue'
import TimeSelect from './timeSelect.vue'
import { ElMessage, ElMessageBox } from 'element-plus/lib/components/index.js'
import { reqGetUserAddresses, reqPutUserAddresses } from '@/api/user'
import { Plus } from '@element-plus/icons-vue'
import { reqAddOrder } from '@/api/order'
import rwdBody from '@/components/layout/rwdBody/index.vue'
import ChooseAddressModel from '@/components/Buy/BuyShops/src/ChooseAddressModel/index.vue'
import { AddOrder } from '@/api/order/type'

const chooseAddressRef = ref<typeof ChooseAddressModel>()

let userStore = useUserStore()

let $router = useRouter()

const sum = ref(0)

const carts = ref<CartsData>({
  shopName: '',
  orderable: false,
  cartResponses: [],
  schedules: [],
  deliveryKm: 0,
  deliveryPrice: 0,
})

const link = () => {
  if (carts.value.shopId) {
    $router.push('/BuyShop/' + carts.value.shopId)
  } else {
    $router.push('/')
  }
}

const remark = ref('')

const startOptionDay = new Date()
const oneWeekLater = new Date()
oneWeekLater.setDate(startOptionDay.getDate() + 7)
let timer: any
const getCart = async () => {
  radio1.value = userStore.address?.id as number
  let res: CartResponseData = await reqGetCart()
  if (res.status === 200) {
    if (res.data.cartResponses && res.data.cartResponses?.length !== 0) {
      clearTimeout(timer)
      await getUserAddress()
      carts.value = res.data
      userStore.cartCount =
        res.data.cartResponses?.length > 0
          ? res.data.cartResponses.reduce(
              (total, cartData) => total + cartData.qty,
              0,
            )
          : 0

      sum.value = carts.value.cartResponses.reduce(
        (total, v) => total + v.qty * v.productResponse.price,
        0,
      )
    } else {
      ElMessageBox.alert('購物車空的，購物去', '購物車', {
        callback: () => {
          ElMessageBox.close()
          $router.push('/')
        },
      })

      timer = setTimeout(() => {
        const messageBoxInstance = ElMessageBox
        if (messageBoxInstance) {
          messageBoxInstance.close()

          $router.push('/')
        }
      }, 5000) // 10000 毫秒即为 10 秒
    }
  } else {
    ElMessage({
      type: 'error',
      message: '搜尋失败',
    })
  }
}

const addresses = ref<Address[]>([])
let addressParams = ref<Address[]>([])
const getUserAddress = async () => {
  let res: UserAddressResponseData = await reqGetUserAddresses()
  if (res.status === 200) {
    addresses.value = res.data
    addressParams.value = JSON.parse(JSON.stringify(addresses.value))

    if (res.data.length === 0) {
      isChangeAddress.value = false
      addAddresses()
    }
  } else {
    ElMessage({
      type: 'error',
      message: '搜尋失败',
    })
  }
}

const chooseAddressRefOpen = async () => {
  chooseAddressRef.value?.open()
}

const addAddresses = async () => {
  let address = reactive<Address>({
    city: '',
    area: '',
    detail: '',
    street: '',
    lat: undefined,
    lng: undefined,
  })
  addressParams.value.push(address)
}

const saveAddresses = async () => {
  if (JSON.stringify(addresses.value) !== JSON.stringify(addressParams.value)) {
    let res: UserAddressResponseData = await reqPutUserAddresses(
      addressParams.value,
    )
    if (res.status === 200) {
      addresses.value = res.data
      addressParams.value = JSON.parse(JSON.stringify(addresses.value))

      if (res.data.length === 0) {
        isChangeAddress.value = false
        addAddresses()
      } else {
        isChangeAddress.value = true
      }
    } else {
      ElMessage({
        type: 'error',
        message: '搜尋失败',
      })
    }
  } else {
    isChangeAddress.value = true
  }
}

const close = async () => {
  addressParams.value = JSON.parse(JSON.stringify(addresses.value))
  isChangeAddress.value = true
}

let isChangeAddress = ref<boolean>(true)
onMounted(() => {
  getCart()
})

const d = ref('')
const t = ref('')
const getSelectDate = (date: string) => {
  d.value = date
}
let aaa: string
const getDeliveryTime = (dateTime: string) => {
  aaa = dateTime
}

const getSelectTime = (time: string) => {
  t.value = time
}

const deleteAddress = (index: number) => {
  addressParams.value.splice(index, 1)
}

const radio1 = ref(0)

let TimeSelectRef: any = ref<typeof TimeSelect>()
const reloadTimeSelect = () => {
  TimeSelectRef = null
  TimeSelectRef = ref<typeof TimeSelect>()
}

const sendOrder = async () => {
  await TimeSelectRef.value?.save()
  const order = ref<AddOrder>({
    takeTime: aaa,
    addressId: userStore.address?.id as number,
    remark: remark.value,
  })
  let res: ResultResponse = await reqAddOrder(order.value)

  if (res.status === 200) {
    userStore.cartCount = 0
    userStore.userInfo()
    $router.push('/BuyOrder')
  } else {
    console.log(res)
    if (res.data.code == 501) {
      reloadTimeSelect()
      ElMessage({
        type: 'error',
        message: '時間錯誤，更新時間',
      })
    } else {
      ElMessage({
        type: 'error',
        message: '建立訂單失敗',
      })
    }
  }
}

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>
<template>
  <div class="shopCart">
    <rwdBody>
      <template #slotName>
        <div class="shopCart-header">
          <h1>訂單資料確認</h1>
        </div>
        <div class="shopCart-body">
          <el-row :gutter="20">
            <div class="el-col">
              <div class="order_check date-time-item">
                <span>外送時間：</span>
                <div class="item date-time">
                  <TimeSelect
                    v-on:date="getSelectDate"
                    v-on:time="getSelectTime"
                    v-on:deliveryTime="getDeliveryTime"
                    :schedules="carts.schedules"
                    ref="TimeSelectRef"
                  ></TimeSelect>
                </div>
              </div>

              <hr />
              <div class="order_check address">
                <span>外送地址：</span>
                <div v-if="isChangeAddress" class="item address-radio">
                  <div class="address-edit">
                    <span>
                      {{
                        userStore.address?.city +
                        '&nbsp-&nbsp' +
                        userStore.address?.area +
                        '&nbsp-&nbsp' +
                        userStore.address?.street +
                        '&nbsp-&nbsp' +
                        userStore.address?.detail
                      }}
                    </span>
                  </div>
                  <div class="address-edit">
                    <el-button
                      type="primary"
                      size="large"
                      class="button-wight"
                      @click="chooseAddressRefOpen()"
                      round
                      plain
                    >
                      編輯
                    </el-button>
                  </div>
                </div>
              </div>

              <hr />
              <div class="order_check textarea">
                <span>備註：</span>
                <div class="item">
                  <el-form-item prop="desc">
                    <el-input
                      v-model="remark"
                      type="textarea"
                      :minRows="2"
                      :maxRows="6"
                      :Rows="6"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="el-col">
              <div class="body-right">
                <span class="total">總金額:</span>
                <span class="total-data">NT${{ sum }}</span>
                <hr />
                <el-button
                  type="warning"
                  size="large"
                  class="button-orange"
                  @click="sendOrder()"
                  round
                >
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
                <el-button
                  type="warning"
                  size="large"
                  class="button-wight"
                  round
                >
                  糾團
                </el-button>
              </div>
            </div>
          </el-row>
        </div>
      </template>
    </rwdBody>
  </div>

  <ChooseAddressModel ref="chooseAddressRef"></ChooseAddressModel>
</template>

<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
$table-cell-padding-y: 1.5rem;
$table-border-color: rgb(155, 155, 155);
@import 'node_modules/bootstrap/scss/_tables.scss';

.is-disabled {
  // color: #ffffff63;
}
.shopCart {
  display: block;
  overflow: hidden;
  padding: 0 5%;

  .shopCart-header {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 40px;
      margin: 0 0 30px 20px;
    }
    span {
      font-size: 18px;
      margin: 10px 0;
      padding: 10px 0;
    }
  }
  .shopCart-body {
    .el-row {
      display: grid; /* 使用CSS Grid布局 */
      grid-template-columns: minmax(620px, 9fr) minmax(200px, 3fr);
    }
    .el-col:first-child {
      margin: 0 calc(8vw - 60px) 0 0;
    }

    .item {
      margin: 20px 50px;
    }
    .date-time-item {
      display: grid;
    }
    .address {
      .address-radio {
        display: flex;
        flex-direction: column;

        .el-select {
          max-width: 600px;
        }
        .address-edit {
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: center;
          margin: 0 0 20px 0;
        }
      }
      .address-add {
        margin: 0 0 0 10px;
        .address {
          margin: 10px 0;
        }

        .button {
          display: flex;
          align-items: center;
          position: relative;
          height: 40px;
          .button-left {
            position: relative;
            left: 0px;
          }

          .button-right {
            position: absolute;
            right: 0px;
          }
        }
      }
    }
    .textarea {
      .el-form-item {
        width: 500px;

        div {
          caret-color: white;
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

    .order_check {
      margin: 40px;
      // margin: 0 calc(20% - 80px);
    }
  }
  // @media (max-width: $breakpoint-xs) {
  //   margin: 10px;
  // }
}
.shopCart {
  @media (max-width: $breakpoint-md) {
    margin: 10px;

    padding: 0;
    .rwdBody {
      margin: 0;
      width: 100%;
    }
    .shopCart-body {
      .el-row {
        // grid-template-columns: repeat(1, 1fr);
        display: grid; /* 使用CSS Grid布局 */
        // grid-template-columns: minmax(760px, 9fr) minmax(180px, 3fr);
        grid-template-columns: repeat(1, 1fr);
        .el-col {
          width: 100%;
          .order_check {
            // margin: 0 calc(10% - 40px);
            margin: 0;
            .item {
              margin: 20px 30px;

              @media (max-width: $breakpoint-xs) {
                margin: 20px 20px;
              }
            }

            @media (max-width: $breakpoint-xs) {
              margin: 20px 20px;
            }
          }
          .textarea {
            .el-form-item {
              width: 100%;
            }
            .item {
              .el-textarea {
                // background-color: aquamarine;
                width: 50px;
                width: auto;
                width: 100%;
                // width: 250px;
                .el-textarea__inner {
                  width: 100%;
                  // width: 250px;
                  background-color: aquamarine;

                  // width: 80%;
                }
                // @media (max-width: $breakpoint-xs) {
                //   // .el-textarea__inner {
                //     width: 100%;
                //     width: 250px;
                //     background-color: aquamarine;
                //     // width: 80%;
                //   // }
                // }
              }
            }
          }
        }
        .el-col:first-child {
          margin: 10px;
          .order_check {
            margin: 0 10px 0 0;
            .el-form {
              flex-wrap: wrap;
            }
          }
        }
      }
    }
  }
  @media (max-width: $breakpoint-xs) {
    .el-textarea__inner {
      width: 100%;
      width: 250px;
      background-color: aquamarine;
      // width: 80%;
    }
  }
}
</style>
