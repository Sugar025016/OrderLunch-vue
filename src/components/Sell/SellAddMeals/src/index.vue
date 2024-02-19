<script setup lang="ts">
import { ref } from 'vue'
import SellAddMealsModal from './SellAddMealsModal/index.vue'

const sellAddMealsModalRef = ref<typeof SellAddMealsModal>()
</script>

<template>
  <div class="add-meals">
    <el-card class="card productCard addCard" @click="sellAddMealsModalRef?.handleOpen()">
      <div class="products-content add">
        <div class="add-icon">
          <el-icon :size="30"><Plus /></el-icon>
        </div>
      </div>
    </el-card>
    <component v-for="index in 5">
      <el-card class="card productCard addCard">
        <div class="products-content add">
          <div class="add-icon">
            <el-icon :size="30"><Plus /></el-icon>
          </div>
        </div>
      </el-card>
    </component>
  </div>


  <SellAddMealsModal ref="sellAddMealsModalRef"></SellAddMealsModal>
</template>

<style lang="scss" scoped>
.add-meals {
  display: grid; /* 使用CSS Grid布局 */
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  margin: 10px 0;
  padding: 0 5px;
  @media (min-width: $breakpoint-xs) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: $breakpoint-sm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: $breakpoint-xl) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: $breakpoint-xxl) {
    grid-template-columns: repeat(4, 1fr);
  }

  .productCard {
    word-break: break-all;
    position: relative;
    display: flex;
    height: 250px;
    width: 100%;
    justify-content: center;
    border-radius: 40px;
  }

  .productCard:hover {
    transform: scale(1.01);
    // box-shadow:none;
  }

  .addCard {
    cursor: pointer;

    :deep(.el-card__body) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .add {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      // width: 100%;
      .add-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0 10px 10px 0;
        padding: 14px;
        border: 2px solid #a1a1a154;
      }
    }
  }
  .addCard:active {
    background-color: #dddddd8a;
    transform: scale(1);
  }
}
</style>
