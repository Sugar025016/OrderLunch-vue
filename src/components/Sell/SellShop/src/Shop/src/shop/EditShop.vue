<script setup lang="ts">
import { ref, onMounted, reactive, nextTick, watch, computed } from 'vue'

import type { ShopList, ShopData } from '@/api/backstage/Shop/type'
import { ElMessage } from 'element-plus'
import { UploadProps } from 'element-plus/es/components/upload/src/upload'
import cityAreas from '@/utils/areaData.js'
import { reqSearchUser } from '@/api/backstage/user'
import debounce from 'lodash/debounce'
import { SearchUserResponseData, SearchUsers } from '@/api/backstage/user/type'
import useSellShopStore from '@/store/modules/sellShop'
import useUserStore from '@/store/modules/user'
import { PutShopData } from '@/api/shop/type'
import { reqAddOrUpdateShop } from '@/api/shop'

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
    detail: '',
  },
  imgId: 0,
  imgUrl: '',
  isOrderable: false,
  isDisable: false,
})
// const updateShop = async (row: ShopData) => {
//   // let res: SearchShopRequestData = await reqTab(row.shopId)
//   // if (res.code === 200) {
//   //   searchTabsData.value = res.data.tabs
//   // } else {
//   //   ElMessage({
//   //     type: 'error',
//   //     message: '空標籤',
//   //   })
//   // }
//   Object.assign(shopParams, row)

//   // drawer.value = true

//   nextTick(() => {
//     if (formRef.value) {
//       formRef.value.clearValidate('description');
//       formRef.value.clearValidate('img');
//       formRef.value.clearValidate('address.city');
//       formRef.value.clearValidate('address.area');
//       formRef.value.clearValidate('address.detail');
//     }
//   });
// }

let formRef = ref<any>()

// shopParams = computed(() => {
//   const shopData: PutShopData = Object.assign({}, sellShopStore.shop);

//   // nextTick(() => {
//   //   if (formRef.value) {
//   //     formRef.value.clearValidate('description');
//   //     formRef.value.clearValidate('img');
//   //     formRef.value.clearValidate('address.city');
//   //     formRef.value.clearValidate('address.area');
//   //     formRef.value.clearValidate('address.detail');
//   //   }
//   // });

//   return shopData;
// });
const updateShop = () => {
  sellShopStore.shopDrawer = true

  Object.assign(shopParams, sellShopStore.shop)

  // 创建一个临时的地址对象，以免影响到 row 对象
  const tempAddress = {
    id: sellShopStore.shop.address.id,
    city: sellShopStore.shop.address.city,
    area: sellShopStore.shop.address.area,
    detail: sellShopStore.shop.address.detail,
  }

  shopParams.address = tempAddress

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

  let res: any = await reqAddOrUpdateShop(shopParams)

  if (res.code === 200) {
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
  if (res.code === 200) {
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

const remoteMethod = debounce((query) => {
  if (query) {
    loading.value = true
    search(query.toLowerCase())
    loading.value = false
  } else {
    searchUsers.value = []
  }
}, 1000) // 1000 毫秒的防抖延迟

const city: string[] = Object.keys(cityAreas)

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
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
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  shopParams.imgUrl = response.url
  shopParams.imgId = response.id
  formRef.value.clearValidate('img')
}
const changeCity = () => {
  shopParams.address.area = ''
}
</script>
<template>
  <!-- <el-card style="margin: 10px 0">
    <Router-view></Router-view>
  </el-card> -->
  <el-drawer v-model="sellShopStore.shopDrawer">
    <template #header>
      <h3>{{ shopParams.id ? '更新商店' : '添加商店' }}</h3>
    </template>
    <template #default>
      <el-form :model="shopParams" :rules="rules" ref="formRef">
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
        <el-form-item label="地址-city" prop="address.city">
          <el-select
            v-model="shopParams.address.city"
            class="m-2"
            placeholder="城市"
            size="large"
            @change="changeCity"
          >
            <el-option
              v-for="(item, index) in city"
              :key="index"
              :label="item"
              :value="item"
              :disabled="index === 0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地址-area" prop="address.area">
          <el-select
            v-model="shopParams.address.area"
            class="m-2"
            placeholder="區域"
            size="large"
            no-data-text="請先選擇城市"
          >
            <el-option
              v-for="item in cityAreas[
                shopParams.address.city as keyof typeof cityAreas
              ]"
              :key="item"
              :label="item"
              :value="item"
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
        <el-form-item label="商店圖" class="img">
          <el-upload
            class="avatar-uploader"
            action="/api/api/upload"
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

.avatar-uploader {
  .avatar {
    width: 100%;
    display: block;
  }
}
</style>
