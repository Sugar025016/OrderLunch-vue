<script setup lang="ts">
import { reactive, ref } from 'vue'
import { PutTabData, TabData } from '@/api/tab/type'
import useUserStore from '@/store/modules/user'
import useSellShopStore from '@/store/modules/sellShop'
import { ProductData } from '@/api/product/type'
import { reqAddOrUpdateTab } from '@/api/tab'
import Search from '@/components/SharedComponents/search.vue'
import SellAddMealsChooseCard from '../SellAddMealsChooseCard/index.vue'

let sellShopStore = useSellShopStore()

let userStore = useUserStore()
const chooses = ref<ChooseProduct[]>([])
interface ChooseProduct extends ProductData {
  isChoose: boolean
}

const choosesAll = ref<Boolean>()
const tapProduct = ref<TabData>()
const discount = ref<number>()

const inputUserName = ref('')
inputUserName.value = userStore.username
const count = ref(1)
count.value = 1

let tabParams = reactive<PutTabData>({
  id: 0,
  name: '',
  shopId: 0,
  shelve: false,
  productIds: [],
})

const setTab = () => {
  tabParams = reactive<PutTabData>({
    id: tapProduct.value?.id,
    name: tapProduct.value?.name as string,
    shopId: 0,
    shelve: tapProduct.value?.shelve as boolean,
    productIds: [],
  })
}

const getChooses = () => {
  chooses.value = []
  sellShopStore.shop.products.forEach((p) => {
    const selectedTab = tapProduct.value?.products.find((t) => t.id === p.id)
    const choose = reactive<ChooseProduct>({
      isChoose: false,
      id: 0,
      name: '',
      description: '',
      imgUrl: '',
      prise: 0,
      isOrderable: false,
      shopId: 0,
    })
    Object.assign(choose, p)

    choose.isOrderable = p.isOrderable
    if (selectedTab) {
      choose.isChoose = true
    } else {
      choose.isChoose = false
    }
    chooses.value.push(choose)
  })
}

const save = async () => {
  tabParams.shopId = sellShopStore.shop.id
  tabParams.productIds = chooses.value
    .filter((v) => v.isChoose)
    .map((choose) => choose.id)
  let res = await reqAddOrUpdateTab(tabParams)
  if (res.code === 200 && res.data) {
    await sellShopStore.getSellShop(sellShopStore.shop.id)
  }
}

const getData = (t: TabData) => {
  tapProduct.value = t
  getChooses()
  setTab()
}

const getSearchResult = (sellProductList: any) => {
  chooses.value = sellProductList
}

const AddMealsChooseModalOpen = ref<boolean>(false)
const handleOpen = () => {
  AddMealsChooseModalOpen.value = true
}

const handleClose = () => {
  AddMealsChooseModalOpen.value = false
}

defineExpose({
  getData,
  handleClose,
  handleOpen,
})
</script>

<template>
  <div class="dialog">
    <!-- <el-dialog
      v-model="AddMealsChooseModalOpen"
      :before-close="handleClose"
      width="50%"
    >
      <div class="modal-body">
        <Search
          v-if="sellShopStore.shop.products.length > 0"
          class="search"
          v-on:search-result="getSearchResult"
          :products="sellShopStore.shop.products"
        ></Search>
        <el-scrollbar max-height="50vw">
          <div
            class="products-card"
            v-for="product in sellShopStore.shop.products"
            :key="product.id"
          >
            <def-product-card
              :product="product"
              :setting="true"
              :choose="true"
            ></def-product-card>
          </div>
          <router-link
            class="box-item"
            :to="`/sell/${sellShopStore.shop.id}/product`"
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
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog> -->

    <!-- <el-dialog
      v-model="AddMealsChooseModalOpen"
      :before-close="handleClose"
      width="50%"
    > -->
    <el-dialog
      v-model="AddMealsChooseModalOpen"
      :before-close="handleClose"
      width="50%"
      height="100%"
      top="2vh"
    >
      <div class="add-meals-choose">
        <div class="modal-header">
          <input
            type="text"
            class="rounded-input"
            placeholder="輸入加購分類名稱"
            v-model="tabParams.name"
          />
        </div>
        <div class="item">
          <!-- <el-radio-group v-model="radio1" class="radio"> -->

          <el-scrollbar max-height="700px">
            <Search
              v-if="sellShopStore.shop.products.length > 0"
              class="search"
              v-on:search-result="getSearchResult"
              :products="sellShopStore.shop.products"
            ></Search>
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
            <div
              class="products-card"
              v-for="(product, i) in sellShopStore.shop.products"
              :key="product.id"
            >
              <hr v-if="i > 0" />
              <SellAddMealsChooseCard
                :product="product"
                :setting="true"
                :choose="true"
              ></SellAddMealsChooseCard>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
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
      padding: 10px 20px ;
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

      .search {
        padding: 0px;
      }
      .el-scrollbar__view {
        padding: 10px 0px 0 0px;
        .el-form {
          margin: 0px 10px 10px 10px;
          // display: flex;
          grid-template-columns: none;

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
