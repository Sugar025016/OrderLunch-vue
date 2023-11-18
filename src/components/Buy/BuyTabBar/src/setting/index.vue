<template>
  <def-svg-icon
    @click="toLogin"
    name="person"
    color="#fd7e14"
    width="35px"
    height="35px"
    class="svg-icon"
  ></def-svg-icon>
  <!-- <img :src="userStore.avatar" alt=""  v-if="(userStore.token != '')"/> -->

  <el-dropdown class="car" v-if="userStore.username">
    <!-- <el-dropdown class="car" > -->
    <span class="el-dropdown-link" style="cursor: pointer">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="changeLink('profile', userData)">
          會員資料
        </el-dropdown-item>
        <el-dropdown-item @click="changeLink('changeProfile', userData)">
          修改會員資料
        </el-dropdown-item>
        <el-dropdown-item @click="changeLink('changeCompany', userData)">
          修改公司資料
        </el-dropdown-item>
        <el-dropdown-item @click="changeLink('changePassword', userData)">
          修改登入密碼
        </el-dropdown-item>
      </el-dropdown-menu>
      <el-dropdown-menu>
        <el-dropdown-item @click="changeLink('love', userLove)">
          收藏店家
        </el-dropdown-item>
      </el-dropdown-menu>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout('BuyShops')">登出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div class="car shopCar">
    <router-link :to="'/BuyShopCart'" class="link">
      <ShoppingBag class="icon car" />
      <span class="cartQuantity text-white bg-warning conut">
        {{ userStore.cartCount }}
      </span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Refresh,
  Setting,
  FullScreen,
  ArrowDown,
} from '@element-plus/icons-vue'
import useLayOutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayOutSettingStore()
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()
let dark = ref<boolean>(false)

const goRoute = (path: string) => {
  $router.push(path)
}

const path = window.location.hash
$router.getRoutes()

const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}
const toLogin = () => {
  // $router.push('/login')

  if (
    !userStore.token ||
    userStore.token === undefined ||
    userStore.token === ''
  ) {
    $router.push({ path: '/login', query: { redirect: path } })
  }
}
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const logout = async () => {
  let res: any = await userStore.userLogout()
  if (res.code === 200) {
    if ($route.meta.mustToken) {
      $router.push({ path: '/', query: { redirect: $route.path } })
    }
  }
}
const userData = 'userData'
const userLove = 'userLove'
const changeLink = async (path: string, page: string = userData) => {
  $router.push('/BuyMember/' + path + '/' + page)
}

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const changeDark = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}

const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
</script>

<style lang="scss" scoped>
img {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin: 0 10px;
}

.svg-icon {
  border-radius: 20px;
  margin: 2px;
}

.car {
  // margin: 0 30px 0 0;
  // background-color: aqua;

  .icon {
    margin: 0;
  }
  .conut {
    border-radius: 50%;
    background: $color;
    background-color: $color;
    // background-color: brown;
  }
}

.shopCar {
  margin: 0 0 0 30px;
}

.position {
  &-relative {
    position: relative;
  }
  &-absolute {
    position: absolute;
  }
}
.link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  .cartQuantity {
    position: relative;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10px;
    top: -10px;
  }
}

.bg-warning {
  background-color: $color;
}

.text-white {
  font-size: 18px;
  color: white;
}
</style>
