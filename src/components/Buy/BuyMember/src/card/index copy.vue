<template>
  <el-card :body-style="{ padding: '0px' }">
    <div class="image-container">
      <img
        src="@/assets/images/food001.jpg"
        alt="Your Image"
        onerror="this.classList.add('no-image-label');"
      />
    </div>

    <div style="padding: 14px">
      <div class="title">
        <span>Yummy hamburger111111111</span>

        <def-svg-icon name="heart-fill2" color="red"></def-svg-icon>
      </div>
      <div class="bottom">
        <time class="time">{{ currentDate }}</time>
        <el-button text class="button">Operating</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentDate = ref(new Date())

var imageContainer = document.querySelector('.image-container')
var image = imageContainer?.querySelector('img')

image?.addEventListener('load', function () {
  imageContainer?.classList.add('loaded')
})
</script>

<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  display: flex;
  justify-content: space-between;
}
.button {
  padding: 0;
  min-height: auto;
}

.image-container {
  position: relative;
  max-width: 100%;
  overflow: hidden;
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
</style>

<script setup lang="ts"></script>
