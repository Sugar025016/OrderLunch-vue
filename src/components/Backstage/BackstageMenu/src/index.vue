<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path">
        <!-- <el-menu-item v-if="!item.meta.hidden" @click="goRoute(item)"> -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由但只有一个 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
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
// import { useRouter } from 'vue-router'
// let props = defineProps(['menuList'])

// let $router = useRouter()
// const goRoute = (vc: any) => {
//   $router.push(vc.index)
// }

import { useRouter, useRoute, Router } from 'vue-router'
import { onMounted, ref } from 'vue'

import useSellShopStore from '@/store/modules/sellShop'

let sellShopStore = useSellShopStore()
let props = defineProps(['menuList'])

let $router = useRouter()
let $route = useRoute()
// const shopId = ref<number>()
// const goRoute = async (path: string, shopId: number) => {
//
//   // if($route.path != '/sell/shop){

//   // }

//   // sellShopStore.shopId = shopId
//   // await sellShopStore.getSellShop(shopId)
//   // $router.push(path)
//   // $router.push(path + shopId)
//   // if ($route.path != '/sell/shop') {
//   //   $router.push(path + shopId)
//   // }
// }

const goRoute = async (item: any) => {
  const pattern = /^\/sell\/.*\/:shopId$/
  let path = item.path

  if (pattern.test(item.path)) {
    path = item.path.replace(/:shopId/g, sellShopStore.shopId)
  }
  $router.push(path)
}
const getPath = async (item: Router) => {
  if (!sellShopStore.shopId) {
  }

  $route.params.id = sellShopStore.shopId.toString()
}
// const getItem = async () => {

//
// }
// onMounted(() => {
//   getItem()
// })
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<style lang="scss" scoped></style>
