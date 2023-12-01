<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
// import useCategoryStore from '@/store/modules/category'
import useShopStore from '@/store/modules/shop'
import { ShopSearch } from '@/api/shop/type'
import { getCategoryList } from '@/api/category'
import cityAreas from '@/utils/areaData.js'
import {
  Category,
  CategoryList,
  CategoryListResponse,
} from '@/api/category/type'

let selectedOption1 = ref(0)
let selectedOption2 = ref('')
let selectedOption3 = ref(0)
let categoryList = ref<Category[]>([])
// let categoryList: CategoryList
const city: string[] = Object.keys(cityAreas)
const areas: string[][] = Object.values(cityAreas)

let data: ShopSearch = {}
watch(selectedOption1, () => {
  selectedOption2.value = ''
  data.city = city[selectedOption1.value]
  getC1()
})

watch(selectedOption2, () => {
  data.area = selectedOption2.value === '' ? undefined : selectedOption2.value
  getC1()
})

watch(selectedOption3, () => {
  data.categoryId =
    selectedOption3.value == 0 ? undefined : selectedOption3.value

  getC1()
})

let shopStore = useShopStore()

const getCategory = async () => {
  let res: CategoryListResponse = await getCategoryList()
  categoryList.value = res.data
}
const getC1 = async () => {
  await shopStore.getShopList(data)
}

const searchText = ref('')
const showHistory = ref(false)

const searchHistory = ref<string[]>([])
const getSearchHistory = () => {
  const storedHistoryJSON = localStorage.getItem('searchHistory')
  if (storedHistoryJSON !== null) {
    searchHistory.value = JSON.parse(storedHistoryJSON)
    // 现在您可以使用 storedHistory
  } else {
    // 处理 localStorage 中没有搜索记录的情况，例如设置一个默认值
    searchHistory.value = [] // 默认值为空数组
  }
}

const handleInput = () => {
  showHistory.value = true
}

const search = () => {
  if (searchText.value) {
    if (!searchHistory.value.includes(searchText.value)) {
      searchHistory.value.unshift(searchText.value)
      if (searchHistory.value.length > 5) {
        searchHistory.value.pop()
      }
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
    showHistory.value = false
  }
  data.other = searchText.value === '' ? undefined : searchText.value
  getC1()
}

const fillInput = (history: string) => {
  searchText.value = history
  showHistory.value = false
}

onMounted(() => {
  getC1()
  getCategory()
  getSearchHistory()
  window.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.search-input')) {
      showHistory.value = false
    }
  })
})
</script>
<template>
  <div class="form">
    <div class="form-item el-form-item">
      <div class="custom-select-wrapper">
        <select class="custom-select" v-model="selectedOption1">
          <option
            v-for="(c1, index) in city"
            :key="index"
            :value="index"
            :disabled="index === 0"
          >
            {{ c1 }}
          </option>
        </select>
        <div class="select-arrow">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
      </div>
    </div>

    <div class="form-item el-form-item">
      <div class="custom-select-wrapper">
        <select
          class="custom-select area"
          :disabled="selectedOption1 === 0"
          v-model="selectedOption2"
        >
          <option selected value="">區域鄉鎮</option>
          <option v-for="c1 in areas[selectedOption1]" :key="c1" :value="c1">
            {{ c1 }}
          </option>
        </select>
        <div class="select-arrow">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
      </div>
    </div>

    <div class="el-form-item item-category">
      <div class="custom-select-wrapper">
        <select class="custom-select category" v-model="selectedOption3">
          <option value="0">全部</option>
          <option v-for="c1 in categoryList" :key="c1.id" :value="c1.id">
            {{ c1.name }}
          </option>
        </select>
        <div class="select-arrow">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
      </div>
    </div>
    <div class="el-form-item search-container">
      <div class="search-input">
        <input
          v-model="searchText"
          @input="handleInput"
          @focus="showHistory = true"
        />
        <el-button @click="search" type="primary">搜尋</el-button>
      </div>
      <div class="search-history" v-if="showHistory">
        <div class="history-title">Search History:</div>
        <ul>
          <li
            v-for="history in searchHistory"
            :key="history"
            @click="fillInput(history)"
          >
            {{ history }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.form {
  display: grid;
  grid-template-columns: 3fr 4fr 5fr 12fr;
  grid-column-gap: 10px;
  .el-form-item {
    overflow: hidden;
    padding: 0px;
    display: flex;
    align-items: center;
    border-radius: 50px;

    .custom-select-wrapper {
      width: 100%;
      position: relative;
      right: 0;
      left: 0;
      select::-ms-expand {
        display: none;
      }
      .custom-select {
        width: 100%;
        height: 40px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: transparent;
        border: 1px solid $border;
        border-radius: 50px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 500;
        color: $font;
        outline: none;
        cursor: pointer;
        cursor: pointer; /* 預設游標樣式 */
        background-color: rgb(255, 255, 255);
      }

      .custom-select:hover {
        border: 1px solid $color;
      }

      /* 禁用時游標變換成禁止圖示 */
      .custom-select:disabled {
        // color: #999;
        color: #777777;
        cursor: not-allowed;
      }
      .select-arrow {
        display: flex;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background: url('@/assets/icons/expand.png') no-repeat;
        z-index: 1;
      }
    }
  }

  .el-form-item:last-child {
    margin-right: 0;
  }

  .search-container {
    margin-right: 0px;
    height: 40px;

    .search-input {
      height: 100%;
      position: relative;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 40px;
      background-color: rgb(255, 255, 255);
      input {
        padding: 5px 20px;
        width: 80%;
        border: 0px solid #ccc;
        border-radius: 40px 0 0 40px;
        outline: none;
        background: #cccccc00;
      }

      button {
        height: 100%;
        left: 0;
        padding: 10px 15px;
        // background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
        outline: none;
        border-radius: 40px;
        width: 20%;
      }
    }

    .search-input:hover {
      border: 1px solid $color;
    }

    .search-history {
      max-width: 400px;
      position: absolute;
      top: calc(100% - 10px);
      width: auto;
      min-width: 300px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 10;

      .history-title {
        font-weight: bold;
        margin-bottom: 5px;
        padding: 5px 10px;
        background-color: #f4f4f4;
        border-radius: 4px 4px 0 0;
      }
      ul {
        padding: 0;
      }

      li {
        padding: 5px 10px;
        cursor: pointer;

        &:hover {
          background-color: #f4f4f4;
        }
      }
    }
  }

  @media (max-width: $breakpoint-md) {
    margin: 0 10px;
    display: grid;
    grid-template-columns: minmax(120px, 2fr) minmax(150px, 3fr) minmax(
        200px,
        4fr
      );
    .search-container {
      display: grid;
      grid-column: span 3;
    }
  }

  @media (max-width: $breakpoint-xs) {
    margin: 0 10px;
    display: grid;
    grid-template-columns: minmax(120px, 2fr) minmax(150px, 3fr);
    grid-column-gap: 10px;
    .search-container {
      display: grid;
      grid-column: span 2;
    }
    .item-category {
      display: grid;
      grid-column: span 2;
    }
  }
}
</style>
