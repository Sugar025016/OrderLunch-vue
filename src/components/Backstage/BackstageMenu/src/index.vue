<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path">
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
import aaaa from '@/styles/variable.scss'

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

// const computedClass = computed(( title:string) => {
//   // 在这里可以调用方法或进行其他逻辑来计算 class

//   switch
//   return {
//     'order-new': true,
//   };
// });

// const styleTag = document.createElement('style');
// document.head.appendChild(styleTag);

// const computedColor = computedClass('orderNew');
// console.log('Computed Color:', computedColor);
// function computedClass(value: string) {
//     // console.log("//------////",aaaa)
//     const primaryColor = 'var(icon-order-new)';

//     const colorOrderNew = '--color-order-new';

// // 在这里可以使用 CSS 变量
// const computedColor = computedClass('orderNew');

// console.log('Computed Color:', computedColor);

// console.log('icon-order-new:', primaryColor);
//   switch (value) {
//     // 401: 未登錄
//     // console.log(`var(${colorOrderNew})`)
//     case 'orderNew':
//       return `var(${colorOrderNew})`;

//     case 'orderHandle':
//       return '#529b2e';

//     case 'orderFinish':
//       return '#529b2e';

//     default:
//       return '#529b2e';
//   }
// }

const colorOrderNew = '--color-order-new';
// const colorOrderHandle = '--color-order-handle';
const colorOrderFinish = '--color-order-finish';

// 在这里可以使用 CSS 变量
const computedColor = computedClass('orderNew');

console.log('Computed Color:', computedColor);
// console.log('Color Order Handle:', window.SassExtract.variable.$colorOrderHandle);
// console.log('Color Order Handle:', window.getComputedStyle(document.documentElement).getPropertyValue('--color-order-handle'));

// const colorOrderHandle = getComputedStyle(document.documentElement).getPropertyValue('--color-order-handle').trim();

function computedClass(value: string) {
  switch (value) {
    case 'orderNew':
      // return getComputedStyle(document.documentElement).getPropertyValue('--color-order-new').trim();
      return window.getComputedStyle(document.documentElement).getPropertyValue('--color-order-new');
    case 'orderHandle':
      return getComputedStyle(document.documentElement).getPropertyValue('--color-order-handle').trim();
    case 'orderFinish':
      return getComputedStyle(document.documentElement).getPropertyValue('--color-order-finish').trim();
    default:
      return getComputedStyle(document.documentElement).getPropertyValue('--el-color-primary').trim();
  }
}


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
<style lang="scss" scoped>
.title {
  margin-left: 5px;
  font-size: 16px;
}

// .order-new{
//   color: $color-order-new;
// }

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
