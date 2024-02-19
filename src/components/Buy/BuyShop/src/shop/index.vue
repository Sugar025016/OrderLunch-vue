<script setup lang="ts">
import { House, ChatRound, User, Watch } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { getShop } from '@/api/shop'
import { ShopData, ShopResponseData } from '@/api/shop/type'
// import 'bootstrap/dist/css/bootstrap.css' // Import Bootstrap CSS
import shopInfoModal from '../shopInfoModal/index.vue'
import useUserStore from '@/store/modules/user'
import { deleteSecond as showTime } from '@/utils/time'
import socialMedia from '../socialMedia/index.vue'
import ElMessage from 'element-plus/lib/components/message/index.js'

let $route = useRoute()

let id: number = parseInt($route.params.id as string)

let shopData = ref<ShopData>()
// let isFavorite = ref<boolean>()
let favorite = ref('')

let userStore = useUserStore()

// const isLove = (v: ShopList) => {
//   isFavorite.value = v?.some((value: ShopData) => value.id === id)

//   if (isFavorite.value) {
//     favorite.value = '#fd7e14'
//   } else {
//     favorite.value = 'rgb(139, 139, 139)'
//   }
// }

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
<template>
  <div class="">
    <div class="shop">
      <div class="shop-card">
        <div :span="12" class="shop-img" :style="shopImageStyle" v-if="shopData?.imgUrl">
          <div class="overlay" v-if="shopData?.orderable">
            <!-- <span class="overlay-text">可線上AA</span>
            <span class="overlay-text">訂購</span> -->
          </div>
          <div class="shop-border"></div>
        </div>
        <!-- <div class="overlay" v-if="shop.orderable">
          <div class="overlay-text">可線上訂購</div>
        </div> -->
        <div class="shop-content">
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
              <span>地址：</span>
              <span>{{ shopData?.address }}</span>
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
                      timePeriod.endTime === '00:00:00'
                        ? '24:00'
                        : timePeriod.endTime,
                    )
                  }}
                </span>
              </div>
              <span v-else>{{ shopData?.schedules[dayOfWeek] }}</span>
              <span v-else>非營業日</span>
              <el-link
                class="more"
                data-bs-toggle="modal"
                data-bs-target="#shopInfoModal"
              >
                <el-icon><WarningFilled /></el-icon>
                更多資訊
              </el-link>
            </div>
          </div>

          <div class="header-link">
            <socialMedia></socialMedia>
          </div>
        </div>
      </div>
    </div>
  </div>
  <shopInfoModal
    :schedules="shopData?.schedules"
    :phone="shopData?.phone"
    :name="shopData?.name"
  ></shopInfoModal>
  <!-- <shopInfoModal :schedules="123"></shopInfoModal> -->
</template>

<style lang="scss" scoped>
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
        overflow: hidden;
        display: flex;
      }
      .overlay {
        position: absolute;
        top: -50px;
        left: -50px;
        padding: 10px;
        width: 160px; /* 這裡修改為 100% */
        height: 160px; /* 這裡修改為 100% */
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 1;
        background-size: cover;
        background-repeat: no-repeat;

        background-image: url('@/assets/images/plateOrder.png');
        background-position: center center;
        object-fit: contain;
        transition: opacity 0.3s ease;
        font-size: 16px;
        .overlay-text {
          color: $color;
          font-weight: bold;
          z-index: 100;
          width: 100%;
          height: auto;

          margin: 2px 10px;
          text-align: center;

          white-space: nowrap;
          font-size: 1.5rem;
        }
      }
    }

    .shop-content {
      border-radius: 20px;
      box-shadow: 0px 4px 3px 2px rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 254, 0.614);
      // .shop-content-row {
      // margin: 30px;
      padding: 30px;
      // height:calc(440px - 60px) ;
      // height: 300px;
      margin: 10px;
      // width: 600px;
      width: auto;
      min-width: 360px;
      z-index: 10;

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
          // background-color: #f0f0f0;
          // border: 1px solid #ccc;
          cursor: pointer; /* 添加手型光标效果 */
        }

        span {
          font-size: 50px;
        }
      }

      .shop-information {
        margin: 30px 0;
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

          .more {
            margin: 4px 0 0 8px;
            display: flex;
            align-items: center;
            color: rgb(255, 103, 103);
            color: $color;
            font-size: 12px;
            .el-icon {
              width: 16px;
              height: 16px;
            }
          }
          .times {
            display: flex;
            align-items: center;
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
        margin: 0 ;
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
</style>
