<template>
  <div class="flex flex-col items-center">
    <!-- 顶部 -->
    <Top></Top>

    <n-message-provider>
      <div class="mt-10 w-full min-h-190">
        <router-view></router-view>
      </div>
    </n-message-provider>


    <!-- 底部 -->
    <Bottom></Bottom>
  </div>
</template>

<script setup lang="ts">
import { NMessageProvider } from "naive-ui";

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 70px;
    width: 100%;
    min-height: 700px;
  }
}
</style>