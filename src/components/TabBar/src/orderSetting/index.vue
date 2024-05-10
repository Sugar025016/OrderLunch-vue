<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { ref, onMounted } from 'vue'

let userStore = useUserStore()

const drawer = ref(false)

import { Grid } from '@element-plus/icons-vue'

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import useSellShopStore from '@/store/modules/sellShop'
import { useRouter, useRoute } from 'vue-router'
import ChooseAddressModel from '@/components/Buy/BuyShops/src/ChooseAddressModel/index.vue'

let $router = useRouter()
let $route = useRoute()

let sellShopStore = useSellShopStore()

const handleOpen = (key: string, keyPath: string[]) => {
  
}
const handleClose = (key: string, keyPath: string[]) => {
  
}

const changeLink = async (to: string) => {
  $router.push(to)
  drawer.value = false
}

const chooseAddressRef = ref<typeof ChooseAddressModel>()
const chooseAddressOpen = async () => {
  chooseAddressRef.value?.open()

  drawer.value = false
}

const logout = async () => {
  let res: any = await userStore.userLogout()

  if (res.status === 200) {
    $router.push({ path: '/', query: { redirect: $route.path } })
  }
  drawer.value = false
}
const addShop = async () => {
  $router.push('/Register/shop')
  drawer.value = false
}

const goRoute = async (shopId: number, shopName: string) => {
  $route.meta.shopId = shopId.toString()
  sellShopStore.shopId = shopId
  $route.meta.title = shopName

  $router.push(`/sell/${shopId}/Shop`)

  drawer.value = false
}
</script>
<template>
  <div class="drawer-item">
    <el-button @click="drawer = true" type="primary">
      <div class="list item" :class="{ shopCar: userStore.account != '' }">
        <Grid class="icon icon-white" />
      </div>
    </el-button>
    <el-drawer
      v-model="drawer"
      :title="userStore.username"
      direction="rtl"
      size="100%"
    >
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1" class="link" @click="changeLink('/profile')">
          <def-svg-icon
            name="person"
            color="#fd7e14"
            width="30px"
            height="30px"
            class="icon list order"
          ></def-svg-icon>
          <span>會員資料</span>
        </el-menu-item>
        <el-menu-item index="2" class="link" @click="changeLink('/BuyOrder')">
          <DocumentCopy class="icon list order" />
          <span>歷史訂單</span>
        </el-menu-item>
        <el-menu-item index="3" class="link" @click="changeLink('/favorite')">
          <def-svg-icon
            name="favorite"
            color="#fd7e14"
            width="30px"
            height="30px"
            class="icon list order"
          ></def-svg-icon>
          <span>收藏店家</span>
        </el-menu-item>
        <el-menu-item index="4" class="link" @click="chooseAddressOpen()">
          <Location class="icon list order" />
          <span>設定外送地點</span>
        </el-menu-item>

        <!-- <el-menu-item index="5" class="link">
          <document class="icon list order" />
          <span>購買紀錄</span>
        </el-menu-item> -->
        <el-sub-menu index="5" class="link">
          <template #title>
            <!-- <document class="icon list order" /> -->
            <Shop class="icon list order" />
            <span>商店</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              index="1-1"
              v-for="item in sellShopStore.shopNames"
              @click="goRoute(item.id, item.name)"
            >
              {{ item.name }}
            </el-menu-item>
            <el-menu-item index="2-1" @click="addShop">開店</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="6" @click="logout()">
          <router-link
            :to="'/BuyOrder'"
            class="link"
            v-if="userStore.account != ''"
          ></router-link>
          <!-- <el-icon><setting /></el-icon> -->
          <!-- <Document class="icon list order" /> -->
          <span>登出</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
  <ChooseAddressModel ref="chooseAddressRef"></ChooseAddressModel>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  margin-right: 10px;

  .icon {
    margin: 0;
    height: 30px;
    width: 30px;
  }

  .count {
    border-radius: 50%;
    background-color: $color;
  }
  .icon-white {
    color: white;
  }

  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    position: relative;

    .cartQuantity {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      right: -10px;
      top: -9px;
    }
    .text-white {
      position: absolute;

      font-size: 18px;
      color: white;
    }
  }
}
.drawer-item {
  height: 100%;
  .el-button {
    height: 60px;
    width: 60px;
    margin-left: 0px;

    @media (max-width: $breakpoint-xs) {
      // padding: 0;

      height: 50px;
      width: 50px;
    }
  }

  display: flex;
  ::v-deep .el-drawer {
    .el-drawer__header {
      span {
        font-size: 1.6rem;
        color: #030303;
        margin: 0 10px;
      }
    }

    .el-menu {
      .el-menu-item,
      .el-sub-menu .el-sub-menu__title {
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 0.3vh;
      }
    }
  }
}
.item {
  margin: 0px;
}
</style>
