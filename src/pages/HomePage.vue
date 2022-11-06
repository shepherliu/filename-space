<template>
  <MintsPage v-if="activeIndex==='1'"/>  
  <NamesPage v-if="activeIndex==='2'"/>  
  <UploadFile v-if="activeIndex==='3'"/> 
</template>

<script lang="ts">

import MintsPage from './MintsPage.vue';
import NamesPage from './NamesPage.vue';
import UploadFile from '../components/UploadFile.vue';

export default {
  name: 'HomePage',
  props: {
    msg: String
  }
}
</script>

<script setup lang="ts">
import { connectState } from "../libs/connect"

const activeIndex = connectState.activeIndex;
</script>