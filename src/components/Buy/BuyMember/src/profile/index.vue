<template>
  <el-row class="member" :gutter="20">
    <el-col :span="12">
      <h3>個人資料</h3>

      <div class="text">
        <span>帳號：</span>
        <span>{{ userStore.account }}</span>
      </div>
      <div class="text">
        <span>姓名：</span>
        <span>{{ userStore.username }}</span>
      </div>
      <div class="text">
        <span>E-mail：</span>
        <span>{{ userStore.email }}</span>
      </div>
      <div class="text">
        <span>手機：</span>
        <span>{{ userStore.phone }}</span>
        <el-button class="text-button" round>驗證手機號碼</el-button>
      </div>
      <div class="text">
        <span>LINE Notify：</span>
        <span>BBBBB</span>
        <el-button class="text-button" round>連結Line Notify</el-button>
      </div>
      <div class="text">
        <span>外送地址：</span>
        <span v-if="userStore.address">
          {{
            userStore.address.city +
            userStore.address.area +
            userStore.address.detail
          }}
        </span>
      </div>
    </el-col>
    <el-col :span="12">
      <h3>公司資料</h3>
      <div class="text">
        <span>團體名稱：</span>
        <span>AAA</span>
      </div>
      <div class="text">
        <span>統一編號：</span>
        <span>BBBBBB</span>
      </div>
      <div class="text">
        <span>電話：</span>
        <span>aaaa@gmail.com</span>
      </div>
      <div class="text">
        <span>傳真：</span>
        <span>09123456789</span>
      </div>
      <div class="text">
        <span>地址：</span>
        <span>BBBBB</span>
      </div>
      <div class="text">
        <span>人數/數量：</span>
        <span>0</span>
      </div>
      <div class="text">
        <span>預算：</span>
        <span></span>
      </div>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
</script>
<style lang="scss" scoped>
.member {
  h3 {
    font-size: 20px;
    margin: 30px 0;
  }
  .text {
    margin: 20px 0;
    span {
      font-size: 16px;
      margin: 20px 0;
    }
    .text-button {
      margin: 0 20px;
      background-color: $color;
      color: #000;
    }
  }
}
</style>
