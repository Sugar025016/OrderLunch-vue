<template>
  <div class="buy-footer">
    <div class="toolbar">
      <div class="toolbar_left">
        <BreadCrumb />
      </div>
      <div class="toolbar_right">
        <socialMedia />
      </div>
    </div>
    <el-divider />
    <div class="footer-bottom">
      <bottom />
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './breadcrumb/index.vue'
import socialMedia from './socialMedia/index.vue'
import bottom from './bottom/index.vue'

defineProps(['scene'])
</script>
<style lang="scss" scoped>
.buy-footer {
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .toolbar_left {
      display: flex;
      align-items: center;
    }
    .toolbar_right {
      display: flex;
      align-items: center;
    }
  }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    align-items: flex-start;
  }
}
</style>
