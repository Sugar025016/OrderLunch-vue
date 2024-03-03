<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  products: Object as () => any,
})

const $emit = defineEmits(['search-result'])

const products = ref<any>()

const keyword = ref('')

let regex = new RegExp('', 'i')

const search = () => {
  if (keyword.value === '') {
    products.value = props.products
  } else {
    products.value = props.products?.filter((v: any) => regex.test(v.name))
  }
  $emit('search-result', products.value)
}

const reset = () => {
  keyword.value = ''
  search()
}

watch(keyword, () => {
  regex = new RegExp(keyword.value, 'i')
})


</script>
<template>
  <el-form :inline="true" class="form">
    <el-form-item label="搜索餐點名稱:">
      <el-input
        placeholder="请你输入搜索餐點名稱"
        v-model="keyword"
        @keyup.enter="search"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="search" round>
        搜索
      </el-button>
      <el-button size="default" @click="reset" round>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
@import 'node_modules/bootstrap/scss/buttons';
@import 'node_modules/bootstrap/scss/_forms.scss';

.form {
  max-width: 700px;
  display: grid; /* 使用CSS Grid布局 */
  grid-template-columns: minmax(300px, 2fr) minmax(160px, 1fr);
  grid-gap: 0px;
  .el-form-item {
    margin-right: 0px;
  }
  .el-form-item:last-child {
    margin-left: 15px;
  }
  .el-input {
    width: 100%;
  }
}
</style>
