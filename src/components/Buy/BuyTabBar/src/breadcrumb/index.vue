<template>
  <!-- <el-breadcrumb separator="/" :separator-icon="ArrowRight"> -->
  <!-- <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    > -->
  <!-- <div class="flex justify-space-between mb-4 flex-wrap gap-4"> -->
  <!-- <el-button class="title" @click="goRoute('/')" text>{{ title }}</el-button> -->
  <div class="title">
    <def-title ></def-title>
  </div>

  <!-- </el-breadcrumb> -->
</template>
<script setup lang="ts">
// import { ArrowRight, Fold, Expand } from '@element-plus/icons-vue'
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore()

import { useRouter } from 'vue-router'
let $router = useRouter()

let title = document.title
const goRoute = (path: string) => {
  $router.push(path)
}
</script>

<style lang="scss" scoped>
.title {
  vertical-align: middle;
  font-size: 35px;
  font-weight: 700;
}

.el-button.is-text {
  color: $color;
}
</style>
