<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps({
  scheduleVisible: Boolean,
})

const visible = ref(props.scheduleVisible)

const $emit = defineEmits(['update:scheduleVisible'])

const handleClose = () => {
  $emit('update:scheduleVisible', (visible.value = false))
}
</script>

<template>
  <div class="dialog">
    <el-dialog
      v-model="props.scheduleVisible"
      title="待接訂單"
      :before-close="handleClose"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="shop-name" @click="">
          <span>營業時間</span>
        </div>
        <div class="modal-content">
          <div class="modal-body">
            <el-table :data="gridData">
              <el-table-column property="date" label="Date" width="150" />
              <el-table-column property="name" label="Name" width="200" />
              <el-table-column property="address" label="Address" />
            </el-table>
          </div>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <!-- <el-button @click="cancel()" round>取消</el-button>
          <el-button type="primary" @click="confirm()" round>確認</el-button> -->
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.dialog {
  ::v-deep .el-dialog {
    border-radius: 20px;
    width: 800px;
    // margin: 10px;
    .el-dialog__header {
      margin: 0px;
      border-bottom: 1px;
      border-style: solid;
      border-color: rgb(155, 155, 155);
      padding: 20px 20px 15px 20px;
      display: flex;
      span {
        font-size: 26px;
        margin: 10px;
        // font-weight: 900;
      }
    }
    .shop-name {
      display: flex;
      // justify-content: center;
      align-items: center;
      margin: 0 0 10px 10px;
      font-size: 20px;
      font-weight: 700;
      .el-icon {
        margin-right: 2px;
      }
    }
    .modal-content {
      .modal-header {
        border-bottom: 2px;
        border-style: solid;
        border-color: rgb(155, 155, 155);
        button {
          margin: 10px;
        }
      }
      .modal-body {
        // border-width: 2px;
      }
    }
  }

  .dialog-footer {
    // button:first-child {
    //   margin-right: 10px;
    // }

    .el-button {
      margin-right: 20px;
      ::v-deep span {
        font-size: 16px;
        margin: 10px;
      }
    }
  }
}
</style>
