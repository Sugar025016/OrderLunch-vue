<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-aside
        width="200px"
        :class="{ isCollapse: LayOutSettingStore.isCollapse ? true : false }"
      >
        <el-scrollbar>
          <el-menu
            :default-active="$route.path"
            active-text-color="#fff"
            background-color="#001529"
            text-color="#959ea6"
            :collapse="LayOutSettingStore.isCollapse"
            :router="true"
          >
            <router-link class="logo" to="/">
              <img src="@/assets/images/logo.png" alt="" />
              <span class="title">{{ setting.title }}</span>
            </router-link>
            <def-backstage-Menu
              class=""
              :menuList="userStore.menuSellRoutes"
            ></def-backstage-Menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container
        :style="{
          left: !LayOutSettingStore.isCollapse ? '200px' : '56px',
          width: LayOutSettingStore.isCollapse
            ? 'calc(100% - 56px)'
            : 'calc(100% - 200px)',
        }"
      >
        <el-header>
          <SellTabBar class="container"></SellTabBar>
        </el-header>
        <el-main
          :style="{
            left: !LayOutSettingStore.isCollapse ? '200px' : '56px',
            width: LayOutSettingStore.isCollapse
              ? 'calc(100% - 56px)'
              : 'calc(100% - 200px)',
          }"
        >
          <div class="scroll-container">
            <Router-view></Router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'
import {
  ShopNames,
} from '@/api/shop/type'
import { onMounted, ref } from 'vue'
import drawer from 'element-plus/lib/components/drawer/index.js'
import useSellShopStore from '@/store/modules/sellShop'
import SellTabBar from '@/components/Sell/SellTabBar/src/index.vue'

let LayOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
let sellShopStore = useSellShopStore()
let $route = useRoute()

const shopNameItem = ref<ShopNames>([])
const getItem = async () => {
  drawer.value = true

  let res: ShopNames = await sellShopStore.getShopItem()

  shopNameItem.value = res

}

onMounted(() => {
  getItem()
})

</script>

<style lang="scss" scoped>
.common-layout {
  width: auto;
  height: 100%;
  font-size: 10px;
  .shop-item {
    margin: 0 0 0 10px;
    display: flex;
  }
  .isCollapse {
    width: 56px;
  }
  .el-container {
    .el-aside {
      background-color: #001529 !important;
      height: 100%;
      transition: all 0.3s;
      .el-scrollbar {
        .el-scrollbar__view {
          height: 100%;
          .el-menu {
            border-right: none;
            height: 100%;
            transition: all 0.3s;
            height: calc(100vh - 60px);
            .logo {
              width: 95%;
              display: flex;
              align-items: center;
              justify-content: center;
              height: $base-menu-logo-height;
              color: #959ea6;
              font-weight: 700;
              font-size: $base-logo-title-fontSize;
              flex-wrap: nowrap;
              overflow: hidden;
              text-decoration: none;
              img {
                display: inline-block;
                widows: 45px;
                height: 45px;
                border-radius: 10px;
                margin: 5px;
              }
              .title {
                display: inline-block;
                height: 32px;
                margin: 2px 0 0 8px;
                overflow: hidden;
                font-size: 18px;
                font-weight: 600;
                line-height: 32px;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-decoration: none;
                color: $color;
              }
            }
          }
        }
      }
    }
    .el-container {
      .el-main {
        position: absolute;
        padding: 0;
        left: 200px;
        top: 60px;
        transition: all 0.3s;
        height: calc(100vh - 60px);
        .scroll-container {
          padding: 20px;
          scroll-behavior: smooth;
          height: 100%; /* 设置容器高度 */
          overflow: auto; /* 让容器产生滚动条 */
        }
      }
      .el-header {
        width: 100%;
      }
    }
  }
}
</style>
