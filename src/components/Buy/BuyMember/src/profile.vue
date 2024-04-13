<template>
  <rwdBody>
    <template #slotName>
      <el-row class="member">
        <!-- <el-col :span="12"> -->
        <div class="member-context">
          <h1>個人資料</h1>

          <div class="text">
            <span>帳號-E-mail：</span>
            <span>{{ userStore.account }}</span>
            <!-- <span class="change-password">修改密碼</span>
            <el-button class="text-button" round>修改密碼</el-button> -->
            <el-link type="primary" class="change" :underline="false">
              變更密碼
            </el-link>
          </div>
          <div class="text">
            <span>名稱：</span>
            <span>{{ userStore.username }}</span>
            <!-- <el-button class="text-button" round>修改名稱</el-button> -->
            <el-link type="primary" class="change" :underline="false">
              更改名稱
            </el-link>
          </div>
          <!-- <div class="text">
            <span>E-mail：</span>
            <span>{{ userStore.email }}</span>
          </div> -->
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
          <!-- <div class="text">
        <span>外送地址：</span>
        <span v-if="userStore.address">
          {{
            userStore.address.city +
            userStore.address.area +
            userStore.address.detail
          }}
        </span>
      </div> -->
        </div>
      </el-row>
    </template>
  </rwdBody>
</template>
<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import rwdBody from '@/components/layout/rwdBody/index.vue'
let userStore = useUserStore()
</script>
<style lang="scss" scoped>
.member {
  display: flex;
  align-items: center;
  justify-content: center;
  .member-context {
    h1 {
      font-size: 36px;

      margin: 30px 0px;
    }
    .text {
      margin: 20px 0;
      span {
        font-size: px;
        margin: 20px 0;
      }
      .text-button {
        margin: 0 20px;
        background-color: $color;
        color: #000;
      }
      .change {
        font-size: 16px;
        margin: 0 15px;
      }
    }
  }
}
</style>
