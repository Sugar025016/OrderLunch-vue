<script setup lang="ts">
import { ref, onMounted, reactive, nextTick, watch } from 'vue'
import {
  reqRemoveShop,
  reqShopInfo,
  reqBackstageAddOrUpdateShop,
} from '@/api/backstage/shop'
import type {
  ShopSearch,
  ShopResponseData,
  ShopList,
  ShopData,
} from '@/api/backstage/Shop/type'
import { ElMessage } from 'element-plus'
import { UploadProps } from 'element-plus/es/components/upload/src/upload'
import cityAreas from '@/utils/areaData.js'
import useUserStore from '@/store/modules/user'
import { ShopPutRequest } from '@/api/backstage/shop/type'
import { reqSearchUser } from '@/api/backstage/user'
import debounce from 'lodash/debounce'
import { SearchUserResponseData, SearchUsers } from '@/api/backstage/user/type'
import { PutShopData } from '@/api/shop/type'
// import useLayOutSettingStore from '@/store/modules/setting'
let userStore = useUserStore()

let pageNo = ref<number>(1)

let pageSize = ref<number>(5)

let total = ref<number>(0)

let shopArr = ref<ShopList>([])

let drawer = ref<boolean>(false)

let shopParams = reactive<ShopPutRequest>({
  id: 0,
  userAccount: '',
  shopName: '',

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
  disable: false,
})

let selectIdArr = ref<ShopData[]>([])
onMounted(() => {
  getHasShop()
})

let formRef = ref<any>()
// let keyword = ref<string>('')

// let settingStore = useLayOutSettingStore()

let shopSearch: ShopSearch = {}
const getHasShop = async (pager = 1) => {
  pageNo.value = pager
  let res: ShopResponseData = await reqShopInfo(
    pageNo.value,
    pageSize.value,
    shopSearch,
  )
  if (res.code === 200) {
    total.value = res.data.totalElements
    shopArr.value = res.data.content
  }
}

const handler = () => {
  getHasShop()
}

const addShop = () => {
  drawer.value = true
  Object.assign(shopParams, {
    id: 0,
    userAccount: '',
    userName: '',
    shopName: '',
    phone: '',
    description: '',
    address: {
      city: '',
      area: '',
      detail: '',
    },
    imgId: 0,
    imageGetUrl: '',
    imgUrl: '',
  })
  const tempAddress = {
    id: shopParams.address.id,
    city: shopParams.address.city,
    area: shopParams.address.area,
    detail: shopParams.address.detail,
  }

  shopParams.address = tempAddress
  nextTick(() => {
    //清除特定字段的驗證狀態
    formRef.value.clearValidate('userAccount')
    formRef.value.clearValidate('userName')
    formRef.value.clearValidate('shopName')
    formRef.value.clearValidate('phone')
    formRef.value.clearValidate('img')
    formRef.value.clearValidate('address.city')
    formRef.value.clearValidate('address.area')
    formRef.value.clearValidate('address.detail')
  })
}

const updateShop = (row: ShopData) => {
  drawer.value = true
  Object.assign(shopParams, row)

  const tempAddress = {
    id: shopParams.address.id,
    city: shopParams.address.city,
    area: shopParams.address.area,
    detail: shopParams.address.detail,
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

const save = async () => {
  await formRef.value.validate()
  let res: any = await reqBackstageAddOrUpdateShop(shopParams)
  if (res.code === 200) {
    drawer.value = false
    ElMessage({
      message: shopParams.id ? '更新成功' : '添加成功',
      type: 'success',
    })
    window.location.reload()
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: shopParams.id ? '更新失败' : '添加失败',
    })
  }
}

const cancel = () => {
  drawer.value = false
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


const deleteShop = async (ShopId: number) => {
  let res: any = await reqRemoveShop(ShopId)
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasShop(shopArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    window.location.reload()
  }
}

const selectChange = (value: any) => {
  selectIdArr.value = value
}



const loading = ref(false)
const search = async (query: string) => {
  let res: SearchUserResponseData = await reqSearchUser(query)
  if (res.code === 200) {
    searchUsers.value = res.data
  } else {
    drawer.value = false
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
}, 1000)

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

const changeCity = () => {
  shopParams.address.area = ''
}
</script>
<template>
  <!-- <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          :disabled="keyword.length ? false : true"
          @click="search"
        >
          搜索
        </el-button>
        <el-button size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card> -->
  <el-card style="margin: 10px 0">
    <el-button type="primary" size="default" @click="addShop">
      添加商店
    </el-button>
    <el-button
      type="danger"
      size="default"
      :disabled="selectIdArr.length ? false : true"
      @click="deleteSelectShop"
    >
      批量删除
    </el-button>
    <el-table
      style="margin: 10px 0"
      :data="shopArr"
      @selection-change="selectChange"
      border
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column
        label="id"
        align="center"
        prop="id"
        width="50"
      ></el-table-column>
      <el-table-column
        label="用戶帳號"
        prop="userAccount"
        width="100"
      ></el-table-column>
      <el-table-column
        label="用戶名稱"
        prop="userName"
        width="100"
      ></el-table-column>
      <el-table-column
        label="商店名稱"
        prop="shopName"
        width="100"
      ></el-table-column>
      <!-- <el-table-column
        label="商店電話"
        prop="phone"
        show-overflow-tooltip
      ></el-table-column> -->
      <!-- <el-table-column label="標籤" prop="tabs"></el-table-column> -->
      <el-table-column label="介紹" prop="description"></el-table-column>
      <el-table-column label="地址">
        <template #default="{ row }">
          {{ row.address.city }} - {{ row.address.area }} -
          {{ row.address.detail }}
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="圖片" prop="imgUrl" align="center">
        <template #="{ row, $index }">
          <img :src="row.imgUrl" alt="" style="width: 130px; height: 100px" />
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180px" align="center">
        <template #="{ row, $index }">
          <div>
            開始訂購:
            <!-- <el-switch v-model="row.isOrderable" 
              style="
                --el-switch-on-color: #fd7e14;
              "/> -->

            <el-switch v-model="row.isOrderable" />
          </div>
          <div>
            關閉商店:
            <!-- <el-switch
              v-model="row.disable"
              style="
                --el-switch-on-color: #fd7e14;
              "
            /> -->

            <el-switch v-model="row.disable" />
          </div>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateShop(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定删除${row.ShopName}`"
            width="260px"
            @confirm="deleteShop(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
      @current-change="getHasShop"
      @size-change="handler"
    />
  </el-card>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ shopParams.id ? '更新商店' : '添加商店' }}</h4>
    </template>
    <template #default>
      <el-form :model="shopParams" :rules="rules" ref="formRef">
        <el-form-item label="會員帳號" prop="userAccount" v-if="!shopParams.id">
          <el-select
            v-model="shopParams.userAccount"
            filterable
            remote
            reserve-keyword
            placeholder="搜尋"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in searchUsers"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商店名稱" prop="shopName" v-if="!shopParams.id">
          <el-input
            placeholder="请您输入商店名稱"
            v-model="shopParams.shopName"
          ></el-input>
        </el-form-item>
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
        <el-form-item label="商店圖">
          <el-upload
            class="avatar-uploader"
            action="/api/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :with-credentials="true"
            :headers="uploadHeaders"
          >
            <!-- <img
              v-if="ShopParams.img"
              :src="`${ShopParams.imageGetUrl}${ShopParams.img}`"
              class="avatar"
            /> -->

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

.el-switch.is-checked .el-switch__core {
  --darkreader-bg--el-switch-on-color: $color;
  background-color: var(--darkreader-bg--el-switch-on-color);
  /* border-color: var(--darkreader-border--el-switch-border-color, var(--darkreader-border--el-switch-on-color)); */
  background-color: bisque;
}


</style>
