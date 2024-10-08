<script setup lang="ts">
import { ref, onMounted, reactive, nextTick, watch, computed } from 'vue'

import { ElMessage, UploadProps } from 'element-plus'
// import { UploadProps } from 'element-plus/es/components/upload/src/upload'
import { reqSearchUser } from '@/api/backstage/user'
// import debounce from 'lodash/debounce'
import { SearchUserResponseData, SearchUsers } from '@/api/backstage/user/type'
import useSellShopStore from '@/store/modules/sellShop'
import useUserStore from '@/store/modules/user'
import { PutShopData } from '@/api/shop/type'
import { reqAddOrUpdateShop } from '@/api/shop'

import address from '@/utils/address.js'
import { Address } from '@/api/type'
import { getCategoryList } from '@/api/category'
import { Category, CategoryListResponse } from '@/api/category/type'

let sellShopStore = useSellShopStore()

let userStore = useUserStore()

let shopParams = reactive<PutShopData>({
  id: 0,
  name: '',
  phone: '',
  description: '',
  address: {
    id: 0,
    city: '',
    area: '',
    street: '',
    detail: '',
    lat: 0,
    lng: 0,
  },
  imgId: 0,
  imgUrl: '',
  orderable: false,
  open: false,
  deliveryKm: 0,
  deliveryPrice: 0,
  category: [],
})

let shopParamsCheck: string

let formRef = ref<any>()

const props = defineProps({
  shopDrawer: Boolean,
})

const visible = ref(props.shopDrawer)

const $emit = defineEmits(['update:shopDrawer'])

const handleClose = () => {
  $emit('update:shopDrawer', (visible.value = false))
}

let categoryList = ref<Category[]>([])
const getCategory = async () => {
  let res: CategoryListResponse = await getCategoryList()
  categoryList.value = res.data
}
const updateShop = () => {
  getCategory()
  sellShopStore.shopDrawer = true

  Object.assign(shopParams, sellShopStore.shop)

  // 建立一個臨時的地址對象，以免影響 row 對象
  const tempAddress = {
    id: sellShopStore.shop.address.id,
    city: sellShopStore.shop.address.city,
    area: sellShopStore.shop.address.area,
    street: sellShopStore.shop.address.street,
    detail: sellShopStore.shop.address.detail,
  }

  shopParams.address = tempAddress as Address

  shopParamsCheck = JSON.stringify(shopParams)
  nextTick(() => {
    formRef.value.clearValidate('description')
    formRef.value.clearValidate('img')
    formRef.value.clearValidate('address.city')
    formRef.value.clearValidate('address.area')
    formRef.value.clearValidate('address.detail')
  })
}
defineExpose({
  updateShop,
})

const save = async () => {
  await formRef.value.validate()

  if (JSON.stringify(shopParams) !== shopParamsCheck) {
    let res: any = await reqAddOrUpdateShop(shopParams)
    if (res.status === 200) {
      sellShopStore.shopDrawer = false
      ElMessage({
        message: shopParams.id ? '更新成功' : '添加成功',
        type: 'success',
      })

      await sellShopStore.getSellShop(shopParams.id)

      // window.location.reload()
    } else {
      sellShopStore.shopDrawer = false
      ElMessage({
        type: 'error',
        message: shopParams.id ? '更新失败' : '添加失败',
      })
    }
  }

  handleClose()
}

const cancel = () => {
  sellShopStore.shopDrawer = false
}

const validatorShopName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('店名稱至少2位'))
  }
}

const validatorShopPhone = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 10 && length <= 11) {
    callBack()
  } else {
    callBack(new Error('電話至少10位~11位'))
  }
}

const validatorShopDescription = (rule: any, value: any, callBack: any) => {
  if (value.trim().length <= 255) {
    callBack()
  } else {
    callBack(new Error('介紹不可超過255個字'))
  }
}

const validatorShopAddressDetail = (rule: any, value: any, callBack: any) => {
  if (value.trim().length <= 255) {
    callBack()
  } else {
    callBack(new Error('地址不可超過255個字'))
  }
}
const rules = {
  shopName: [{ required: true, trigger: 'blur', validator: validatorShopName }],
  phone: [{ required: true, trigger: 'blur', validator: validatorShopPhone }],
  description: [{ trigger: 'blur', validator: validatorShopDescription }],
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
  deliveryKm: [{ required: true, message: '請設定外送距離', trigger: 'blur' }],
}
function validateNotEmptyString(rule: any, value: any, callback: any) {
  if (value.trim() === '') {
    callback(new Error('Detail cannot be an empty string'))
  } else {
    callback()
  }
}

const loading = ref(false)
const search = async (query: string) => {
  let res: SearchUserResponseData = await reqSearchUser(query)
  if (res.status === 200) {
    searchUsers.value = res.data
  } else {
    sellShopStore.shopDrawer = false
    ElMessage({
      type: 'error',
      message: '搜尋失败',
    })
  }
}
const searchUsers = ref<SearchUsers>([])

// const remoteMethod = debounce((query) => {
//   if (query) {
//     loading.value = true
//     search(query.toLowerCase())
//     loading.value = false
//   } else {
//     searchUsers.value = []
//   }
// }, 1000) // 1000 毫秒的防抖延迟

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传的文件大小应小于4M',
      })
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传的文件类型必须是PNG|JPG|GIF',
    })
    return false
  }
}

const uploadHeaders = {
  'X-CSRF-Token': userStore.token, // 初始为空
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any) => {
  shopParams.imgUrl = response.url
  shopParams.imgId = response.id
  formRef.value.clearValidate('img')
}

export interface Area {
  areaName: string
  streets: [{ streetKey: number; streetName: string }]
}
export type Areas = Area[]

const changeCity = () => {
  shopParams.address.area = ''
  shopParams.address.street = ''
}

const changeArea = () => {
  shopParams.address.street = ''
}
</script>
<template>
  <el-drawer v-model="props.shopDrawer" :before-close="handleClose">
    <template #header>
      <h3>{{ shopParams.id ? '更新商店' : '添加商店' }}</h3>
    </template>
    <template #default>
      <el-form
        :model="shopParams"
        :rules="rules"
        ref="formRef"
        label-width="110px"
      >
        <!-- <el-form-item label="商店名稱" prop="shopName" v-if="!shopParams.id">
          <el-input
            placeholder="请您输入商店名稱"
            v-model="shopParams.shopName"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="商店電話" prop="phone">
          <el-input
            placeholder="请您输入商店電話"
            v-model="shopParams.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="商店介紹" prop="description">
          <el-input
            placeholder="请您输入商店介紹"
            v-model="shopParams.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址-city" prop="address.city" value-key="index">
          <el-select
            v-model="shopParams.address.city"
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
              :value="item.cityName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地址-area" prop="address.area">
          <el-select
            v-model="shopParams.address.area"
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
              v-for="(area, index) in address.find(
                (address) => address.cityName === shopParams.address.city,
              )?.areas"
              :key="index"
              :value="area.areaName"
              :label="area.areaName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地址-street" prop="address.street">
          <el-select
            v-model="shopParams.address.street"
            placeholder="請選擇路(街)名或鄉里名稱"
            size="large"
            no-data-text="請先選擇鄉鎮[市]區"
          >
            <el-option
              selected
              value="-1"
              label="路(街)名或鄉里"
              disabled
            ></el-option>
            <el-option
              v-for="(street, index) in address
                .find((address) => address.cityName === shopParams.address.city)
                ?.areas.find(
                  (areas) => areas.areaName === shopParams.address.area,
                )?.streets"
              :key="index"
              :value="street.streetName"
              :label="street.streetName"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="地址-detail" prop="address.detail">
          <el-input
            size="large"
            placeholder="请您输入商店地址"
            v-model="shopParams.address.detail"
          ></el-input>
        </el-form-item>
        <el-form-item label="最低外送價格" prop="deliveryPrice">
          <el-input-number
            size="large"
            v-model="shopParams.deliveryPrice"
            :max="10000"
          />
        </el-form-item>
        <el-form-item label="最遠外送距離" prop="deliveryKm">
          <el-input-number
            size="large"
            v-model="shopParams.deliveryKm"
            :precision="1"
            :step="0.1"
            :max="100"
          />
          <span class="km">（公里）</span>
        </el-form-item>

        <el-form-item label="餐點類型">
          <el-checkbox-group v-model="shopParams.category">
            <el-checkbox
              :value="item.id"
              name="type"
              :key="item.id" :label="item.id"
              v-for="item in categoryList"

            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="餐廳上架" prop="isOpen">
          <el-switch v-model="shopParams.open" />
        </el-form-item>
        <el-form-item label="可線上訂購" prop="orderable">
          <el-tooltip content="餐廳未上架，請先上架" v-if="!shopParams.open">
            <el-switch
              v-model="shopParams.orderable"
              :disabled="!shopParams.open"
            />
          </el-tooltip>
          <el-switch v-else v-model="shopParams.orderable" />
        </el-form-item>
        <el-form-item label="商店圖" class="img">
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :with-credentials="true"
            :headers="uploadHeaders"
          >
            <img
              v-if="shopParams.imgUrl"
              :src="shopParams.imgUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save()">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<style lang="scss" scoped>
h3 {
  font-size: 18px;
}
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.km {
  color: #a9a297;
  margin: 0 10px;
}
.avatar-uploader {
  .avatar {
    width: 100%;
    display: block;
  }
}
</style>
