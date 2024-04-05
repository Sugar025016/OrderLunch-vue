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
            <div @click="changeFavorite" class="favorite">
              <!-- 點擊會出現
                Uncaught TypeError: Cannot read properties of undefined (reading 'lastError')
                ，是由於某個瀏覽器擴展或插件引起的，可用無痕視窗開 -->
              <def-svg-icon
                class="buy-svg-icon"
                name="favorite"
                :color="favorite"
                width="30px"
                height="30px"
              ></def-svg-icon>
            </div>
          </div>
          <div class="shop-remark">
            <span>
              {{ shopData?.description }}
            </span>
          </div>
          <div class="shop-information">
            <div class="information">
              <el-icon :size="20"><Location /></el-icon>
              <span>{{ shopData?.address }}</span>
            </div>
            <div class="information">
              <el-icon :size="20"><Watch /></el-icon>
              <span>今日營業時間：</span>
              <!-- <component v-if="shopData && shopData.schedules[dayOfWeek] && shopData.schedules[dayOfWeek].timePeriods && shopData.schedules[dayOfWeek].timePeriods.length > 0" 
                v-for="timePeriod in shopData?.schedules[dayOfWeek].timePeriods">
                <span>{{timePeriod.startTime}}-{{timePeriod.endTime}}</span>
              </component>
              <span v-else>{{ shopData?.schedules[dayOfWeek] }}</span> -->

              <component
                v-if="
                  shopData?.schedules &&
                  shopData?.schedules[dayOfWeek].timePeriods?.length > 0
                "
                v-for="timePeriod in shopData?.schedules[dayOfWeek].timePeriods"
              >
                <span>{{ timePeriod.startTime }}~{{ timePeriod.endTime }}</span>
              </component>
              <!-- <span v-else>{{ shopData?.schedules[dayOfWeek] }}</span> -->
              <span v-else>非營業日</span>
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
            >
              Primary
            </el-button>
            <el-button
              size="large"
              type="warning"
              class="shop-button btn btn-primary"
              :icon="Watch"
              round
              plain
              color=""
              data-bs-toggle="modal"
              data-bs-target="#shopInfoModal"
            >
              營業資訊
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <shopInfoModal
    :schedules="shopData?.schedules"
    :phone="shopData?.phone"
    :name="shopData?.name"
  ></shopInfoModal>
  <!-- <shopInfoModal :schedules="123"></shopInfoModal> -->
</template>

<script setup lang="ts">
import { House, ChatRound, User, Watch } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { getShop } from '@/api/shop'
import { ShopData, ShopDetailData, ShopResponseData } from '@/api/shop/type'
// import 'bootstrap/dist/css/bootstrap.css' // Import Bootstrap CSS

import shopInfoModal from '../shopInfoModal/index.vue'

let $route = useRoute()

let id: number = parseInt($route.params.id as string)

let shopData = ref<ShopDetailData>()
let favorite = ref('')

import useUserStore from '@/store/modules/user'
let userStore = useUserStore()



const changeFavorite = async () => {
  await userStore.changeFavoriteStore(id)
  favorite.value = await userStore.isLove(id)
}

onMounted(async () => {
  await getShopData(id)
  favorite.value = await userStore.isLove(id)
})

const getShopData = async (id: number) => {
  let res: ShopResponseData = await getShop(id)
  shopData.value = res.data
}

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
<style lang="scss" scoped>
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
      // background: url('@/assets/images/food.jpg') no-repeat;
      // background: url('@/assets/images/food.jpg') no-repeat;
      // background-image: url('#{shopData.img}');
      // background: url(`#{shopData.img}`);
      background-size: cover;
      border-radius: 20px;
      padding: 5px 5px 5px 5px;
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
      box-shadow: 0px 4px 3px 2px rgba(0, 0, 0, 0.1);
      background-color: rgb(255, 255, 254);
      padding: 30px;
      height: 340px;
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
        }
      }
      .shop-buttons {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .shop-button {
          color: $color;
          font-size: 17px;
          width: 100%;
        }
        .shop-button:hover {
          background-color: $color;
          color: white;
        }
      }
    }
  }
}
</style>
