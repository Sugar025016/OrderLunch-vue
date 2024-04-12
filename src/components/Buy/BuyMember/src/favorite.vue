<template>
  <rwdBody>
    <template #slotName>
      <el-row class="member" :gutter="20">
        <el-col :span="24" class="body">
          <h1>收藏店家</h1>
          <div class="favorites">
            <el-row class="row3">
              <template v-for="c1 in userStore.favoriteShop">
                <def-shop-card :shop="c1"></def-shop-card>
              </template>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </template>
  </rwdBody>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import rwdBody from '@/components/layout/rwdBody/index.vue'
import useUserStore from '@/store/modules/user'

let userStore = useUserStore()
let $router = useRouter()
const route = useRoute()
const userData = 'userData'
const userLove = 'userLove'
interface Tab {
  label: string
  content: string
}
const userTabs: Tab[] = [
  { label: '會員資料', content: 'profile' },
  { label: '修改會員資料', content: 'changeProfile' },
  { label: '修改登入密碼', content: 'changePassword' },
]
const loveTabs: Tab[] = [
  { label: '我的收藏', content: 'love' },
  { label: '為你推薦', content: 'recommend' },
]

const changeTab = (name: string, number: string = userData) => {
  $router.push('/BuyMember/' + name + '/' + number)
}
</script>
<style lang="scss" scoped>
.member {
  display: flex;

  .body-left {
    margin: 30px auto;
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    button {
      margin: 5px 0;
      background-color: white;
      color: #000;
      border: 0;
      min-width: 100px;
    }

    .buttonDown {
      background-color: $color;
      color: #000;
    }
    .buttonDown:hover {
      background-color: rgb(253, 102, 20);
    }
    button:hover {
      background-color: rgba(253, 114, 1, 0.247);
      color: #000;
    }
  }
  .body {
    width: 100%;

    h1 {
      font-size: 36px;

      margin: 0 10px;
    }
    .favorites {
      width: auto;
      margin: 20px 10px ;
      .row3 {
        display: grid; /* 使用CSS Grid布局 */
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 10px;
        margin: 10px 0;
        // padding: 0 5px;
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
      }
    }
  }
}
</style>
