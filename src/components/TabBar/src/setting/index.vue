<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

import SellOrderModal from '../order/sellOrderModal/index.vue'

import MemberModel from './memberModel.vue'

import { ref, onMounted } from 'vue'

import { Orders } from '@/api/order/type'
import ChooseAddressModel from '@/components/Buy/BuyShops/src/ChooseAddressModel/index.vue'

let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()
let sellOrderModalOpen = ref(false)
let memberModelOpen = ref(false)

const chooseAddressRef = ref<typeof ChooseAddressModel>()

const path = window.location.hash
$router.getRoutes()

const props = defineProps({
  isToolbarVisibleAll: Boolean,
})

const toLogin = () => {
  if (
    !userStore.token ||
    userStore.token === undefined ||
    userStore.token === ''
  ) {
    $router.push({ path: '/login', query: { redirect: path } })
  }
}

const logout = async () => {
  let res: any = await userStore.userLogout()

  if (res.status === 200) {
    $router.push({ path: '/', query: { redirect: $route.path } })
  }
}

const changeLink = async (to: string) => {
  // $router.push('/BuyMember/' + path + '/' + page)
  $router.push(to)
}

let orderNew = ref<Orders>([])
const chooseAddressOpen = async () => {
  chooseAddressRef.value?.open()
}
</script>
<template>
  <div class="order-text">
    <def-svg-icon
      v-if="isToolbarVisibleAll || !userStore.username"
      @click="toLogin"
      name="person"
      color="#fd7e14"
      width="35px"
      height="35px"
      class="svg-icon"
    ></def-svg-icon>
    <el-dropdown class="list" v-if="userStore.username && isToolbarVisibleAll">
      <span class="el-dropdown-link" style="cursor: pointer">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="changeLink('/profile')">
            會員資料
          </el-dropdown-item>

          <el-dropdown-item @click="changeLink('/BuyOrder')">
            歷史訂單
          </el-dropdown-item>
          <el-dropdown-item @click="changeLink('/favorite')">
            收藏店家
          </el-dropdown-item>
          <!-- <el-dropdown-item @click="changeLink('changeProfile', userData)">
            修改會員資料
          </el-dropdown-item> -->
          <!-- <el-dropdown-item @click="changeLink('changeCompany', userData)">
            修改公司資料
          </el-dropdown-item> -->
          <!-- <el-dropdown-item @click="changeLink('changePassword', userData)">
            修改登入密碼
          </el-dropdown-item> -->
        </el-dropdown-menu>
        <el-dropdown-menu>
          <el-dropdown-item @click="chooseAddressOpen()">
            設定外送地點
          </el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout()">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <div class="list" :class="{ shopCar: userStore.account != '' }">
    <router-link :to="'/BuyShopCart'" class="link">
      <ShoppingBag class="icon" />
      <span class="cartQuantity text-white bg-warning count">
        {{ userStore.cartCount }}
      </span>
    </router-link>
    <router-link
      :to="'/BuyOrder'"
      class="link"
      v-if="userStore.account != '' && isToolbarVisibleAll"
    >
      <Document class="icon order" />
      <span class="cartQuantity text-white bg-warning count order-count">
        {{ userStore.orderCount }}
      </span>
    </router-link>
  </div>

  <SellOrderModal
    v-model:scheduleVisible="sellOrderModalOpen"
    :orderNew="orderNew"
  ></SellOrderModal>
  <MemberModel v-model:memberModelOpen="memberModelOpen"></MemberModel>

  <ChooseAddressModel ref="chooseAddressRef"></ChooseAddressModel>
</template>

<style lang="scss" scoped>
img {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin: 0 10px;
}

.svg-icon {
  border-radius: 20px;
  margin: 2px;
}
.svg-icon:hover {
  cursor: pointer;
}

.list {
  // margin: 0 10px;
  // background-color: aqua;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // width: none;

  .icon {
    margin: 0;
  }
  .count {
    border-radius: 50%;
    background-color: $color;
  }
  .order {
    color: rgb(35, 130, 255);
  }
  .order-count {
    border-radius: 50%;
    background-color: rgb(35, 130, 255);
  }
}

.order-text {
  display: flex;
  align-items: center;
  justify-content: center;
  // margin: 11px 10px 7px 10px;
  // margin: 0 10px;
  font-size: 15px;

  a {
    color: #333333;
    text-decoration: none;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
}
// .shopCar {
//   // margin: 0 0 0 20px;
// }

.position {
  &-relative {
    position: relative;
  }
  &-absolute {
    position: absolute;
  }
}
.link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 100%;
  height: 100%;
  position: relative;

  width: 60px;
  .cartQuantity {
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 6px;
    top: 8px;
  }
}

.bg-warning {
  background-color: $color;
}

.text-white {
  font-size: 18px;
  color: white;
}
</style>
