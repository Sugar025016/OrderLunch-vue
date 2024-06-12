<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'

import { ResponseBoolean, SellProduct } from '@/api/sellProduct/type'
import {ElMessage} from 'element-plus'
import useUserStore from '@/store/modules/user'
// import { UploadProps } from 'element-plus/es/components/index.js'
import useSellProductStore from '@/store/modules/sellProduct'
import { reqAddOrUpdateSellProduct } from '@/api/sellProduct'
import { UploadProps } from 'element-plus'

let sellProductStore = useSellProductStore()
let userStore = useUserStore()
let drawer = ref<boolean>(false)

let productParams = reactive<SellProduct>({
  id: 0,
  name: '',
  description: '',
  prise: 0,
  orderable: false,
  imgId: 0,
  imgUrl: undefined,
})

let formRef = ref<any>()

const addProduct = () => {
  drawer.value = true
  Object.assign(productParams, {
    id: 0,
    name: '',
    description: '',
    prise: 0,
    orderable: false,
    imgId: 0,
    imgUrl: undefined,
  })
  nextTick(() => {
    //清除特定字段的驗證狀態
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('prise')
    formRef.value.clearValidate('img')
  })
}

const updateProduct = async (row: SellProduct) => {
  Object.assign(productParams, row)
  drawer.value = true
  nextTick(() => {
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('prise')
    formRef.value.clearValidate('img')
  })
}

defineExpose({
  updateProduct,
  addProduct,
})

const validatorProductName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('餐點名稱至少2位'))
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
  name: [{ required: true, trigger: 'blur', validator: validatorProductName }],
  prise: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorProductPrise,
    },
  ],
}

const save = async () => {
  await formRef.value.validate()
  let res: ResponseBoolean = await reqAddOrUpdateSellProduct(
    sellProductStore.shopId,
    productParams,
  )
  drawer.value = false
  if (res.status === 200) {
    ElMessage({
      type: 'success',
      message: productParams.id ? '更新成功' : '添加成功',
    })
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: productParams.id ? '更新失败' : '添加失败',
    })
  }
}

const cancel = () => {
  drawer.value = false
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response: any,
  uploadFile: any,
) => {
  productParams.imgUrl = response.url
  productParams.imgId = response.id
  formRef.value.clearValidate('img')
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: {
  type: string
  size: number
}) => {
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
</script>
<template>
  <el-drawer v-model="drawer" class="drawer" size="90%">
    <template #header>
      <h3>{{ productParams.id ? '更新餐點' : '新增餐點' }}</h3>
    </template>
    <template #default>
      <div class="product_revise">
        <!-- <el-form :model="productParams" :rules="rules" ref="formRef"
    label-position="top"> -->
        <el-form
          class="revise"
          :model="productParams"
          :rules="rules"
          ref="formRef"
          label-width="auto"
        >
          <el-form-item label="產品名稱：" prop="name">
            <el-input
              placeholder="请您输入產品名稱"
              v-model="productParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="產品介紹：" prop="description">
            <el-input
              placeholder="请您输入產品介紹"
              v-model="productParams.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="產品價格：" prop="prise">
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
          <el-form-item label="上架：" prop="order">
            <el-switch v-model="productParams.orderable" />
          </el-form-item>
          <el-form-item label="產品圖：">
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
                v-if="productParams.imgUrl"
                :src="productParams.imgUrl.toString()"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>

        <div class="revise_add-to-purchase revise">
          <div class="add-to-purchase">
            <div class="add_group">
              <el-button size="large" type="primary" round>
                新增加購分類商品
              </el-button>
            </div>
          </div>
        </div>

        <el-form
          :model="productParams"
          :rules="rules"
          ref="formRef"
          class="revise"
        >
          <el-form-item label="產品名稱" prop="name">
            <el-input
              placeholder="请您输入產品名稱"
              v-model="productParams.name"
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
          <el-form-item label="上架" prop="order">
            <el-switch v-model="productParams.orderable" />
          </el-form-item>
          <el-form-item label="產品圖：" class="img">
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
                v-if="productParams.imgUrl"
                :src="productParams.imgUrl.toString()"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
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
h3 {
  font-size: 28px;
}
.avatar-uploader {
  .avatar {
    width: 100%;
    display: block;
  }
}
.product_revise {
  height: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  // overflow: auto;
  .revise {
    margin: 0 5px 0 0;
    border: 1px solid rgb(59, 59, 59);
    border-radius: 10px;
    padding: 10px;
  }
  .el-form {
    height: 100%;
    overflow: auto;

    :last-child.el-form-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      img {
        // margin: 10px;
        padding: 0 0 0 10px;
      }
    }
  }
  .revise_add-to-purchase {
    height: 100%;
    // border: 1px ;
    // border-color: aqua;

    .add-to-purchase {
      height: 100%;
      .add_group {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        button {
        }
      }
    }
  }
}
</style>
