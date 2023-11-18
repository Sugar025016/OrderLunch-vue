<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ProductModalData, TabData } from '@/api/tab/type'
import { reqDeleteTab } from '@/api/tab/index'
import useUserStore from '@/store/modules/user'
import useSellShopStore from '@/store/modules/sellShop'
import TapModal from '../tapModal/index.vue'
import { ProductData } from '@/api/product/type'

let userStore = useUserStore()
let sellShopStore = useSellShopStore()

let $route = useRoute()

let id: number = $route.params.id

let tabProductsData = ref<TabData[]>([])

let productData = ref<ProductModalData>({
  productId: 0,
  name: '',
  description: '',
  qty: 1,
  imgUrl: '',
  prise: 0,
  department: '',
  orderUsername: '',
  remark: '',
})

const openModal = (v: ProductData) => {
  productData.value.productId = v.id
  productData.value.name = v.name
  productData.value.description = ''
  productData.value.qty = 1
  productData.value.imgUrl = v.imgUrl
  productData.value.prise = v.prise
  productData.value.department = ''
  productData.value.orderUsername = userStore.username
  productData.value.remark = ''
}

tabProductsData = computed(() => {
  return sellShopStore.shop.tabProducts
})

const scrollToSection = (sectionId: number) => {
  const element = document.getElementById(sectionId + '')

  if (element) {
    const headerHeight = 100
    const targetPosition =
      element.getBoundingClientRect().top + window.scrollY - headerHeight

    sellShopStore.scrollTop = targetPosition
  }
}

const addTab = (sectionId: number) => {
  const element = document.getElementById(sectionId + '')

  if (element) {
    const headerHeight = 100
    const targetPosition =
      element.getBoundingClientRect().top + window.scrollY - headerHeight
    sellShopStore.scrollTop = targetPosition
  }
}

const deleteTab = async (tabId: number) => {
  let res = await reqDeleteTab(tabId)
  if (res.code === 200 && res.data) {
    await sellShopStore.getSellShop(sellShopStore.shop.id)
  }
}

const editTab = (
  tab: TabData = {
    id: 0,
    name: '',
    shelve: false,
    products: [],
  },
) => {
  if (tapModalRef.value) {
    // 调用子组件的 getData 方法

    tapModalRef.value.getData(tab)
  }
}

const activeTab = ref(0)

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal?.addEventListener('shown.bs.modal', () => {
  myInput?.focus()
})

const tapModalRef = ref<typeof TapModal | null>(null)
</script>

<template>
  <div class="tabs">
    <div class="tabs-header">
      <div>
        <span
          class="change tab-label underline"
          data-bs-toggle="modal"
          data-bs-target="#tapStaticBackdrop"
          @click="editTab()"
        >
          新增分類
        </span>
      </div>
      <div
        v-for="(tab, index) in tabProductsData"
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
        v-for="(tab, index) in tabProductsData"
        :key="index"
        v-show="true"
        class="content"
        :ref="`${tab.id}`"
      >
        <div class="tab-title">
          <div class="tab-setting">
            <h3>{{ tab.name }}</h3>
            <!-- <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                v-model="tab.shelve"
                :id="tab.name"
              />
              <label class="form-check-label" :for="tab.name">
                上架{{ tab.shelve }}
              </label>
            </div> -->
          </div>
          <div class="tab-setting">
            <h3 class="change" @click="deleteTab(tab.id)">刪除</h3>
            <h3
              class="change"
              @click="editTab(tab)"
              data-bs-toggle="modal"
              data-bs-target="#tapStaticBackdrop"
            >
              編輯
            </h3>
          </div>
        </div>

        <div class="products-body">
          <component v-for="product in tab.products" :key="product.id">
            <def-product-card
              :product="product"
              @click="openModal(product)"
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

  <tap-modal
    :v-if="openModal"
    :products="sellShopStore.shop.products"
    :title="
      sellShopStore.shop.products.length > 0
        ? '分類 設定'
        : '還沒有餐點，請新增餐點'
    "
    ref="tapModalRef"
  ></tap-modal>
</template>

<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
@import 'node_modules/bootstrap/scss/buttons';
@import 'node_modules/bootstrap/scss/_forms.scss';
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

      .shop-button {
        color: $color;
        font-size: 17px;
        width: 100%;
        color: $color;
      }
      .shop-button:hover {
        background-color: $color;
        color: white;
      }
    }
    .change:hover {
      color: $color-light-7;
      // color: #ffb171;
      // background-color: aquamarine;
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
    .add {
      color: #000000;
    }
    div:hover .underline {
      border-bottom: 3px solid $color;
    }
    div:hover {
      color: #000000;
    }
  }
  .tabs-content {
    // font-size: 30px;
    // margin: 10px;
    // border-bottom: #636262;
    // display: flex;
    // align-items: center;
    .content {
      margin: 25px 0;
      // background-color: aqua;
      .tab-title {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        h3 {
          margin: 10px;
          cursor: pointer;
        }
        .tab-setting {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .form-check {
            display: flex;
            align-items: center;
            padding-left: 0px;
            input {
              width: 50px;
              height: 25px;
              margin: 0 10px;
              // background-color: $color;
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
