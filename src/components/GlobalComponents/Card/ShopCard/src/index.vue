<script lang="ts" setup>
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { onMounted, ref } from 'vue'
import { ShopData } from '@/api/shop/type'

let userStore = useUserStore()
// defineProps(['shop'])
const props = defineProps<{
  shop: ShopData
}>()

let $router = useRouter()
var imageContainer = document.querySelector('.image-container')
var image = imageContainer?.querySelector('imgUrl')

image?.addEventListener('load', function () {
  imageContainer?.classList.add('loaded')
})

const toShop = (id: number) => {
  $router.push(`/BuyShop/${id}`)
}
let favorite = ref('')
const changeFavorite = async (id: number) => {
  await userStore.changeFavoriteStore(id)
  favorite.value = await userStore.isLove(id)
}

onMounted(async () => {
  favorite.value = await userStore.isLove(props.shop.id)
})
</script>
<template>
  <el-card
    class="card"
    @click="toShop(shop.id)"
    :body-style="{ padding: '0px' }"
  >
    <div class="image-container">
      <img
        v-if="shop.imgUrl"
        :src="shop.imgUrl"
        alt="Your Image"
        onerror="this.classList.add('no-image-label');"
      />
    </div>
    <div class="overlay" v-if="shop.orderable">
      <span class="overlay-text">可線上111</span>
      <span class="overlay-text">訂購</span>
    </div>
    <div style="padding: 14px">
      <div class="bottom">
        <div class="title_favorite">
          <span class="title">{{ shop.name }}</span>
          <div @click.stop="changeFavorite(shop.id)" class="favorite">
            <def-svg-icon
              class="buy-svg-icon"
              name="favorite"
              :color="favorite"
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

<style lang="scss" scoped>
.el-card {
  border-radius: 20px;
  overflow: visible;
}
.card {
  border-radius: 20px;
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
    border-radius: 20px 20px 0 0;
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
  // .overlay {
  //   position: absolute;
  //   top: -15px;
  //   right: -15px;
  //   width: 75px;
  //   height: 75px;
  //   // background-color: #fd7e14;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   z-index: 100;
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   background-image: url('@/assets/images/plate.png') ; /* 設置背景圖片 */
  //   background-position: center center;
  //   .overlay-text {
  //     color: $color;
  //     font-size: 14px;
  //     font-weight: bold;
  //     z-index: 100;
  //     white-space: pre-line;
  //     margin: 10px;
  //     text-align: center;
  //   }
  // }
  .overlay {
    position: absolute;
    top: -17px;
    left: -18px;
    padding: 10px;
    width: 25%; /* 這裡修改為 100% */
    height: 35%; /* 這裡修改為 100% */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1;
    background-size: cover;
    background-repeat: no-repeat;

    background-image: url('@/assets/images/plate.png');
    background-position: center center;
    object-fit: contain;
    transition: opacity 0.3s ease;
    font-size: 16px;
    .overlay-text {
      color: $color;
      font-weight: bold;
      z-index: 100;
      width: 100%;
      height: auto;

      margin: 2px 10px;
      text-align: center;

      white-space: nowrap;
      font-size: 1rem;
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
