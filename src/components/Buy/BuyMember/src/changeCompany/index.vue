<template>
  <div class="changeProfile">
    <div class="item">
      <span>糖心蛋</span>
      <input type="text" class="rounded-input" placeholder="输入文本" />
    </div>

    <div class="item">
      <span>糖心蛋</span>
      <input type="text" class="rounded-input" placeholder="输入文本" />
    </div>
    <div class="item">
      <span>糖心蛋</span>
      <input type="text" class="rounded-input" placeholder="输入文本" />
    </div>
    <div class="item">
      <span>糖心蛋</span>
      <input type="text" class="rounded-input" placeholder="输入文本" />
    </div>

    <div class="item address">
      <span>糖心蛋</span>
      <div class="address-text">
        <!-- <el-form :inline="true"> -->
        <el-form-item>
          <!-- :inline="true"> -->
          <el-dropdown class="el-dropdown border">
            <span class="el-dropdown-link">
              縣市
              <el-icon class="el-icon--right el-icon">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>

        <el-form-item>
          <el-dropdown class="el-dropdown border">
            <span class="el-dropdown-link">
              區域鄉鎮
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  Acticcccccdddddddddddcccccn 1
                </el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>

        <el-form-item class="detail" size="50px">
          <el-dropdown class="el-dropdown border" size="large">
            <span class="el-dropdown-link" size="large">
              其他
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  Acticcccccdddddddddddcccccn 1
                </el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
        <!-- </el-form> -->
      </div>
    </div>
    <div class="item">
      <span>糖心蛋</span>
      <input type="text" class="rounded-input" placeholder="输入文本" />
    </div>
    <div class="item">
      <span>糖心蛋</span>
      <input type="text" class="rounded-input" placeholder="输入文本" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.changeProfile {
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }
  .item {
    display: flex;
    flex-direction: column;
    margin: 10px 10px 0 0;
    .rounded-input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 20px;
      margin-bottom: 10px;
    }
    span {
      margin: 5px;
    }
  }
  .address {
    display: grid;
    grid-column: span 2;
    .address-text {
      margin: 0;
      display: grid;
      grid-template-columns: 1fr 1fr 2fr;
      @media (max-width: $breakpoint-sm) {
        grid-template-columns: repeat(2, 1fr);
        .detail {
          display: grid;
          grid-column: span 2;
        }
      }
      .border {
        width: 100%;
        border: 1px solid #ccc;
        background-color: white;
        border-radius: 20px;
        width: 100%;
        margin: 0;
        padding: 5px;
        margin: 0 10px 0 0;
        span {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
