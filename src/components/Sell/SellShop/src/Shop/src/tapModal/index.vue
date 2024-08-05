<script setup lang="ts">
import { reactive, ref } from 'vue'
import { PutTabData, TabData } from '@/api/tab/type'
import useUserStore from '@/store/modules/user'
import useSellShopStore from '@/store/modules/sellShop'
import { ProductData } from '@/api/product/type'
import { reqAddOrUpdateTab } from '@/api/tab'
import Search from '@/components/SharedComponents/search.vue'

let sellShopStore = useSellShopStore()

let userStore = useUserStore()

interface ProductSetChoose extends ProductData {
  isChoose: boolean
  isSearch: boolean
}
const productSetChooses = ref<ProductSetChoose[]>([])

const tapProduct = ref<TabData>()

const inputUserName = ref('')
inputUserName.value = userStore.username

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
  productSetChooses.value = []
  sellShopStore.shop.products.forEach((p) => {
    const selectedTab = tapProduct.value?.products.find((t) => t.id === p.id)
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
    })
    Object.assign(productSetChoose, p)

    productSetChoose.isOrderable = p.isOrderable
    if (selectedTab) {
      productSetChoose.isChoose = true
    } else {
      productSetChoose.isChoose = false
    }
    productSetChooses.value.push(productSetChoose)
  })
}

const save = async () => {
  tabParams.shopId = sellShopStore.shop.id
  tabParams.productIds = productSetChooses.value
    .filter((v) => v.isChoose)
    .map((choose) => choose.id)
  let res = await reqAddOrUpdateTab(tabParams)
  if (res.status === 200) {
    await sellShopStore.getSellShop(sellShopStore.shop.id)
  }
}

const getData = (t: TabData) => {
  tapProduct.value = t
  getChooses()
  setTab()
  getSearchResult()
}

const searchProductIds = ref<number[]>([])

const getSearch = (sellProductList: ProductSetChoose[]) => {
  searchProductIds.value = sellProductList.map((item: any) => item.id) || []
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
    productSetChooses.value.forEach((item) => (item.isSearch = false))
  }
}

defineExpose({
  getData,
})
</script>

<template>
  <div
    class="modal fade"
    id="tapStaticBackdrop"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <input
            type="text"
            class="rounded-input"
            placeholder="輸入分類名稱"
            v-model="tabParams.name"
          />
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- <div class="form-check">
          <input
            class="checkbox"
            type="checkbox"
            id="flexCheckDefault"
            v-model="choosesAll"
          />
          <label class="form-check-label" for="flexCheckDefault">全選</label>
        </div> -->
        <hr class="divider" />
        <div class="modal-body">
          <Search
            v-if="sellShopStore.shop.products.length > 0"
            class="search"
            v-on:search-result="getSearch"
            :products="sellShopStore.shop.products"
          ></Search>

          <div
            v-if="productSetChooses.length > 0"
            class="products-card"
            v-for="product in productSetChooses"
            :key="product.id"
          >
            <def-product-card
              v-if="product.isSearch"
              :product="product"
              :setting="true"
              :choose="true"
            ></def-product-card>
          </div>

          <hr v-if="productSetChooses.length > 0" class="hr-chooses" />
          <div
            v-if="productSetChooses.length > 0"
            class="products-card"
            v-for="product in productSetChooses"
            :key="product.id"
          >
            <def-product-card
              v-if="!product.isSearch"
              :product="product"
              :setting="true"
              :choose="true"
            ></def-product-card>
          </div>

          <router-link
            v-if="sellShopStore.shop.products.length === 0"
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
        </div>
        <div class="modal-footer">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              v-model="tabParams.shelve"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              啟用
            </label>
          </div>
          <div class="footer-button">
            <el-button
              type="warning"
              class="btn btn-primary"
              size="large"
              data-bs-dismiss="modal"
              round
              plain
            >
              取消
            </el-button>
            <el-button
              type="warning"
              class="btn btn-primary"
              size="large"
              @click="save()"
              data-bs-dismiss="modal"
              plain
              round
            >
              確認
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
@import 'node_modules/bootstrap/scss/_modal.scss';
@import 'node_modules/bootstrap/scss/_close.scss';
@import 'node_modules/bootstrap/scss/_forms.scss';
@import 'node_modules/bootstrap/scss/forms/_form-check.scss';

.divider {
  border-color: #ccc;
  margin: 0px;
}
.modal-dialog {
  .modal-content {
    border-radius: 20px;

    .btn-close {
      background-color: white;
      border-radius: 20px;
      position: absolute;
      top: 30px;
      right: 30px;
    }
    .modal-header {
      width: 100%;
      background-position: center;
      background-size: cover;
      margin: 20px 0 0px 0;
      .rounded-input {
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
      margin: 0 0 0 5px;
    }

    .hr-chooses {
      margin: 30px 0;
      // border-color:red;
      // border-radius:2px red;
      border: 1px solid $color;
    }
    .modal-body {
      .products-card {
        margin: 10px 0;
      }
      .modal-description {
        font-size: 10px;
      }
      .divider {
        margin: 10px 0;
        border-color: #505050;
        height: 2px;
      }
      .modal-body-content {
        display: flex;
        flex-direction: column;
        margin: 10px 0 0 0;
        .rounded-input {
          padding: 0 10px;
          border: 1px solid #ccc;
          font-size: 20px;
          border-radius: 20px;
          margin-bottom: 10px;
          background-color: #50505000;
          height: 40px;
        }
        span {
          margin: 20px;
        }
      }
    }
    .modal-footer {
      display: flex;
      justify-content: space-between;
      .btn {
        border-radius: 20px;
        border: 0;
        font-size: 18px;
        color: $color;
      }

      .btn:hover {
        background-color: $color;
        color: white;
      }
      .count {
        .btn-count {
          margin: 0 20px;
        }
      }
      .form-check {
        display: flex;
        align-items: center;

        input {
          width: 50px;
          height: 25px;
          margin: 0 10px;
          border-color: $color;
          user-select: none; /* 防止文字被滑鼠選取反白 */
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23ccc'/%3e%3c/svg%3e");
          caret-color: transparent;
        }
        input:checked {
          background-color: $color;
          border: red;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
        }
        .form-check-label {
          font-size: 22px;
          color: $color;
        }
      }
    }
  }
}

.form-check {
  display: flex;
  align-items: center;

  .checkbox {
    height: 18px;
    width: 18px;
    // position: absolute;
    // background-color: $color;
    margin: 0;
  }

  .checkbox:checked::before {
    content: '\2713'; /* 这是 Unicode 编码的勾选符号 */
    font-size: 30px; /* 勾选标志的大小 */
    color: #fff; /* 勾选标志的颜色 */
    position: absolute; /* 使勾选标志居中 */
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    width: 18px; /* 勾选标志的宽度 */
    height: 18px; /* 勾选标志的高度 */
    line-height: 14px; /* 行高与高度相同，使文本垂直居中 */
    background-color: $color;
    vertical-align: middle;
    border: 1px solid #f80505;
  }
  .form-check-label {
    font-size: 14px;
    color: $color;
    margin: 0 10px;
  }
}
</style>
