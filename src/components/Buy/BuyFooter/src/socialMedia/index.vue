<script setup lang="ts"></script>
<template>
  <a class="icon-a" href="https://zh-tw.facebook.com/" target="k" rel="">
    <img
      src="@/assets/icons/facebook.png"
      class="w-8 h-8 rounded-full"
      loading="lazy"
    />
    <span class="icon-span">分享</span>
  </a>
  <a class="icon-a" href="https://zh-tw.facebook.com/" target="k" rel="">
    <img
      src="@/assets/icons/line.png"
      class="w-8 h-8 rounded-full"
      loading="lazy"
    />
    <span class="icon-span">分享</span>
  </a>
</template>
<style lang="scss" scoped>
.icon-a {
  margin: 0 0 0 20px;
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  text-decoration: none; /* 去除底線 */
  img {
    width: 30px;
    height: 30px;
    border-radius: 20px;
    margin: 0 10px;
  }
  .icon-span {
    color: #fcfcfc;
    font-size: 18px;
  }
}
</style>
