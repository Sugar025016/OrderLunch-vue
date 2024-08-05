<script setup lang="ts">
import { reactive, ref } from 'vue'
import { PutAddMealsData, AddMealsData } from '@/api/addMeals/type'
import useUserStore from '@/store/modules/user'
import useSellShopStore from '@/store/modules/sellShop'
import { ProductData } from '@/api/product/type'
import {
  reqAddOrUpdateAddMeals,
  reqGetAddMealsProducts,
} from '@/api/addMeals/index'
import Search from '@/components/SharedComponents/search.vue'
import SellAddMealsChooseCardSet from '../SellAddMealsChooseCardSet/index.vue'
import { ElMessage } from 'element-plus'

let sellShopStore = useSellShopStore()

let userStore = useUserStore()

interface ProductSetChoose extends ProductData {
  isChoose: boolean
  isSearch: boolean
  addMealsPrice: number
}
const productSetChooses = ref<ProductSetChoose[]>([])

const addMealsProduct = ref<AddMealsData>({})

const inputUserName = ref('')
inputUserName.value = userStore.username

let addMealsParams = reactive<PutAddMealsData>({
  name: '',
  shopId: 0,
  shelve: false,
  products: [{ id: 0, price: 0 }],
})

const setAddMeals = () => {
  console.log('setAddMeals:', productSetChooses.value)
  addMealsParams = reactive<PutAddMealsData>({
    name: '',
    shopId: 0,
    shelve: false,
    products: [{ id: 0, price: 0 }],
  })
}

const getChooses = () => {
  addMealsParams.name = addMealsProduct.value?.name
    ? addMealsProduct.value?.name
    : ''
  productSetChooses.value = []
  sellShopStore.shop.products.forEach((p) => {
    const selectedAddMeals = addMealsProduct.value?.products?.find(
      (t) => t.product.id === p.id,
    )
    const productSetChoose = reactive<ProductSetChoose>({
      isChoose: false,
      id: 0,
      name: '',
      description: '',
      imgUrl: '',
      price: 0,
      isOrderable: false,
      shopId: 0,
      isSearch: false,
      addMealsPrice: 0,
    })
    Object.assign(productSetChoose, p)
    productSetChoose.addMealsPrice =  productSetChoose.price
    productSetChoose.isOrderable = p.isOrderable
    if (selectedAddMeals) {
      console.log("selectedAddMeals:",selectedAddMeals)
      productSetChoose.isChoose = true
      productSetChoose.addMealsPrice = selectedAddMeals.price
    } else {
      productSetChoose.isChoose = false
    }
    productSetChooses.value.push(productSetChoose)
  })
}

const save = async () => {
  addMealsParams.shopId = sellShopStore.shop.id
  addMealsParams.products = productSetChooses.value
    .filter((v) => v.isChoose)
    .map((choose) => {
      return { id: choose.id, price: choose.addMealsPrice }
    }) as [{ id: number; price: number }]
  let res
  if (addMealsProduct.value.id) {
    res = await reqAddOrUpdateAddMeals(addMealsParams, addMealsProduct.value.id)
  } else {
    res = await reqAddOrUpdateAddMeals(addMealsParams)
  }
  if (res.status === 200) {
    // await sellShopStore.getSellShop(sellShopStore.shop.id)
    // await reqGetAddMealsProducts(sellShopStore.shop.id)
    window.location.reload()
  }

  handleClose()
}

const getData = (t: AddMealsData) => {
  console.log('AddMealsData:', t)
  addMealsProduct.value = t
  setAddMeals()
  getChooses()
  handleOpen()
}

// const getSearchResult = (sellProductList: any) => {
//
//   if (sellProductList.length === 0) {
//
//     ElMessage({
//       showClose: true,
//       message: '沒有搜尋到',
//       type: 'warning',
//       style: 'z-index: 3000',
//     })
//
//   }
//   productSetChooses.value = sellProductList
// }

const AddMealsChooseModalOpen = ref<boolean>(false)
const handleOpen = () => {
  AddMealsChooseModalOpen.value = true
  getChooses()
}

const handleClose = () => {
  addMealsProduct.value = {}
  AddMealsChooseModalOpen.value = false
}

const searchProductIds = ref<number[]>([])

const getSearch = (sellProductList: ProductSetChoose[]) => {
  searchProductIds.value = sellProductList.map((item: any) => item.id) || []
  handleOpen()
  getSearchResult()
}

const getSearchResult = () => {
  if (searchProductIds.value.length > 0) {
    productSetChooses.value.forEach((item) => {
      if (searchProductIds.value.includes(item.id)) {
        item.isSearch = true
      } else {
        item.isSearch = false
      }
    })
  } else {
    ElMessage({
      showClose: true,
      message: '沒有搜尋到',
      type: 'warning',
    })
    productSetChooses.value.forEach((item) => (item.isSearch = false))
  }
}

defineExpose({
  getData,
  handleClose,
  handleOpen,
  getSearch,
})
</script>

<template>
  <div class="dialog">
    <el-dialog
      v-model="AddMealsChooseModalOpen"
      :before-close="handleClose"
      width="50%"
      height="100%"
      top="2vh"
      z-index="2000"
      lock-scroll="false"
    >
      <div class="add-meals-choose">
        <div class="modal-header">
          <input
            type="text"
            class="rounded-input"
            placeholder="輸入加購分類名稱"
            v-model="addMealsParams.name"
          />
        </div>
        <div class="item">
          <!-- <el-radio-group v-model="radio1" class="radio"> -->
          <el-scrollbar max-height="700px">
            <Search
              v-if="sellShopStore.shop.products.length > 0"
              class="productSetChooses"
              v-on:search-result="getSearch"
              :products="sellShopStore.shop.products"
            ></Search>
            <div
              v-if="productSetChooses.length > 0"
              class="products-card"
              v-for="product in productSetChooses"
              :key="product.id"
            >
              <!-- <hr v-if="i > 0" /> -->
              <SellAddMealsChooseCardSet
                v-if="product.isSearch"
                :product="product"
                :setting="true"
                :choose="true"
              ></SellAddMealsChooseCardSet>
            </div>
            <hr v-if="productSetChooses.length > 0" />
            <div
              class="products-card"
              v-for="(product, i) in productSetChooses"
              :key="product.id"
            >
              <SellAddMealsChooseCardSet
                v-if="!product.isSearch"
                :product="product"
                :setting="true"
                :choose="true"
              ></SellAddMealsChooseCardSet>
            </div>
            <router-link
              class="box-item"
              :to="`/sell/${sellShopStore.shop.id}/product`"
              v-if="sellShopStore.shop.products.length <= 0"
            >
              <el-tooltip
                class="box-item"
                effect="dark"
                content="新增餐點"
                placement="bottom-end"
              >
                <def-product-card :setting="true"></def-product-card>
              </el-tooltip>
            </router-link>
          </el-scrollbar>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">Cancel</el-button> -->
          <el-button type="primary" @click="save()">確認</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.dialog {
  ::v-deep .el-dialog {
    border-radius: 20px;
    min-width: 350px;
    max-width: 450px;
    .el-dialog__body {
      padding: 10px 20px;
    }
    .add-meals-choose {
      .modal-header {
        width: 100%;
        background-position: center;
        background-size: cover;
        margin: 0px 0 10px 0;
        border-radius: 20px;

        .rounded-input {
          margin: 0 0 0 20px;
          padding: 0 20px;
          width: 100%;
          width: calc(100% - 50px);
          border: 1px solid #ccc;
          font-size: 20px;
          border-radius: 20px;
          // margin-bottom: 10px;
          background-color: #50505000;
          height: 40px;
        }
      }

      .productSetChooses {
        padding: 0px;
      }
      .item {
        // background-color: rgb(41, 41, 41);
        .el-scrollbar__view {
          padding: 10px 0px 0 0px;
          .el-form {
            background-color: rgb(255, 230, 199);
            padding: 12px 16px 6px 16px;
            // display: flex;
            grid-template-columns: none;
            border-radius: 20px;

            .asterisk-left {
              min-width: 200px;
            }
          }
          .el-form-item {
            margin-bottom: 8px;
            .el-form-item__content {
              justify-content: flex-end;
              flex-direction: row;
            }
          }
        }
      }

      .products-card {
        margin: 10px 0;
      }

      .el-dialog__footer {
        padding: 0 20px 20px 20px;
      }
    }
  }
}
</style>
