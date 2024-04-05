
<script setup lang="ts">

</script>
<template>
  <div class="rwdBody">
    <slot name="slotName" class="slot-content" ></slot>
  </div>
</template>

<style lang="scss" scoped>
.rwdBody {
  margin:40px 10px; 
  @media (min-width: $breakpoint-xs) {
    margin-left: 10px;
    margin-right: 10px;
  }
  @media (min-width: $breakpoint-sm) {
    margin-left: 10px;
    margin-right: 10px;
  }
  @media (min-width: $breakpoint-md) {
    margin-left: 20px;
    margin-right: 20px;
  }
  @media (min-width: $breakpoint-lg) {
    margin-left: 40px;
    margin-right: 40px;
  }
  @media (min-width: $breakpoint-xl) {
    margin-left: 80px;
    margin-right: 80px;
  }

  @media (min-width: $breakpoint-xxl) {
    margin-left: 160px;
    margin-right: 160px;
  }
}
</style>
