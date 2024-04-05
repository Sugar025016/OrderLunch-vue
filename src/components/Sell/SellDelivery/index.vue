<script setup lang="ts">
import { Calendar } from '@element-plus/icons-vue'

import SellOrderNew from '../SellOrderNew/index.vue'
import SellOrderHandle from '../SellOrderHandle/index.vue'
import SellOrderFinish from '../SellOrderFinish/index.vue'

// src/components/Sell/SellOrderNew/index.vue
</script>

<template>
  <div>
    <el-tabs type="border-card" class="demo-tabs">
      <!-- <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <span>Route</span>
          </span>
        </template>
        Route
      </el-tab-pane> -->

      <el-tab-pane label="新訂單"><SellOrderNew></SellOrderNew></el-tab-pane>
      <el-tab-pane label="待處理訂單"><SellOrderHandle></SellOrderHandle></el-tab-pane>
      <el-tab-pane label="待外送訂單">Task</el-tab-pane>
      <el-tab-pane label="已完成訂單"><SellOrderFinish></SellOrderFinish></el-tab-pane>

      <!-- <template v-for="(item, index) in props.menuList" :key="item.path">
        <el-tab-pane label="Task">Task</el-tab-pane>
      </template> -->
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .el-tabs {
  border: 0px;
  // background: red;

  .el-tabs--border-card {
    // background: red;
    border: 0px solid red;
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #0b5ce7;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

</style>

