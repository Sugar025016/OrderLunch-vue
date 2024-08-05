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
      >
        <h3>{{ tab.name }}</h3>
        <div class="products-body">
          <component v-for="product in tab.products" :key="product.id">
            <def-product-card
              :product="product"
              @click="openModal(product)"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            ></def-product-card>
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
import productsCard from '.././productsCard/index.vue'
import productModal from '../productModal/index.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { reqGetTabProducts } from '@/api/tab/index'
import {
  ProductModalData,
  TabProductsResponseData,
  TabData,
} from '@/api/tab/type'

import { ProductData } from '@/api/product/type'
import useUserStore from '@/store/modules/user'
import { ElScrollbar } from 'element-plus'

let userStore = useUserStore()

let $route = useRoute()

let id: number = Number($route.params.id)

let TabProductsData = ref<TabData[]>([])
const isProductModalVisible = ref(false) // 控制是否显示 product-modal
// const productData = ref({ /* 你的产品数据 */ })

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
}

const getProductsData = async (id: number) => {
  let res: TabProductsResponseData = await reqGetTabProducts(id)
  TabProductsData.value = res.data
}

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const scrollToSection = (sectionId: number) => {
  const element = document.getElementById(sectionId.toString())
  if (element) {
    const headerHeight = 100
    const targetPosition =
      element.getBoundingClientRect().top + window.scrollY - headerHeight
    scrollbarRef.value!.setScrollTop(targetPosition)
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    // element.scrollIntoView({ behavior: 'smooth' })
  }
  // VueScrollTo.scrollTo(`#${sectionId}`, 500, { easing: 'ease-in-out' });
}

onMounted(() => {
  getProductsData(id)
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
