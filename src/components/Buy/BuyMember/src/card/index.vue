<template>
  <el-card
    class="card"
    @click="toShop(shop.id)"
    :body-style="{ padding: '0px' }"
  >
    <div class="image-container">
      <img
        v-if="shop.img"
        :src="shop.img"
        alt="Your Image"
        onerror="this.classList.add('no-image-label');"
      />
    </div>

    <div class="overlay" v-if="shop.orderable">
      <div class="overlay-text">可線上訂購</div>
    </div>
    <div style="padding: 14px">
      <div class="bottom">
        <div class="title_favorite">
          <span class="title">{{ shop.name }}</span>
          <div @click.stop="changeFavorite(shop.id)" class="favorite">
            <def-svg-icon
              class="buy-svg-icon"
              name="favorite"
              color="#fd7e14"
              width="30px"
              height="30px"
            ></def-svg-icon>
          </div>
        </div>
        <span class="content">{{ shop.address }}</span>
        <span class="content">{{ shop.description }}</span>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'

let userStore = useUserStore()
defineProps(['shop'])

let $router = useRouter()
var imageContainer = document.querySelector('.image-container')
var image = imageContainer?.querySelector('img')

image?.addEventListener('load', function () {
  imageContainer?.classList.add('loaded')
})

const toShop = (id: number) => {
  $router.push(`/BuyShop/${id}`)
}

const changeFavorite = async (id: number) => {
  await userStore.changeFavoriteStore(id)
}
</script>

<style lang="scss" scoped>
.el-card {
  overflow: visible;
}
.card {
  // padding: 0px;
  cursor: pointer;
  position: relative;

  overflow: visible;
  display: inline-block;
  .image-container {
    position: relative;
    max-width: 100%;
    /* overflow: hidden; */
    border-radius: 10px;
  }

  .image-container::before {
    content: '';
    display: block;
    padding-top: 50%; /* 1:1 的比例 */
    background-image: url('@/assets/images/shop2.jpg'); /* 設置背景圖片 */
    background-size: cover;
    background-position: center;
    background-size: 80% auto; /* 設置背景圖片的尺寸 */
    background-repeat: no-repeat; /* 設置背景圖片不重複 */
  }

  .image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1; /* 初始設置圖片透明度為 0 */
    transition: opacity 0.3s ease; /* 添加漸變動畫效果 */
  }

  .image-container.loaded img {
    opacity: 100; /* 設置圖片透明度為 1 */
  }
  .no-image-label {
    display: none; /* 設置缺圖片時隱藏（缺圖圖標） */
  }
  .overlay {
    position: absolute;
    top: 15px;
    right: -5px;
    width: 100px;
    height: 25px;
    background-color: #fd7e14;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    .overlay-text {
      color: #ffffff;
      font-size: 14px;
      font-weight: bold;
      z-index: 100;
    }
  }
  .bottom {
    margin-top: 1px;
    line-height: 26px;
    display: flex;
    /* justify-content: columns; */
    flex-direction: column;
    /* align-items: center; */
    .title_favorite {
      display: flex;
      // background-color: aqua;

      justify-content: space-between;
      // align-items: center;
    }
    .title {
      font-size: 24px;
      color: #999;
    }
    .content {
      line-height: 16px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>

<script setup lang="ts"></script>
