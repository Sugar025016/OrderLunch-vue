<template>
  <div class="tabs">
    <div class="tabs-header">
      <div
        v-for="(tab, index) in TabProductsData"
        :key="index"
        :class="{ active: activeTab === index }"
      >
        <span class="tab-label underline" @click="scrollToSection(tab.id)">
          {{ tab.name }}
        </span>
      </div>
    </div>
    <div class="tabs-content">
      <div
        :id="tab.id.toString()"
        v-for="(tab, index) in TabProductsData"
        :key="index"
        v-show="true"
        class="content"
        :ref="`${tab.id}`"
      >
        <h3>{{ tab.name }}</h3>
        <div class="products-body">
          <component v-for="product in tab.products" :key="product.id">
            <def-product-card
              v-if="shopData.orderable"
              :product="product"
              @click="openModal(product)"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            ></def-product-card>

            <el-tooltip
              effect="light"
              :content="'電話訂購：' + shopData.phone"
              class="box-item"
              v-else
            >
              <def-product-card :product="product"></def-product-card>
            </el-tooltip>
          </component>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="divider"></div>
    <div class="content"></div>
  </div>

  <product-modal :product="productData" title="Modal Title"></product-modal>
</template>

<script setup lang="ts">
import productModal from '../productModal/index.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { reqGetTabProducts } from '@/api/tab'
import {
  ProductModalData,
  TabProductsResponseData,
  TabData,
} from '@/api/tab/type'

import { ProductData } from '@/api/product/type'
import useUserStore from '@/store/modules/user'
import useShopStore from '@/store/modules/shop'
import { getShop } from '@/api/shop'
import { ShopDetailData, ShopResponseData } from '@/api/shop/type'

let userStore = useUserStore()
let shopStore = useShopStore()

let $route = useRoute()

let id: number = Number($route.params.id)

let TabProductsData = ref<TabData[]>([])

let productData = ref<ProductModalData>({
  productId: 0,
  name: '',
  description: '',
  qty: 1,
  imgUrl: '',
  price: 0,
  department: '',
  orderUsername: '',
  remark: '',
  shopId: 0,
})

let shopData = ref<ShopDetailData>({
  id: 0,
  name: '',
  description: '',
  address: {
    city: '',
    area: '',
    street: '',
    detail: '',
    lat: undefined,
    lng: undefined,
  },
  imgId: 0,
  imgUrl: '',
  tabProducts: [],
  products: [],
  orderable: false,
  schedules: [],
  addMeals: [],
  category: [],
})

const openModal = (v: ProductData) => {
  productData.value.productId = v.id
  productData.value.name = v.name
  productData.value.description = ''
  productData.value.qty = 1
  productData.value.imgUrl = v.imgUrl
  productData.value.price = v.price
  productData.value.department = ''
  productData.value.orderUsername = userStore.username
  productData.value.remark = ''
  productData.value.shopId = v.shopId
}

const getProductsData = async (id: number) => {
  let res: TabProductsResponseData = await reqGetTabProducts(id)
  TabProductsData.value = res.data
}

const getShopData = async (id: number) => {
  let res: ShopResponseData = await getShop(id)

  shopData.value = res.data
}

const scrollToSection = (sectionId: number) => {
  const element = document.getElementById(sectionId + '')

  if (element) {
    const headerHeight = 100
    const targetPosition =
      element.getBoundingClientRect().top + window.scrollY - headerHeight
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    shopStore.scrollTop = targetPosition
  }
}

onMounted(() => {
  getProductsData(id)
  getShopData(id)
})

const activeTab = ref(0)

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal?.addEventListener('shown.bs.modal', () => {
  myInput?.focus()
})
</script>

<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
@import '../../../../../../node_modules/bootstrap/scss/buttons';

.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.el-dialog {
  background-image: url('@/assets/images/product001.jpeg') !important; /* 設置背景圖片 */
  border-radius: 10px !important;

  img {
    // width: 100%;
    // height: auto;
    // background-color: aqua;
  }
}

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

.tabs {
  width: 100%;
  .tabs-header {
    display: flex;
    margin: 20px 0 0 0;
    color: #636262;
    border-bottom: 1px solid #63626236;
    white-space: nowrap;
    overflow-x: auto;
    div {
      position: relative;
      padding: 0 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .tab-label {
      display: inline-block;
      position: relative;
      padding: 16px 0;
      z-index: 1;
      font-size: 20px;
      height: 50px;
      width: 100%;
    }

    .underline {
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: transparent;
      transition: background-color 0.2s;
      display: inline-flex;
      position: relative;
      align-items: center;
      justify-content: center;
      border-bottom: 3px solid rgba(255, 0, 0, 0);
    }
    div:hover .underline {
      border-bottom: 3px solid $color;
    }
    div:hover {
      color: #000000;
    }
  }
  .tabs-content {
    .content {
      margin: 25px 0;
    }
  }
}

.products-title {
  font-size: 30px;
  margin: 20px;
}

.products-body {
  display: grid; /* 使用CSS Grid布局 */
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  @media (min-width: $breakpoint-xs) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: $breakpoint-xxl) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
