<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import address from '@/utils/address.js'
import { Address } from '@/api/type'
import { RegisterShop, ShopIDResponseData } from '@/api/shop/type'
import Captcha from '../Captcha/index.vue'
import { CheckboxValueType } from 'element-plus/lib/components/checkbox/src/checkbox.js'
import { ElMessageBox } from 'element-plus/lib/components/message-box/index.js'

import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { Action } from 'element-plus/es/components/message-box/src/message-box.type.js'
import ElMessage from 'element-plus/lib/components/message/index.js'
import { reqAddShop } from '@/api/shop'

let userStore = useUserStore()
let $router = useRouter()

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
const changeCity = (value: number) => {
  selectedOption1.value = value
  // selectedOption2.value = -1
  // selectedOption3.value = -1
  addRegisterShop.value.address.area = ''
  addRegisterShop.value.address.street = ''

  getC1()
}

const changeArea = (value: number) => {
  selectedOption2.value = value
  // selectedOption3.value = -1
  addRegisterShop.value.address.street = ''

  getC1()
}
const changeStreet = (value: number) => {
  selectedOption3.value = value

  getC1()
}

const getC1 = async () => {
  // shopStore.shopSearch = data
  // shopStore.shopArr.clear()
  // await shopStore.getShopPage()
}

export interface AddRegisterShop {
  captcha: string
  name: string
  phone: string
  description: string
  address: Address
}
const addRegisterShop = ref<AddRegisterShop>({
  captcha: '1234',
  name: 'NN小店',
  phone: '1234567890',
  description: 'NNNN',
  address: {
    city: '',
    area: '',
    street: '',
    detail: '123',
  },
})
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入名稱'))
  } else if (value.length < 3) {
    callback(new Error('名稱長度不可小於3字母'))
  } else {
    callback()
  }
}
const validatorVerifyCode = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入验证码'))
  } else if (value.length < 4) {
    callback(new Error('请输入4碼验证码'))
  } else {
    callback()
  }
}
const validatorShopAddressDetail = (rule: any, value: any, callBack: any) => {
  if (value.trim().length <= 255) {
    callBack()
  } else {
    callBack(new Error('地址不可超過255個字'))
  }
}
const validatorShopPhone = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 10 && length <= 11) {
    callBack()
  } else {
    callBack(new Error('電話至少10位~11位'))
  }
}
const rules = {
  name: [
    {
      required: true,
      trigger: 'change',
      validator: validatorName,
    },
  ],
  phone: [
    {
      required: true,
      trigger: 'change',
      validator: validatorShopPhone,
    },
  ],
  description: [
    {
      trigger: 'change',
    },
  ],
  account: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  captcha: [
    {
      required: true,
      trigger: 'change',
      validator: validatorVerifyCode,
    },
  ],
  'address.city': [
    { required: true, message: '請選擇城市', trigger: 'change' },
  ],
  'address.area': [
    { required: true, message: '請選擇區域', trigger: 'change' },
  ],
  'address.street': [
    { required: true, message: '請選擇路(街)', trigger: 'change' },
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
function validateNotEmptyString(rule: any, value: any, callback: any) {
  if (value.trim() === '') {
    callback(new Error('Detail cannot be an empty string'))
  } else {
    callback()
  }
}
let formRef = ref<any>()
let timer: any

import useSellShopStore from '@/store/modules/sellShop'
  let sellShopStore = useSellShopStore()
const save = async () => {
  await formRef.value.validate()

  const registerShop = ref<RegisterShop>({
    captcha: addRegisterShop.value.captcha,
    shopName: addRegisterShop.value.name,
    phone: addRegisterShop.value.phone,
    description: addRegisterShop.value.description,
    addressId:
      address[selectedOption1.value].areas[selectedOption2.value].streets[
        selectedOption3.value
      ].streetKey,
    addressDetail: addRegisterShop.value.address.detail as string,
  })

  console.log('/////////--------------//////////',registerShop.value)
  let res: ShopIDResponseData = await reqAddShop(registerShop.value)
  if (res.code === 200) {
    console.log("/////////----",res)
    sellShopStore.shopId = res.data
    $router.push(`/sell/${res.data}/Shop`)
  } else {
    ElMessage({
      type: 'error',
      message: '搜尋失败',
    })
  }
}
// const isLogin = () => {
//   console.log('************************************')

//   // 处理滚动事件的逻辑
//   if (userStore.token == null || userStore.token == '') {
//     console.log('*******************/////////*****************')
//     ElMessageBox.alert('你還未登入，請前往登入！', '前往登入！', {
//       // if you want to disable its autofocus
//       // autofocus: false,
//       confirmButtonText: 'OK',
//     })
//       .then(() => {
//     console.log('*******************/////////*****************3')
//         // 用户点击 OK 后执行的操作
//         $router.push('/login')
//       })
//       .catch(() => {
//         // 用户点击取消或关闭消息框后执行的操作
//         clearTimeout(timer)
//       })

//     // 设置定时器，在 10 秒后关闭消息框
//     timer = setTimeout(() => {
//       ElMessageBox.close()
//       $router.push('/login')
//     }, 5000) // 5000 毫秒即为 5 秒
//   }
// }

// onBeforeUnmount(() => {
//   clearTimeout(timer)
// })

// onMounted(() => {
//   isLogin()
// })
</script>
<template>
  <div class="register-member">
    <div class="table">
      <span class="table-title">註冊餐廳</span>
      <el-form
        :model="addRegisterShop"
        :rules="rules"
        ref="formRef"
        label-width="auto"
        label-position="top"
      >
        <el-form-item prop="name" label="店名：" size="large">
          <el-input
            v-model="addRegisterShop.name"
            clearable
            placeholder="請輸入店名"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="電話：" size="large">
          <el-input
            v-model="addRegisterShop.phone"
            size="large"
            placeholder="請輸入電話"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="介紹：" size="large">
          <el-input
            v-model="addRegisterShop.description"
            size="large"
            placeholder="請輸入介紹"
            clearable
          ></el-input>
        </el-form-item>
        <!-- <el-form-item
          prop="passwordCheck"
          label="地址："
          size="large"
        ></el-form-item> -->
        <div class="address">
          <el-form-item prop="address.city" label="地址：" size="large">
            <el-select
              v-model="addRegisterShop.address.city"
              class="m-2"
              placeholder="請選擇城市"
              size="large"
              @change="changeCity"
            >
              <el-option selected value="-1" label="縣市" disabled>
                縣市
              </el-option>
              <el-option
                v-for="(item, index) in address"
                :key="index"
                :label="item.cityName"
                :value="index"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="address.area" class="item-grid-area">
            <el-select
              v-model="addRegisterShop.address.area"
              class="m-2"
              placeholder="請選擇區域"
              size="large"
              no-data-text="請先選擇城市"
              @change="changeArea"
            >
              <el-option
                selected
                value="-1"
                label="鄉鎮[市]區"
                disabled
              ></el-option>
              <el-option
                v-if="selectedOption1 > -1"
                v-for="(area, index) in address[selectedOption1].areas"
                :key="area.areaName"
                :value="index"
                :label="area.areaName"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="address.street" class="item-grid">
            <el-select
              v-model="addRegisterShop.address.street"
              placeholder="請選擇路(街)名或鄉里名稱"
              size="large"
              no-data-text="請先選擇鄉鎮[市]區"
              @change="changeStreet"
            >
              <el-option
                selected
                value="-1"
                label="路(街)名或鄉里"
                disabled
              ></el-option>
              <el-option
                v-if="selectedOption2 > -1"
                v-for="(street, index) in address[selectedOption1].areas[
                  selectedOption2
                ].streets"
                :key="street.streetName"
                :value="index"
                :label="street.streetName"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="address.detail" class="item-grid">
            <el-input
              v-model="addRegisterShop.address.detail"
              size="large"
              placeholder="请您输入外送地址"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item
          prop="captcha"
          class="custom-form-item"
          label="驗證碼："
          size="large"
        >
          <Captcha v-model="addRegisterShop.captcha"></Captcha>
        </el-form-item>
      </el-form>
      <!-- <el-checkbox v-model="checked1" label="Option 1" size="large" /> -->
      <!-- <el-button size="large" round>確認</el-button> -->
      <el-button size="large" type="primary" round @click="save()">
        確認
      </el-button>
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
    :deep(.el-form-item__error) {
      padding-top: 4px;
    }

    @import '@/styles/form.scss';
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
      .el-form-item {
        margin-bottom: 22px;
      }
      .item-grid-area {
        display: flex;
        align-items: flex-end;
      }
      .item-grid {
        grid-column: span 2;
        // width: 400px;
        :deep(.el-form-item__content) {
          .el-select {
            width: 320px;
            // background-color: aqua;
          }
        }
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
