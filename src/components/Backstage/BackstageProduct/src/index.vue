<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqProductInfo,
  reqAddOrUpdateProduct,
  reqDeleteProduct,
  reqIsOrderableProduct,
} from '@/api/backstage/product'
import type {
  ProductResponseData,
  ProductList,
  ProductData,
  ProductOrderResponseData,
} from '@/api/backstage/Product/type'

import { UploadProps } from 'element-plus/es/components/upload/src/upload'
import cityAreas from '@/utils/areaData.js'
import useUserStore from '@/store/modules/user'
import { ProductPutRequest } from '@/api/backstage/product/type'
import { reqSearchTab, reqTab } from '@/api/backstage/tab'
import { SearchShopsRequestData } from '@/api/backstage/Shop/type'
import {
  SearchTabsData,
  SearchShopsData,
  SearchShopRequestData,
} from '@/api/backstage/tab/type'
import debounce from 'lodash/debounce'
import { ElMessageBox } from 'element-plus/lib/components/message-box/index.js'
import { ElMessage } from 'element-plus/lib/components/index.js'
// import useLayOutSettingStore from '@/store/modules/setting'
let userStore = useUserStore()

let pageNo = ref<number>(1)

let pageSize = ref<number>(5)

let total = ref<number>(0)

let productArr = ref<ProductList>([])

let drawer = ref<boolean>(false)

let productParams = reactive<ProductPutRequest>({
  shopId: 0,
  shopName: '',
  id: 0,
  productName: '',
  description: '',
  prise: 0,
  isOrderable: false,
  isDelete: false,
  imgId: 0,
  imgUrl: undefined,
})

let selectIdArr = ref<ProductData[]>([])
onMounted(() => {
  getHasProduct()
})

let formRef = ref<any>()
// let keyword = ref<string>('')

// let settingStore = useLayOutSettingStore()

// let productSearch: ProductSearch = {}
let shopId: number
const getHasProduct = async (pager = 1) => {
  pageNo.value = pager
  let res: ProductResponseData = await reqProductInfo(
    pageNo.value,
    pageSize.value,
    shopId,
  )

  if (res.code === 200) {
    total.value = res.data.totalElements
    productArr.value = res.data.content
  }
}

const handler = () => {
  getHasProduct()
}

const addProduct = () => {
  drawer.value = true
  Object.assign(productParams, {
    shopId: 0,
    shopName: '',
    id: 0,
    productName: '',
    description: '',
    prise: 0,
    isOrderable: false,
    isDelete: false,
    imgId: 0,
    imgUrl: undefined,
  })
  searchTabsData.value = []
  nextTick(() => {
    //清除特定字段的驗證狀態
    formRef.value.clearValidate('shopName')
    // formRef.value.clearValidate('tabName')
    formRef.value.clearValidate('productName')
    formRef.value.clearValidate('prise')
    formRef.value.clearValidate('img')
  })
}

const updateProduct = async (row: ProductData) => {
  // let res: SearchShopRequestData = await reqTab(row.shopId)
  // if (res.code === 200) {
  //   searchTabsData.value = res.data.tabs
  // } else {
  //   ElMessage({
  //     type: 'error',
  //     message: '空標籤',
  //   })
  // }
  Object.assign(productParams, row)

  drawer.value = true

  nextTick(() => {
    formRef.value.clearValidate('shopName')
    // formRef.value.clearValidate('tabName')
    formRef.value.clearValidate('productName')
    formRef.value.clearValidate('prise')
    formRef.value.clearValidate('img')
  })
}

const setOrderable = async (row: ProductData) => {
  let res: ProductOrderResponseData = await reqIsOrderableProduct(
    row.id as number,
    row.orderable,
  )
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: productParams.id ? '更新成功' : '添加成功',
    })
    return row.orderable
  } else {
    window.location.reload()
    ElMessage({
      type: 'error',
      message: productParams.id ? '更新失败' : '添加失败',
    })
    return !row.orderable
  }
}

const save = async () => {
  await formRef.value.validate()
  // if (!productParams.id ) {
  //   productParams.tabId = searchTabsData.value.find(
  //     (v) => v.name === productParams.tabName,
  //   )?.id
  // }
  let res: any = await reqAddOrUpdateProduct(productParams)
  if (res.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: productParams.id ? '更新成功' : '添加成功',
    })
    window.location.reload()
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: productParams.id ? '更新失败' : '添加失败',
    })
  }
}

const cancel = () => {
  drawer.value = false
}

const validatorProductName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('商店名稱至少2位'))
  }
}

const validatorProductPhone = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 10 && length <= 11) {
    callBack()
  } else {
    callBack(new Error('商店電話至少10位~11位'))
  }
}

const validatorProductPrise = (rule: any, value: any, callBack: any) => {
  if (value > 0) {
    callBack()
  } else {
    callBack(new Error('請輸入價格'))
  }
}

const rules = {
  productName: [
    { required: true, trigger: 'blur', validator: validatorProductName },
  ],
  phone: [
    { required: true, trigger: 'blur', validator: validatorProductPhone },
  ],
  shopName: [
    {
      required: true,
      trigger: 'blur',
      message: '請輸入商店',
    },
  ],

  tabName: [
    {
      required: true,
      trigger: 'blur',
      message: '請選擇標籤',
    },
  ],
  prise: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorProductPrise,
    },
  ],
}

// const checkAll = ref<boolean>(false)
// const isIndeterminate = ref<boolean>(true)

// const handleCheckAllChange = (val: boolean) => {
//   ProductRole.value = val ? allRole.value : []
//   isIndeterminate.value = false
// }

// const handleCheckedProductsChange = (value: string[]) => {
//   const checkedCount = value.length
//   checkAll.value = checkedCount === allRole.value.length
//   isIndeterminate.value =
//     checkedCount > 0 && checkedCount < allRole.value.length
// }

const deleteProduct = async (ProductId: number) => {
  let res: any = await reqDeleteProduct(ProductId)
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasProduct(productArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

const selectChange = (value: any) => {
  selectIdArr.value = value
}

// const deleteSelectProduct = async () => {
//   let idList: any = selectIdArr.value.map((item) => {
//     return item.id
//   })
//   let res: any = await reqSelectProduct(idList)
//   if (res.code === 200) {
//     ElMessage({ type: 'success', message: '删除成功' })
//     getHasProduct(ProductArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
//   }
// }

// const search = () => {
//   getHasProduct()
//   keyword.value = ''
// }

// const reset = () => {
//   settingStore.refsh = !settingStore.refsh
// }

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
  productParams.imgUrl = response.url
  productParams.imgId = response.id
  formRef.value.clearValidate('img')
}

const loading = ref(false)
const search = async (query: string) => {
  let res: SearchShopsRequestData = await reqSearchTab(query)
  if (res.code === 200) {
    searchShopsData.value = res.data
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: '搜尋失败',
    })
  }
}
const searchShopsData = ref<SearchShopsData>([])

const remoteMethod = debounce((query) => {
  // 在这里执行搜索操作

  if (query) {
    loading.value = true
    search(query.toLowerCase())
    loading.value = false
  } else {
    searchShopsData.value = []
  }
  // 这只是一个示例，您需要根据实际情况实现搜索逻辑
}, 500) // 1000 毫秒的防抖延迟

const searchTabsData = ref<SearchTabsData>([])

const shopChange = () => {
  if (searchShopsData.value) {
    const selectedShop = searchShopsData.value.find(
      (v) => v.name === productParams.shopName,
    )
    productParams.shopId = selectedShop?.id

    if (selectedShop) {
      searchTabsData.value = selectedShop.tabs
    } else {
      searchTabsData.value = []
    }
    productParams.tabId = 0
    productParams.tabName = ''
  }
}

const tabChange = () => {
  if (searchShopsData.value) {
    const selectedShop = searchShopsData.value.find(
      (v) => v.name === productParams.shopName,
    )
    productParams.shopId = selectedShop?.id

    if (selectedShop) {
      searchTabsData.value = selectedShop.tabs
    } else {
      searchTabsData.value = []
    }
    productParams.tabId = 0
    productParams.tabName = ''
  }
}

const open = () => {
  ElMessageBox.prompt('Please input your e-mail', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: / \S/,
    inputErrorMessage: 'Invalid Email',
    closeOnClickModal: true,
    zIndex: 9999,
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `Your email is:${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}

const handleClose = (done) => {
  if (loading.value) {
    return
  }
  ElMessageBox.confirm('Do you want to submit?')
    .then(() => {
      loading.value = true
      timer = setTimeout(() => {
        done()
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false
        }, 400)
      }, 2000)
    })
    .catch(() => {
      // catch error
    })
}
</script>
<template>
  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

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
    <el-button type="primary" size="default" @click="addProduct">
      添加產品
    </el-button>
    <el-button
      type="danger"
      size="default"
      :disabled="selectIdArr.length ? false : true"
      @click="deleteSelectProduct"
    >
      批量删除
    </el-button>
    <el-table
      style="margin: 10px 0"
      :data="productArr"
      @selection-change="selectChange"
      border
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column
        label="商店名稱"
        prop="shopName"
        width="100"
      ></el-table-column>
      <el-table-column
        label="產品名稱"
        prop="productName"
        width="100"
      ></el-table-column>
      <el-table-column label="介紹" prop="description"></el-table-column>
      <el-table-column
        label="產品價格"
        prop="prise"
        width="60"
        show-overflow-tooltip
      ></el-table-column>
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
      <el-table-column label="imgUrl" prop="imgUrl" align="center">
        <template #="{ row, $index }">
          <img :src="row.imgUrl" alt="" style="width: 130px; height: 100px" />
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180px" align="center">
        <template #="{ row, $index }">
          <div>
            開啟訂購:
            <el-switch v-model="row.orderable" @change="setOrderable(row)" />
          </div>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateProduct(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定删除${row.ProductName}`"
            width="260px"
            @confirm="deleteProduct(row.id)"
          >
            <template #reference>
              <!-- <el-button type="danger" size="small" icon="Delete" @click="deleteProduct(row.id)"  > -->
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
      @current-change="getHasProduct"
      @size-change="handler"
    />
  </el-card>
  <el-drawer v-model="drawer" class="drawer">
    <template #header>
      <h4>{{ productParams.id ? '更新產品' : '添加產品' }}</h4>
    </template>
    <template #default>
      <el-form :model="productParams" :rules="rules" ref="formRef">
        <el-form-item label="商店名稱" prop="shopName" v-if="!productParams.id">
          <el-select
            v-model="productParams.shopName"
            filterable
            remote
            reserve-keyword
            placeholder="请您输入商店名稱"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="shopChange"
          >
            <el-option
              v-for="item in searchShopsData"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="標籤名稱" prop="tabName" class="drawer-tab">
          <div class="drawer-tab">
            <el-select
              v-model="productParams.tabName"
              placeholder="请選澤標籤名稱"
              no-data-text="請先選擇商店"
            >
              <el-option
                v-for="item in searchTabsData"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </div>
        </el-form-item> -->
        <el-form-item label="產品名稱" prop="productName">
          <el-input
            placeholder="请您输入產品名稱"
            v-model="productParams.productName"
          ></el-input>
        </el-form-item>
        <el-form-item label="產品介紹" prop="description">
          <el-input
            placeholder="请您输入產品介紹"
            v-model="productParams.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="產品價格" prop="prise">
          <el-input
            placeholder="请您输入產品價格"
            v-model="productParams.prise"
            :formatter="
              (value: string) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
          ></el-input>
        </el-form-item>
        <el-form-item label="產品圖">
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
              v-if="productParams.imgUrl"
              :src="productParams.imgUrl.toString()"
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
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .drawer-tab-button {
    margin: 5px;
  }
  .el-button {
    margin: 5px;
  }
}
.el-form-item__content {
  background-color: aqua;
  .drawer-tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.el-popup-parent--hidden {
  .el-overlay {
    z-index: 100000;
    background-color: aquamarine;
  }
  .is-message-box {
    z-index: 1000000;
  }
}
.avatar-uploader {
  .avatar {
    width: 100%;
    display: block;
  }
}
</style>
