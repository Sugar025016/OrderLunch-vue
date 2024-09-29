<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import address from '@/utils/address.js'
import { Address } from '@/api/type'
import { RegisterShop, ShopIDResponseData } from '@/api/shop/type'
import Captcha from '../Captcha/index.vue'

import { useRouter } from 'vue-router'
import { reqAddShop } from '@/api/shop'
import useUserStore from '@/store/modules/user'

let $router = useRouter()

let selectedOption1 = ref(-1)
let selectedOption2 = ref(-1)
let selectedOption3 = ref(-1)

const changeCity = (value: number) => {
  selectedOption1.value = value
  addRegisterShop.value.address.area = ''
  addRegisterShop.value.address.street = ''
}

const changeArea = (value: number) => {
  selectedOption2.value = value
  addRegisterShop.value.address.street = ''
}
const changeStreet = (value: number) => {
  selectedOption3.value = value
}

export interface AddRegisterShop {
  captcha: string
  name: string
  phone: string
  description: string
  address: Address
}
const addRegisterShop = ref<AddRegisterShop>({
  captcha: '',
  name: 'NN小店',
  phone: '1234567890',
  description: 'NNNN',
  address: {
    city: '',
    area: '',
    street: '',
    detail: '123',
    lat: undefined,
    lng: undefined,
  },
})
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('請輸入名稱'))
  } else if (value.length < 3) {
    callback(new Error('名稱長度不可小於3字母'))
  } else {
    callback()
  }
}
const validatorVerifyCode = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('請輸入驗證碼'))
  } else if (value.length < 4) {
    callback(new Error('請輸入4碼驗證碼'))
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

import useSellShopStore from '@/store/modules/sellShop'
import { ElMessage, ElMessageBox } from 'element-plus'
let sellShopStore = useSellShopStore()

const captchaRef = ref<typeof Captcha | null>(null)

const save = async () => {
  await formRef.value.validate()

  const registerShop = ref<RegisterShop>({
    captcha: addRegisterShop.value?.captcha,
    shopName: addRegisterShop.value.name,
    phone: addRegisterShop.value.phone,
    description: addRegisterShop.value.description,
    addressId:
      address[selectedOption1.value].areas[selectedOption2.value].streets[
        selectedOption3.value
      ].streetKey,
    addressDetail: addRegisterShop.value.address.detail as string,
  })
  let res: any = await reqAddShop(registerShop.value)

  if (res.status === 200) {
    let userStore = useUserStore()
    userStore.userInfo()
    sellShopStore.shopId = res.data
    $router.push(`/sell/${res.data}/Shop`)
  } else {
    if (res.data.code === 0) {
      getElMessageBox()
    } else {
      ElMessage({
        type: 'error',
        message: res.data.message,
      })
      captchaRef.value?.refreshCaptcha()
    }
  }
}
let timer: any
const getElMessageBox = () => {
  ElMessageBox.alert('未登入，前往登入', '登入去', {
    callback: () => {
      // 關閉彈跳窗的回調函數
      ElMessageBox.close()
      $router.push('/login')
    },
  })

  timer = setTimeout(() => {
    const messageBoxInstance = ElMessageBox
    if (messageBoxInstance) {
      messageBoxInstance.close()

      $router.push('/login')
    }
  }, 5000) // 10000 毫秒即为 10 秒
}
const getUser = () => {
  let userStore = useUserStore()
  console.log('userStore.account', userStore.account)
  if (userStore.account === '') {
    getElMessageBox()
  }
}

onMounted(() => {
  getUser()
})
onBeforeUnmount(() => {
  clearTimeout(timer)
})
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
          <Captcha
            ref="captchaRef"
            v-model:verify-code="addRegisterShop.captcha"
          ></Captcha>
        </el-form-item>
      </el-form>
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
    // min-width: 350px;
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
