<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SellAddMealsModal from './SellAddMealsModal/index.vue'
import { reqDeleteAddMeals, reqGetAddMealsProducts } from '@/api/addMeals/index'
import useSellShopStore from '@/store/modules/sellShop'
import SellAddMealsChooseCard from './SellAddMealsChooseCard/index.vue'
import { AddMealsListData } from '@/api/addMeals/type'
import { Delete } from '@element-plus/icons-vue'
const sellAddMealsModalRef = ref<typeof SellAddMealsModal>()

let sellShopStore = useSellShopStore()

// let addMealsDatas = ref<AddMealsListData>([])

// interface AddMealsProductListData extends AddMealsListData {
//   isChoose: boolean
//   isSearch: boolean
//   addMealsPrice: number
// }
const deleteAddMeal = async (id: number) => {
  if (id != 0) {
    let res = await reqDeleteAddMeals(id)
    if (res.status == 200) {
      window.location.reload()
    }
  }
}
// const getAddMeals = async () => {
//   let res = await reqGetAddMealsProducts(sellShopStore.shop.id)

//   if (res.status === 200 && res.data) {
//     addMealsDatas.value = res.data

//     // await addMealsDatas.value.forEach((item) => {
//     //   if (item.products.length > 0) {
//     //     item.products.forEach((addMealsProduct) => {
//     //       sellShopStore.shop.products.forEach((product) => {
//     //         if (addMealsProduct.id === product.id) {
//     //           addMealsProduct.product = product
//     //         }
//     //       })
//     //     })
//     //   }
//     // })

//     //
//     //
//   } else {
//   }
// }

// onMounted(() => {
//   getAddMeals()
// })

// const addMealsproducts = ref<ProductSetChoose[]>([])
// const getChooses = () => {
//   addMealsproducts.value = []

//   sellShopStore.shop.products.filter((v)=> addMealsDatas.)

//   sellShopStore.shop.products.forEach((p) => {
//     const selectedTab = tapProduct.value?.products.find((t) => t.id === p.id)
//     const productSetChoose = reactive<ProductSetChoose>({
//       isChoose: false,
//       id: 0,
//       name: '',
//       description: '',
//       imgUrl: '',
//       price: 0,
//       isOrderable: false,
//       shopId: 0,
//       isSearch: false,
//     })
//     Object.assign(productSetChoose, p)

//     productSetChoose.isOrderable = p.isOrderable
//     if (selectedTab) {
//       productSetChoose.isChoose = true
//     } else {
//       productSetChoose.isChoose = false
//     }
//     addMealsproducts.value.push(productSetChoose)
//   })
// }
</script>

<template>
  <div class="add-meals">
    <div class="products-relative">
      <div class="add-product">
        <el-card
          class="productCard addCard"
          @click="sellAddMealsModalRef?.handleOpen()"
        >
          <div class="products-content add">
            <div class="add-icon">
              <el-icon :size="30"><Plus /></el-icon>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <template v-for="item in sellShopStore.shop.addMeals">
      <div class="products-relative">
        <div class="add-product">
          <el-button
            type="danger"
            class="addMeal-delete"
            :icon="Delete"
            circle
            @click="deleteAddMeal(item.id ? item.id : 0)"
          />
          <el-card
            class="productCard"
            @click="sellAddMealsModalRef?.getData(item)"
          >
            <!-- <hr/> -->

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
  </div>

  <SellAddMealsModal ref="sellAddMealsModalRef"></SellAddMealsModal>
</template>

<style lang="scss" scoped>
$breakpoint-xs-adjusted: calc(#{$breakpoint-xs} - 200px);
$breakpoint-sm-adjusted: calc(#{$breakpoint-sm} + 200px);
$breakpoint-md-adjusted: calc(#{$breakpoint-md} + 360px);
$breakpoint-xl-adjusted: calc(#{$breakpoint-xl} + 200px);
$breakpoint-xxl-adjusted: calc(#{$breakpoint-xxl} + 200px);
.add-meals {
  display: grid; /* 使用CSS Grid布局 */
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  margin: 10px 0;
  padding: 0 5px;

  text-align: center; /* 水平居中文本 */

  @media (min-width: $breakpoint-xs-adjusted) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: $breakpoint-sm-adjusted) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $breakpoint-md-adjusted) {
    grid-template-columns: repeat(3, 1fr);
  }

  // @media (min-width: $breakpoint-xl-adjusted) {
  //   grid-template-columns: repeat(3, 1fr);
  // }
  @media (min-width: $breakpoint-xxl-adjusted) {
    grid-template-columns: repeat(4, 1fr);
  }

  .products-relative {
    min-height: 250px;
  }
  .add-product {
    position: relative;
    min-width: 350px;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    .el-button {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
    }
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
  }
  .add-product:hover {
    z-index: 10;
    .el-button {
      z-index: 100;
    }
    .productCard {
      background-color: rgb(249, 249, 249);
      position: absolute;
      height: auto;
      z-index: 10;
      left: 50%;
      transition: none;
      transform: translateX(-50%) scale(1.02);
      min-width: 350px;
      max-width: 450px;
      max-height: 520px;

      width: 100%;
      overflow: auto;
    }
  }

  .addCard {
    cursor: pointer;

    :deep(.el-card__body) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .add {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      .add-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0 10px 10px 0;
        padding: 14px;
        border: 2px solid #a1a1a154;
      }
    }
  }
  .addCard:active {
    background-color: #dddddd8a;
  }
}
</style>
