<template>
  <rwdBody>
    <template #slotName>
      <el-row class="member" :gutter="20">
        <el-col :span="6">
          <div class="body-left">
            <el-button
              @click="changeTab('profile', userData)"
              size="large"
              class="tabsChange"
              :class="{ buttonDown: route.params.number === userData }"
              round
            >
              會員資料
            </el-button>
            <el-button
              @click="changeTab('love', userLove)"
              size="large"
              class="tabsChange"
              :class="{ buttonDown: route.params.number === userLove }"
              round
            >
              收藏店家
            </el-button>
            <el-button type="warning" size="large" class="button" round>
              採購小幫手
            </el-button>
          </div>
        </el-col>

        <el-col :span="18" class="body-right">
          <h1>會員資料</h1>
          <div class="tabs">
            <div class="tabs-header">
              <div
                v-for="(tab, index) in userTabs"
                :key="index"
                @click="changeTab(tab.content, userData)"
                v-show="route.params.number === userData"
              >
                <span
                  class="tab-label underline"
                  :class="{ active: route.name === tab.content }"
                >
                  {{ tab.label }}
                </span>
              </div>
              <div
                v-for="(tab, index) in loveTabs"
                :key="index"
                @click="changeTab(tab.content, userLove)"
                v-show="route.params.number === userLove"
              >
                <span
                  class="tab-label underline"
                  :class="{ active: route.name === tab.content }"
                >
                  {{ tab.label }}
                </span>
              </div>
            </div>
            <div class="tabs-content">
              <Router-view></Router-view>
            </div>
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
  .body-right {
    width: 100%;

    h1 {
      font-size: 36px;
    }
    .tabs {
      width: 100%;
      .tabs-header {
        display: flex;
        margin: 20px 0 0 0;
        color: #636262;
        border-bottom: 1px solid #63626236;
        white-space: nowrap;
        overflow-x: auto;
        div {
          position: relative;
          padding: 0 32px 0 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .tab-label {
          display: inline-block;
          position: relative;
          padding: 16px 0;
          z-index: 1;
        }

        .underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: transparent;
          transition: background-color 0.2s;
          display: inline-flex;
          position: relative;
          align-items: center;
          justify-content: center;
          border-bottom: 3px solid rgba(0, 0, 0, 0);
        }
        div:hover .underline {
          border-bottom: 3px solid $color;
        }
        .active {
          color: #000000;
          border-bottom: 3px solid $color;
        }
        div:hover {
          color: #000000;
        }
        .tabs-content {
          font-size: 30px;
          margin: 10px;
          border-bottom: #636262;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
