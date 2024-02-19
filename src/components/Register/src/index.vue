<template>
  <div class="register">
    <div class="register-title">
      <!-- <h1 class="title">{{ title }}</h1> -->
      <div class="title">
        <def-title></def-title>
      </div>
      <div class="img">
        <img
          v-if="$route.path == '/Register/shop'"
          src="@/assets/images/openShop3.png"
          class="w-8 h-8 rounded-full"
          loading="lazy"
        />
        <img
          v-else
          src="@/assets/images/food.png"
          class="w-8 h-8 rounded-full"
          loading="lazy"
        />
      </div>
    </div>
    <div class="register-content">
      <!-- <member></member> -->
      <Router-view></Router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
let $route = useRoute()
$route.path

</script>
<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  .register-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 10%;
    .title {
      margin: 0 auto;
      vertical-align: middle;
      color: $color;
      font-weight: 700;
      font-size: 56px;
      white-space: nowrap;
    }

    .content {
      margin: 20px auto;
      min-width: 350px;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      .table-title {
        margin: 0 auto;
        vertical-align: middle;
        font-size: 30px;
        color: white;
        font-weight: 700;
      }
    }
    .img {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      margin: 20px 10%;
      img {
        width: 100%; /* Ensure image does not exceed container width */
        height: 100%; /* Ensure image does not exceed container height */
        max-width: 400px;
        max-height: 400px;

        min-width: 260px;
        min-height: 260px;
        object-fit: contain;
      }
    }
  }

  .register-content {
    // margin-right: 200px;
    margin: 0 10% 0 2%;
  }
}


</style>
