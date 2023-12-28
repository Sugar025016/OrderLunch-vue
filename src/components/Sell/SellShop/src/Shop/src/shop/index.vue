<script setup lang="ts">
import { deleteSecond as showTime } from '@/utils/time'
import { House, ChatRound, User, Watch } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import useSellShopStore from '@/store/modules/sellShop'
import { ShopDetailData } from '@/api/shop/type'
import EditScheduleModel from './EditScheduleModel.vue'

import EditShopModel from './EditShopModel.vue'

const scheduleVisible = ref(false)

const dialogTitle = ref('My Dialog Title')

const dialogMessage = ref('This is a dialog message.')

const EditShopRef = ref<typeof EditShopModel>()

const shopDrawerOpen = () => {
  sellShopStore.shopDrawer = true
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
    detail: '',
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
  isOrderable: false,
  tabProducts: [],
  products: [],
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

const currentDate = new Date()
const dayOfWeek = currentDate.getDay()
</script>
<template>
  <div class="">
    <div class="shop">
      <el-row :gutter="0" class="shop-card">
        <el-col :span="8" class="shop-img" :style="shopImageStyle">
          <div class="shop-border"></div>
        </el-col>
        <el-col :span="16" class="shop-content">
          <div class="shop-title">
            <span>{{ shopData?.name }}</span>
            <span class="change" @click="shopDrawerOpen">編輯商店</span>
          </div>
          <div class="shop-remark">
            <span>
              {{ shopData?.description }}
            </span>
          </div>
          <div class="shop-information">
            <div class="information">
              <el-icon :size="20"><Location /></el-icon>
              <span>
                {{
                  shopData?.address.city +
                  shopData?.address.area +
                  shopData?.address.detail
                }}
              </span>
            </div>
            <div class="information">
              <el-icon :size="20"><Watch /></el-icon>
              <span>今日營業時間：</span>
              <div
                v-if="
                  shopData?.schedules[dayOfWeek]?.timePeriods &&
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
                      timePeriod.endTime === '00:00'
                        ? '24:00'
                        : timePeriod.endTime,
                    )
                  }}
                </span>
              </div>
              <span v-else>{{ shopData?.schedules[dayOfWeek] }}</span>
              <span v-else>非營業日</span>
            </div>
            <div class="information"></div>
            <div class="information">
              <span class="change" @click="scheduleVisible = true">
                編輯營業時間
              </span>
            </div>
          </div>
          <div class="shop-buttons">
            <el-button
              size="large"
              type="warning"
              class="shop-button"
              :icon="House"
              round
              plain
              disabled
            >
              Primary
            </el-button>
            <el-button
              size="large"
              type="warning"
              class="shop-button"
              :icon="User"
              round
              plain
              disabled
            >
              Primary
            </el-button>
            <el-button
              size="large"
              type="warning"
              class="shop-button"
              :icon="ChatRound"
              round
              plain
              disabled
            >
              Primary
            </el-button>
            <el-button
              size="large"
              type="primary"
              class="shop-button"
              :icon="Watch"
              round
              plain
              data-bs-toggle="modal"
              data-bs-target="#shopInfoModal"
              disabled
            >
              營業資訊
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <EditScheduleModel
    v-model:scheduleVisible="scheduleVisible"
    :title="dialogTitle"
    :message="dialogMessage"
    :schedules="shopData.schedules"
  />

  <EditShopModel
    v-model:scheduleVisible="scheduleVisible"
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
    .shop-img {
      margin: 0px;
      padding: 0px;
      flex: 1;
      display: flex;
      width: 100%;
      height: 380px;
      background-size: cover;
      border-radius: 20px;
      padding: 5px 5px 5px 5px;
      background-position: center;
      .shop-border {
        height: 100%;
        width: 100%;
        border-radius: 20px;
        border: white 1px solid;
        overflow: hidden;
        display: flex;
      }
    }
    .shop-content {
      box-shadow: 2px 0px 3px 2px rgba(0, 0, 0, 0.1);
      // box-shadow: 0 0 5px blue, 0 0 10px green, 0 0 15px yellow , 0 0 15px yellow;
      background-color: rgb(255, 255, 254);
      padding: 30px;
      height: 340px;
      margin: 2px;
      .shop-title {
        display: flex;
        width: 100%;
        margin: 0 0 5px 0;

        justify-content: space-between;
        .favorite {
          display: flex;
          justify-content: center; /* 水平置中 */
          align-items: center; /* 垂直置中 */
        }
        .favorite:hover {
          cursor: pointer; /* 添加手型光标效果 */
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 20px;
          margin: 0 10px;
        }
        span {
          font-size: 50px;
        }
      }
      .shop-remark {
        span {
          display: block;
          word-wrap: break-word;
          word-break: break-all;
          max-width: 100%;
          color: rgba(134, 134, 134, 0.801);
          font-size: 20px;
        }
      }
      .shop-information {
        margin: 40px 0;
        .information {
          margin: 10px 0;
          display: flex;
          align-items: center;
          span {
            margin-left: 5px;
            display: block;
            word-wrap: break-word;
            word-break: break-all;
            max-width: 100%;
            color: rgba(0, 0, 0, 0.801);
            font-size: 20px;
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
      .shop-buttons {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .shop-button {
          font-size: 17px;
          width: 100%;
        }
      }
    }
  }
}
</style>
