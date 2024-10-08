<script setup lang="ts">
import { deleteSecond as showTime } from '@/utils/time'
import { House, ChatRound, User, Watch } from '@element-plus/icons-vue'
import { ref, computed, onMounted } from 'vue'
import useSellShopStore from '@/store/modules/sellShop'
import { ShopDetailData } from '@/api/shop/type'
import EditScheduleModel from './EditScheduleModel.vue'

import EditShopModel from './EditShopModel.vue'

const scheduleVisible = ref(false)

const dialogTitle = ref('My Dialog Title')

const dialogMessage = ref('This is a dialog message.')

const EditShopRef = ref<typeof EditShopModel>()

const shopDrawer = ref(false)

const shopDrawerOpen = () => {
  // sellShopStore.shopDrawer = true
  shopDrawer.value = true
  EditShopRef.value?.updateShop()
}

let sellShopStore = useSellShopStore()

let shopData = ref<ShopDetailData>({
  id: 0,
  name: '',
  description: '',
  address: {
    id: 0,
    city: '',
    area: '',
    street: '',
    detail: '',
    lat: undefined,
    lng: undefined,
  },
  phone: '',
  imgId: 0,
  imgUrl: '',
  schedules: [
    {
      id: 0,
      week: 0,
      timePeriods: [
        {
          startTime: '',
          endTime: '',
        },
      ],
    },
  ],
  orderable: false,
  tabProducts: [],
  products: [],
  addMeals: [],
  category: [],
})

shopData = computed(() => {
  return sellShopStore.shop
})

const shopImageStyle = computed(() => {
  if (shopData.value && shopData.value.imgUrl) {
    return {
      backgroundImage: `url(${shopData.value.imgUrl})`,
    }
  }
  return {}
})

const isShopDrawerOpen = () => {
  // sellShopStore.shop.id 先確認資料已經載入，!sellShopStore.shop.imgUrl判斷有無圖片
  if (sellShopStore.shop.id && !sellShopStore.shop.imgUrl) {
    shopDrawerOpen()
  }
}

onMounted(() => {
  isShopDrawerOpen()
})

const currentDate = new Date()
const dayOfWeek = currentDate.getDay()
</script>
<template>
  <div class="">
    <div class="shop">
      <div class="shop-card">
        <div
          :span="12"
          class="shop-img"
          :style="shopImageStyle"
          v-if="shopData?.imgUrl"
        >
          <div class="shop-border">
            <div class="overlay" v-if="shopData?.orderable"></div>
          </div>
        </div>
        <div class="shop-content">
          <div class="shop-title">
            <span>{{ shopData?.name }}</span>
            <span class="change" @click="shopDrawerOpen">編輯商店</span>
            <!-- <div @click="changeFavorite" class="favorite">
              <def-svg-icon
                class="buy-svg-icon"
                name="favorite"
                :color="favorite"
                width="30px"
                height="30px"
              ></def-svg-icon>
            </div> -->
          </div>
          <div class="shop-remark">
            <span>
              {{ shopData?.description }}
            </span>
          </div>
          <div class="shop-information">
            <div class="information">
              <el-icon :size="20"><Location /></el-icon>
              <span>地址：</span>
              <span>
                <span>
                  {{
                    shopData?.address.city +
                    shopData?.address.area +
                    shopData?.address.street +
                    shopData?.address.detail
                  }}
                </span>
              </span>
            </div>
            <div class="information">
              <el-icon :size="20"><Phone /></el-icon>
              <span>電話：</span>
              <span>{{ shopData?.phone }}</span>
            </div>
            <div class="information">
              <el-icon :size="20"><Watch /></el-icon>
              <span>今日營業時間：</span>
              <div
                v-if="
                  shopData?.schedules &&
                  shopData?.schedules[dayOfWeek]?.timePeriods.length > 0
                "
                v-for="(timePeriod, i) in shopData?.schedules[dayOfWeek]
                  .timePeriods"
                class="times"
              >
                <span v-if="i > 0">,</span>
                <span>
                  {{ showTime(timePeriod.startTime) }}~{{
                    showTime(
                      timePeriod.endTime === '00:00:00'
                        ? '24:00'
                        : timePeriod.endTime,
                    )
                  }}
                </span>
              </div>
              <!-- <span v-else>{{ shopData?.schedules[dayOfWeek] }}</span> -->
              <span v-else>非營業日</span>

              <div class="information-set">
                <span class="change" @click="scheduleVisible = true">
                  <el-icon><WarningFilled /></el-icon>
                  編輯營業時間
                </span>
              </div>
              <!-- <el-link
                class="more"
                data-bs-toggle="modal"
                data-bs-target="#shopInfoModal"
              >

                <el-icon><WarningFilled /></el-icon>
                更多資訊
              </el-link> -->
            </div>
          </div>

          <div class="header-link">
            <socialMedia></socialMedia>
          </div>
        </div>
      </div>
    </div>
  </div>
  <EditScheduleModel
    v-model:scheduleVisible="scheduleVisible"
    :title="dialogTitle"
    :message="dialogMessage"
    :schedules="shopData.schedules"
  />

  <EditShopModel
    v-model:shopDrawer="shopDrawer"
    :title="dialogTitle"
    :message="dialogMessage"
    :schedules="shopData.schedules"
    ref="EditShopRef"
  />
</template>

<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
@import 'node_modules/bootstrap/scss/_modal.scss';
@import 'node_modules/bootstrap/scss/close';

$b-color: $color;
.shop {
  .shop-card {
    display: flex;
    align-items: center;
    justify-content: center;
    display: grid; /* 使用CSS Grid布局 */
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
    @media (min-width: $breakpoint-xs) {
      grid-template-columns: repeat(1, 1fr);
    }

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(2, 1fr);
    }
    .shop-img {
      margin: 0px;
      padding: 0px;
      flex: 1;
      display: flex;
      width: 100%;
      height: 380px;
      background-position: center;
      background-size: cover;
      border-radius: 20px;
      padding: 5px 5px 5px 5px;
      min-width: 360px;
      position: relative;
      .shop-border {
        height: 100%;
        width: 100%;
        border-radius: 20px;
        border: white 1px solid;
        // overflow: hidden;
        display: flex;
      }
      .overlay {
        position: absolute;
        top: -10%;
        left: -8%;
        // padding: 10px;
        height: 35%; /* 這裡修改為 100% */
        width: 200px;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url('@/assets/images/plateOrder.png');
        background-position: top left;
        @media (max-width: $breakpoint-md) {
          top: -40px;
          left: -30px;
        }
        @media (max-width: $breakpoint-xs) {
          top: -30px;
          left: -20px;
        }
      }
    }

    .shop-content {
      border-radius: 20px;
      box-shadow: 0px 4px 3px 2px rgba(255, 255, 255, 0.1);
      background-color: rgb(255, 230, 193);
      padding: 30px;
      margin: 10px;
      width: auto;
      min-width: 360px;
      z-index: 10;

      .shop-title {
        display: flex;
        width: 100%;
        margin: 0 0 5px 0;
        flex-wrap: wrap; /* 允許換行 */

        justify-content: space-between;
        .favorite {
          display: flex;
          justify-content: center; /* 水平置中 */
          align-items: center; /* 垂直置中 */
        }
        .favorite:hover {
          cursor: pointer; /* 添加手型光标效果 */
        }

        span {
          font-size: 50px;
        }
      }
      .shop-remark {
        font-size: 20px;
      }

      .shop-information {
        margin: 30px 0;
        .information {
          margin: 10px 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap; /* 允許換行 */
          span {
            margin-left: 5px;
            display: block;
            word-wrap: break-word;
            word-break: break-all;
            max-width: 100%;
            color: rgba(0, 0, 0, 0.801);
            font-size: 20px;
          }

          .times {
            display: flex;
            align-items: center;
          }

          .information-set {
            margin: 4px 0 0 8px;
            display: flex;
            align-items: center;
            .el-icon {
              margin: 4px 0 0 0;
              width: 16px;
              height: 16px;
            }
            span {
              margin-left: 5px;
              display: block;
              word-wrap: break-word;
              word-break: break-all;
              max-width: 100%;
              color: rgba(0, 0, 0, 0.801);
              font-size: 16px;
            }
            el-icon {
              width: 20px;
              height: 0px;
            }
            .change {
              color: $color;
              cursor: pointer;
              outline: none;
              caret-color: transparent;
            }

            .change:hover {
              color: $color-light-7;
            }
            .times {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
    @media (max-width: $breakpoint-xs) {
      .shop-img {
        height: 250px;
      }

      .shop-content {
        padding: 20px;
        margin: 0;
        .shop-title {
          span {
            font-size: 30px;
          }
        }

        .shop-information {
          margin: 20px 0;
          .information {
            margin: 3px 0;
            span {
              margin-left: 5px;
              font-size: 14px;
            }

            .more {
              margin: 0 0 0 8px;
              font-size: 12px;
              .el-icon {
                width: 12px;
                height: 12px;
              }
            }
          }
        }
      }
    }
  }
}
.header-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 50;
}

// $b-color: $color;
// .shop {
//   .shop-card {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     .shop-img {
//       margin: 0px;
//       padding: 0px;
//       flex: 1;
//       display: flex;
//       width: 100%;
//       height: 380px;
//       background-size: cover;
//       border-radius: 20px;
//       padding: 5px 5px 5px 5px;
//       background-position: center;
//       .shop-border {
//         height: 100%;
//         width: 100%;
//         border-radius: 20px;
//         border: white 1px solid;
//         overflow: hidden;
//         display: flex;
//       }
//     }
//     .shop-content {
//       box-shadow: 2px 0px 3px 2px rgba(0, 0, 0, 0.1);
//       // box-shadow: 0 0 5px blue, 0 0 10px green, 0 0 15px yellow , 0 0 15px yellow;
//       background-color: rgb(255, 255, 254);
//       padding: 30px;
//       height: 340px;
//       margin: 2px;
//       .shop-title {
//         display: flex;
//         width: 100%;
//         margin: 0 0 5px 0;

//         justify-content: space-between;
//         .favorite {
//           display: flex;
//           justify-content: center; /* 水平置中 */
//           align-items: center; /* 垂直置中 */
//         }
//         .favorite:hover {
//           cursor: pointer; /* 添加手型光标效果 */
//         }
//         img {
//           width: 50px;
//           height: 50px;
//           border-radius: 20px;
//           margin: 0 10px;
//         }
//         span {
//           font-size: 50px;
//         }
//       }
//       .shop-remark {
//         span {
//           display: block;
//           word-wrap: break-word;
//           word-break: break-all;
//           max-width: 100%;
//           color: rgba(134, 134, 134, 0.801);
//           font-size: 20px;
//         }
//       }
//       .shop-information {
//         margin: 40px 0;
//         .information {
//           margin: 10px 0;
//           display: flex;
//           align-items: center;
//           span {
//             margin-left: 5px;
//             display: block;
//             word-wrap: break-word;
//             word-break: break-all;
//             max-width: 100%;
//             color: rgba(0, 0, 0, 0.801);
//             font-size: 20px;
//           }
//           el-icon {
//             width: 20px;
//             height: 0px;
//           }
//           .change {
//             color: $color;
//             cursor: pointer;
//             outline: none;
//             caret-color: transparent;
//           }

//           .change:hover {
//             color: $color-light-7;
//           }
//           .times {
//             display: flex;
//             align-items: center;
//           }
//         }
//       }
//       .shop-buttons {
//         width: 100%;
//         display: flex;
//         justify-content: space-around;
//         align-items: center;

//         .shop-button {
//           font-size: 17px;
//           width: 100%;
//         }
//       }
//     }
//   }
// }
</style>
