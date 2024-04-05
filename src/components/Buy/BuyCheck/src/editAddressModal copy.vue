<script setup lang="ts">
import { ref } from 'vue'
import cityAreas from '@/utils/areaData.js'
import { Address } from '@/api/type'

const props = defineProps({
  address: {
    type: Object as () => Address,
    required: true,
  },
  deleteAddress: Function,
  index: Number,
})
let $emit = defineEmits(['updateAddress'])


const city: string[] = Object.keys(cityAreas)

const formSize = ref('default')

const changeCity = () => {
  props.address.area = ''
}

const validatorShopAddressDetail = (  value: any, callBack: any) => {
  if (value.trim().length <= 255) {
    callBack()
  } else {
    callBack(new Error('地址不可超過255個字'))
  }
}
const validateNotEmptyString = (  value: any, callback: any) => {
  if (value.trim() === '') {
    callback(new Error('請輸入地址'))
  } else {
    callback()
  }
}
const addressRules = {
  city: [{ required: true, message: '請選擇城市', trigger: 'change' }],
  area: [{ required: true, message: '請選擇區域', trigger: 'change' }],
  detail: [
    {
      required: true,
      message: 'Detail cannot be empty',
      trigger: 'blur',
      validator: validatorShopAddressDetail,
    },
    {
      validator: validateNotEmptyString,
      trigger: 'blur',
      message: '地址不能為空',
    },
  ],
}

let formRef = ref<any>()

const save = async () => {
  await formRef.value.validate()
}
defineExpose({
  save,
})
</script>
<template>
  <el-form
    ref="formRef"
    :model="props.address"
    :rules="addressRules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
    label-position="top"
  >
    <el-form-item prop="city">
      <el-select
        v-model="props.address.city"
        class="m-2"
        placeholder="請選擇城市"
        size="large"
        @change="changeCity()"
      >
        <el-option
          v-for="(item, index) in city"
          :key="index"
          :label="item"
          :value="item"
          :disabled="index === 0"
        />
        ：
      </el-select>
    </el-form-item>
    <el-form-item prop="area">
      <el-select
        v-model="props.address.area"
        class="m-2"
        placeholder="請選擇區域"
        size="large"
        no-data-text="請先選擇城市"
      >
        <el-option
          v-for="item in cityAreas[
            props.address.city as keyof typeof cityAreas
          ]"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="detail">
      <el-input
        v-model="props.address.detail"
        size="large"
        placeholder="请您输入外送地址"
      ></el-input>
    </el-form-item>
    <!-- <el-button
      type="primary"
      size="large"
      @click="deleteAddress(props.index)"
      round
      plain
    >
      刪除
    </el-button> -->
    <el-button
      type="primary"
      size="large"
      round
      plain
    >
      刪除
    </el-button>
  </el-form>
</template>

<style lang="scss" scoped>
.el-form {
  display: grid;
  grid-template-columns:
    minmax(120px, 2fr) minmax(130px, 2fr) minmax(320px, 5fr)
    minmax(75px, 1fr);
  // grid-column-gap: 10px;
  grid-gap: 10px;

  .el-form-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    .el-form-item__label {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0px;
      padding: 0 0 0 12px !important;
    }
    .el-select {
      margin: 0 !important;
    }
  }
  .el-button {
    // margin: auto 0 auto 5px;
  }
  @media (max-width: $breakpoint-lg) {
    display: grid;
    grid-template-rows: auto auto; /* 調整每行的高度 */
    grid-template-columns: minmax(150px, 2fr) minmax(150px, 4fr) auto; /* 調整每列的寬度比例 */

    .el-form-item:nth-child(1) {
      grid-row: 1; /* 將第一個元素放置在第一行 */
      grid-column: 1; /* 將第一個元素放置在第一列 */
    }

    .el-form-item:nth-child(2) {
      grid-row: 1; /* 將第二個元素放置在第一行 */
      grid-column: 2; /* 將第二個元素放置在第二列 */
    }

    .el-form-item:nth-child(3) {
      grid-row: 2; /* 將第三個元素放置在第二行 */
      grid-column: 1 / span 2; /* 設置第三個元素佔第一列的80% */
    }

    .el-button {
      grid-row: 2; /* 將第四個元素放置在第二行 */
      grid-column: 3 / span 1; /* 設置第四個元素佔第二列的20% */
    }
  }

  @media (max-width: $breakpoint-xs) {
    display: flex;
    flex-direction: column;
  }
}
</style>
