<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <!-- <el-aside width="200px">

      </el-aside> -->
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
            <div class="logo" v-if="setting.logoHidden">
              <img :src="setting.logo" alt="" />
              <span class="title">{{ setting.title }}</span>
            </div>
            <def-backstage-Menu
              class=""
              :menuList="userStore.menuRoutes"
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
          <def-backstage-tab-bar></def-backstage-tab-bar>
        </el-header>
        <el-main
          :style="{
            left: !LayOutSettingStore.isCollapse ? '200px' : '56px',
            width: LayOutSettingStore.isCollapse
              ? 'calc(100% - 56px)'
              : 'calc(100% - 200px)',
          }"
        >
          <el-scrollbar>
            <Router-view></Router-view>
          </el-scrollbar>
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
let LayOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
let $route = useRoute()
</script>

<style lang="scss" scoped>
.common-layout {
  width: auto;
  height: 100%;
  font-size: 10px;
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
              height: $base-menu-logo-height;
              color: #959ea6;
              font-weight: 700;
              font-size: $base-logo-title-fontSize;
              flex-wrap: nowrap;
              overflow: hidden;
              padding-left: 17px;
              img {
                display: inline-block;
                widows: 30px;
                height: 30px;
                border-radius: 10px;
              }
              .title {
                display: inline-block;
                height: 32px;
                margin: 2px 0 0 18px;
                overflow: hidden;
                font-size: 18px;
                font-weight: 600;
                line-height: 32px;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
    .el-container {
      .el-main {
        position: absolute;
        padding: 20px;
        left: 200px;
        top: 60px;
        transition: all 0.3s;
        // width: calc(100% - $base-menu-width);
        height: calc(100vh - 60px);
      }
      .el-header {
        width: 100%;
      }
    }
  }
}
</style>
