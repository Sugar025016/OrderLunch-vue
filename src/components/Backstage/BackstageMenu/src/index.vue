<template>
  <template v-for="(item, index) in props.menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="
          !isBreakpointMD
            ? (LayOutSettingStore.isCollapse = true)
            : LayOutSettingStore.isCollapse
        "
      >
        <!-- <el-menu-item v-if="!item.meta.hidden" @click="goRoute(item)"> -->
        <!-- <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon> -->
        <def-svg-icon
          class="buy-svg-icon"
          :name="item.meta.icon"
          width="28px"
          height="28px"
          :color="computedClass(item.path)"
        ></def-svg-icon>
        <template #title>
          <span class="title">{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由但只有一个 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        @click="LayOutSettingStore.isCollapse = !LayOutSettingStore.isCollapse"
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}--</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由且大于一个 -->
    <!-- <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
      @click="goRoute"
    > -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
      @click="LayOutSettingStore.isCollapse = !LayOutSettingStore.isCollapse"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}--</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts" name="Menu">
import { useRouter, useRoute, Router } from 'vue-router'

import useSellShopStore from '@/store/modules/sellShop'
import useLayOutSettingStore from '@/store/modules/setting'
import { isBreakpointMD } from '@/utils/windowSize'

let LayOutSettingStore = useLayOutSettingStore()
let sellShopStore = useSellShopStore()

let props = defineProps(['menuList'])

let $router = useRouter()
let $route = useRoute()

function computedClass(value: string) {
  switch (value) {
    case 'orderNew':
      return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--color-order-new')
    case 'orderHandle':
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--color-order-handle')
        .trim()
    case 'orderFinish':
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--color-order-finish')
        .trim()
    default:
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--el-color-primary')
        .trim()
  }
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<style lang="scss" scoped>
.title {
  margin-left: 5px;
  font-size: 16px;
}

.icon {
  color: $color;
}
.icon-order-new {
  color: $color-order-new;
}
.icon-order-handle {
  color: $color-order-handle;
}
.icon-order-finish {
  color: $color-order-finish;
}
</style>
