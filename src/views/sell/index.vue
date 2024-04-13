<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <div
        v-if="!isBreakpointMD"
        :class="{ overlay: !LayOutSettingStore.isCollapse }"
      ></div>
      <el-aside
        width="200px"
        :class="{ isCollapse: LayOutSettingStore.isCollapse ? true : false }"
      >
        <el-scrollbar>
          <div class="common-layout-close" v-if="!isBreakpointMD">
            <el-button
              aria-label="Close this dialog"
              class="el-drawer__close-btn"
              type="button"
              circle
              @click="
                LayOutSettingStore.isCollapse = !LayOutSettingStore.isCollapse
              "
            >
              <i class="el-icon el-drawer__close">
                <def-svg-icon
                  name="close"
                  color="#f8f9fa"
                  width="30px"
                  height="30px"
                  class="icon list"
                ></def-svg-icon>
              </i>
            </el-button>
          </div>
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
      <!-- <el-container
        :style="{
          left: !isBreakpointMD
            ? '0px'
            : !LayOutSettingStore.isCollapse
            ? '100px'
            : '56px',
          width: !isBreakpointMD
            ? 'calc(100% - 0px)'
            : LayOutSettingStore.isCollapse
            ? 'calc(100% - 56px)'
            : 'calc(100% - 100px)',
          //background: !isBreakpointMD ? 'red' : 'blue',
        }"
      > -->
      <el-container
        :style="{
          left: !isBreakpointMD
            ? '0px'
            : !LayOutSettingStore.isCollapse
            ? '100px'
            : '56px',
          width: !isBreakpointMD
            ? 'calc(100% - 0px)'
            : LayOutSettingStore.isCollapse
            ? 'calc(100% - 56px)'
            : 'calc(100% - 100px)',
          //background: !isBreakpointMD ? 'red' : 'blue',
        }"
      >
        <el-header>
          <SellTabBar class="sellTabBar"></SellTabBar>
        </el-header>
        <el-main
          :style="{
            left: !isBreakpointMD
              ? '0px'
              : !LayOutSettingStore.isCollapse
              ? '200px'
              : '56px',
            width: !isBreakpointMD
              ? 'calc(100% - 0px)'
              : LayOutSettingStore.isCollapse
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
import { ShopNames } from '@/api/shop/type'
import { onMounted, ref } from 'vue'
import drawer from 'element-plus/lib/components/drawer/index.js'
import useSellShopStore from '@/store/modules/sellShop'
import SellTabBar from '@/components/TabBar/src/index.vue'
import { isBreakpointMD } from '@/utils/windowSize'

let LayOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
let sellShopStore = useSellShopStore()
let $route = useRoute()

const shopNameItem = ref<ShopNames>([])
const getItem = async () => {
  drawer.value = true

  shopNameItem.value = (await sellShopStore.getShopItem()) as ShopNames
}

onMounted(() => {
  getItem()
})
</script>

<style lang="scss" scoped>
.common-layout {
  position: relative;
  width: auto;
  height: 100%;
  font-size: 10px;
  .shop-item {
    margin: 0 0 0 10px;
    display: flex;
  }
  .isCollapse {
    width: 56px;
    @media (max-width: $breakpoint-md) {
      width: 0px;
    }
  }
  .el-container {
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
      z-index: 999; /* 确保遮罩层在侧边栏之上 */
    }
    .el-aside {
      z-index: 1000;
      background-color: #001529 !important;
      height: 100%;
      transition: all 0.3s;
      @media (max-width: $breakpoint-md) {
        position: absolute;
      }

      .el-scrollbar {
        position: relative;
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
        .common-layout-close {
          width: auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin: 10px 10px 0 0;
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
          padding: 0 20px;
          scroll-behavior: smooth;
          height: 100%; /* 设置容器高度 */
          overflow: auto; /* 让容器产生滚动条 */
        }
      }
      .el-header {
        width: 100%;
        @media (max-width: $breakpoint-md) {
          padding: 0;
        }
        @media (max-width: $breakpoint-xs) {
          height: 50px;
        }
      }
    }
  }
}
</style>
