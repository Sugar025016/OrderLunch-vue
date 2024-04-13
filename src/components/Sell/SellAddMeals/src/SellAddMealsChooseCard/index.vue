<script setup lang="ts">
import { markRaw } from 'vue'

import { Delete } from '@element-plus/icons-vue'
// import setting from '@/setting'
import ElMessage from 'element-plus/lib/components/message/index.js'
import { reqDeleteSellProducts } from '@/api/sellProduct'
import { ElMessageBox } from 'element-plus/lib/components/message-box/index.js'
// import { ResponseBoolean } from '@/api/sellProduct/type'

defineProps(['product', 'setting', 'choose', 'add', 'change'])
</script>
<template>
  <div class="add-meals-modal">
    <div>
      <el-checkbox class="checkbox" size="large" disabled />
    </div>
    <div
      class="productCard"
      @click="
        setting === true
          ? (product.isChoose = !product.isChoose)
          : (product.isChoose = product.isChoose)
      "
      :class="{ active: setting }"
    >
      <span class="orderable" v-if="!product.orderable">未上架</span>

      <div class="overlay" v-if="!product.orderable"></div>

      <div class="products-content" :class="{ notImg: product.imgUrl }">
        <div class="content-top">
          <span class="content-title">
            {{ product.name }}
          </span>
        </div>
        <span class="content-price">{{ product.description }}</span>
      </div>
      <img :src="product.imgUrl" v-if="product.imgUrl" alt="AA" />
    </div>
    <div class="add-meals-prise">
      <span>加購價：</span>
      <span class="content-price">{{ product.prise }}$</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-meals-modal {
  display: grid;
  align-items: center;
  grid-template-columns: minmax(40px, 50px) minmax(180px, 5fr) minmax(90px, 2fr);
  .checkbox {
    margin: 10px;
  }

  .productCard {
    word-break: break-all;
    position: relative;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    border: 1px solid #8f8f8f54;
    height: 60px;
    width: 100%;
    justify-content: space-between;

    border-radius: 10px;
    .overlay {
      position: absolute;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      background-color: rgba(212, 212, 212, 0.7); /* 遮罩层的颜色和透明度 */
      border-radius: 10px;
    }

    .orderable {
      color: rgb(255, 0, 0);
      font-size: 10px;
      z-index: 1;
      position: absolute;
      margin: 2px 10px;
    }
    .products-content {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin: 10px;
      justify-content: space-between;
      flex-wrap: nowrap;
      width: 100%;

      span {
        max-width: 100%;
        font-size: 20px;
        color: rgba(0, 0, 0, 0.801);
        width: 100%;
      }
      .content-top {
        width: 100%;
        display: flex;
        flex-direction: column;

        .content-title {
          overflow: hidden; /* 隐藏超出部分 */
          white-space: nowrap; /* 防止文本换行 */
          text-overflow: ellipsis; /* 文本溢出时显示省略号 */
        }
      }
      .content-price {
        font-size: 14px;
        color: rgb(139, 139, 139);
      }
    }

    img {
      border-radius: 0 10px 10px 0;

      height: auto;
      width: 80px;
    }
    .notImg {
      width: calc(100% - 100px);
    }
  }

  .add-meals-prise {
    margin: 8px;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    justify-content: center;
    span {
      display: flex;
      margin: 1px;
    }
    :deep(.el-input__inner) {
      font-size: 16px;
    }
  }

  .active:hover {
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transform: scale(1.01);
  }
  .active:active {
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
    transform: scale(1);
  }
}
</style>
