<template>
  <div class="file-arae">
    <el-container>
      <el-main
        style="height: 450px;margin-top: 5px;" 
        v-loading="loadStatus"
        element-loading-text="Loading..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="#ffffff"
      > 
        <el-row :gutter="20">
          <div style="margin: 0 auto; text-align: center;margin-top: 10px;">
            <el-input
              v-model="searchContent"
              placeholder="Search by name or address"
              style="width: 500px;"
              size="large"
            >
            </el-input>
            <el-button :icon="Search" type="primary" size="large">Search</el-button>
          </div>
        </el-row>
      </el-main>
      <el-footer>
        <div>
          <el-button type="primary" style="margin-top: 10px;" @click="onHandlePrev">Prev
          </el-button>
          <el-button type="primary" style="margin-top: 10px;" @click="onHandleNext" :disabled="!hasMore">Next
          </el-button>          
      </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NamesPage',
  props: {
  }
}
</script>

<script setup lang="ts">
</script>>