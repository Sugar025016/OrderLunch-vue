<script setup lang="ts">
import { ref, reactive, nextTick, computed } from 'vue'

import { ResponseBoolean, SellProduct } from '@/api/sellProduct/type'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
// import { UploadProps } from 'element-plus/es/components/index.js'
import useSellProductStore from '@/store/modules/sellProduct'
import { reqAddOrUpdateSellProduct } from '@/api/sellProduct'
import { UploadProps } from 'element-plus'
import useSellShopStore from '@/store/modules/sellShop'
// import SellAddMealsChooseCard from '＠//SellAddMealsChooseCard/index.vue'＠/
import SellAddMealsChooseCard from '@/components/Sell/SellAddMeals/src/SellAddMealsChooseCard/index.vue'

let sellShopStore = useSellShopStore()

let sellProductStore = useSellProductStore()
let userStore = useUserStore()
let drawer = ref<boolean>(false)
const innerDrawer = ref(false)

let productParams = reactive<SellProduct>({
  id: 0,
  name: '',
  description: '',
  price: 0,
  orderable: false,
  imgId: 0,
  imgUrl: undefined,
  addMealsIdList: [],
})

let formRef = ref<any>()

const addProduct = () => {
  drawer.value = true
  Object.assign(productParams, {
    id: 0,
    name: '',
    description: '',
    price: 0,
    orderable: false,
    imgId: 0,
    imgUrl: undefined,
    addMealsIdList: [],
  })
  nextTick(() => {
    //清除特定字段的驗證狀態
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('price')
    formRef.value.clearValidate('img')
  })
}

const updateProduct = async (row: SellProduct) => {
  Object.assign(productParams, row)
  drawer.value = true
  nextTick(() => {
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('price')
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

const validatorProductprice = (rule: any, value: any, callBack: any) => {
  if (value > 0) {
    callBack()
  } else {
    callBack(new Error('請輸入價格'))
  }
}

const rules = {
  name: [{ required: true, trigger: 'blur', validator: validatorProductName }],
  price: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorProductprice,
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
  innerDrawer.value = false
  drawer.value = false
}

// const isChooseAddMeals = (id: number) => {
//   productParams.addMealsIdList.find
// }

// const isChooseAddMeals = computed({
//   get() {
//     return (id: number) => {
//       return productParams.addMealsIdList.includes(id);
//     };
//   },
//   set(newValue: boolean, id: number) {
//     if (newValue) {
//       productParams.addMealsIdList.push(id);
//     } else {
//       const index = productParams.addMealsIdList.indexOf(id);
//       if (index > -1) {
//         productParams.addMealsIdList.splice(index, 1);
//       }
//     }
//   }
// });

const isChooseAddMeals = (id: number) => {
  return productParams.addMealsIdList.includes(id)
}

// 切換選擇狀態
const chooseAddMeals = (id: number) => {
  if (isChooseAddMeals(id)) {
    productParams.addMealsIdList = productParams.addMealsIdList.filter(
      (item) => item !== id,
    )
  } else {
    productParams.addMealsIdList.push(id)
  }
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
import { ElMessageBox } from 'element-plus'
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('You still have unsaved data, proceed?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>
<template>
  <div class="sell-product-drawer">
    <el-drawer
      v-model="drawer"
      class="drawer"
      size="30%"
      :class="{ 'inner-drawer-open': innerDrawer }"
    >
      <template #header>
        <h3>{{ productParams.id ? '更新餐點' : '新增餐點' }}</h3>
      </template>
      <template #default>
        <div class="product_revise">
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
                :disabled="productParams.id"
              ></el-input>
            </el-form-item>
            <el-form-item label="產品介紹：" prop="description">
              <el-input
                placeholder="请您输入產品介紹"
                v-model="productParams.description"
              ></el-input>
            </el-form-item>
            <el-form-item label="產品價格：" prop="price">
              <el-input
                placeholder="请您输入產品價格"
                v-model="productParams.price"
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
            <el-form-item label="加購商品：">
              <el-button
                @click="innerDrawer = true"
                round
                :disabled="sellShopStore.shop.addMeals.length === 0"
              >
                設 定
              </el-button>
              <el-drawer
                size="500px"
                v-model="innerDrawer"
                title="加購商品："
                :append-to-body="true"
                class="choose-addMeals"
              >
                <template #header>
                  <h3>設定加購：(不想寫了...)</h3>
                </template>
                <div v-if="sellShopStore.shop.addMeals.length === 0">
                  <span>未設定加購商品....</span>
                  <router-link
                    :to="`/sell/${sellShopStore.shop.id}/addMeals`"
                    @Click="cancel"
                  >
                    <el-button type="primary" link>前往設定加購商品</el-button>
                  </router-link>
                </div>
                <template v-for="item in sellShopStore.shop.addMeals">
                  <div class="products-relative">
                    <div class="add-product">
                      <el-card
                        class="productCard"
                        @click="chooseAddMeals(item.id)"
                      >
                        <input
                          class="form-check-input checkbox"
                          type="checkbox"
                          id="inlineCheckbox1"
                          :checked="isChooseAddMeals(item.id)"
                          @click.stop="chooseAddMeals(item.id)"
                        />
                        <div class="products-content">
                          <div class="title">{{ item.name }}</div>

                          <div
                            class="products-card"
                            v-for="(v, i) in item.products"
                            :key="v.id"
                          >
                            <SellAddMealsChooseCard
                              :product="v.product"
                              :setting="true"
                              :choose="true"
                              :price="v.price"
                            ></SellAddMealsChooseCard>
                          </div>
                        </div>
                      </el-card>
                    </div>
                  </div>
                </template>
              </el-drawer>
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
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
.sell-product-drawer {
  :deep(.el-overlay) {
    .drawer {
      max-width: 900px;
      min-width: 440px;
    }
    .inner-drawer-open {
      width: 900px !important;
    }
    .choose-addMeals {
      background-color: #f80505;
    }
  }
}

.products-relative {
  min-height: 250px;
  .add-product {
    position: relative;
    min-width: 350px;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;

    margin: 0 0 10px 0;

    .productCard {
      word-break: break-all;

      display: flex;
      height: 250px;
      min-height: 250px;
      width: auto;
      justify-content: center;
      margin: 0 auto;
      position: relative;
      transition: none;
      border-radius: 40px;

      :deep(.el-card__body) {
        width: 100%;
        display: flex;
        justify-content: center;

        .products-content {
          max-width: 450px;
          .title {
            font-size: 30px;
            color: $color;
            height: 36px;
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 20px;
            padding: 0 20px;
            margin-bottom: 8px;
          }

          .products-card {
            margin: 10px 0;
            pointer-events: none;
          }
        }
      }
    }

    .checkbox {
      height: 18px;
      width: 18px;
      position: absolute;
      // background-color: $color;
      margin: 0;

      z-index: 10;
      left: 13px;
      top: 13px;
    }
    .checkbox:checked::before {
      content: '\2713'; /* 这是 Unicode 编码的勾选符号 */
      font-size: 30px; /* 勾选标志的大小 */
      color: #fff; /* 勾选标志的颜色 */
      position: absolute; /* 使勾选标志居中 */
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 18px; /* 勾选标志的宽度 */
      height: 18px; /* 勾选标志的高度 */
      line-height: 14px; /* 行高与高度相同，使文本垂直居中 */
      background-color: $color;
      vertical-align: middle;
      border: 1px solid #f80505;
    }
  }

  .add-product:hover {
    z-index: 10;
    .checkbox {
      z-index: 100;
    }
    .productCard {
      z-index: 10;
      transition: none;
      transform: scale(1.02);
      width: 100%;
    }
  }

  .add-product {
    // background-color: #c534348a;
    .el-card:active {
      border: 2px #ccc;
      // box-shadow: 0px 0px 0px 20px rgb(175, 175, 175) transparent !important;
      box-shadow:
        1px 1px 1px #e6e6e6,
        -1px -1px 1px #e6e6e6;
      // border: 1px #e2e2e2;
      transform: scale(1);
    }
  }
}

h3 {
  font-size: 28px;
}
.avatar-uploader {
  .avatar {
    width: 100%;
    // max-width: 360px;
    display: block;

    height: auto;
    max-width: 500px;
  }
}
.product_revise {
  height: 100%;
  overflow: auto;
  display: grid;
  // grid-template-columns: 1fr 1fr 1fr;
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
      margin: 0 auto;
      img {
        margin: 10px;
        // padding: 0 10px ;
      }
    }
    :deep(.el-form-item__content) {
      margin: auto;
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
