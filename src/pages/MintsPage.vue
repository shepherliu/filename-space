<template>
  <div class="file-arae">
    <el-container>
      <el-main
        style="height: 450px;margin-top: 20px;" 
        v-loading="loadStatus"
        element-loading-text="Loading..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="#ffffff"
      > 
        <el-row :gutter="20">
          <el-col>
            <h2 style="text-align: center;margin: 0 auto; margin-top: 100px">File Name Space</h2>
          </el-col>
          <el-col>
            <h5 style="text-align: center;margin: 0 auto;">a decentralized web3 name service for ethereum and filecoin.</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <div style="margin: 0 auto; text-align: center;margin-top: 50px;">
            <el-input
              v-model="searchName"
              placeholder="Explore the space"
              style="width: 500px;"
              size="large"
              clearable
            >
              <template #append>.fil
              </template>
            </el-input>
            <el-button :icon="Search" type="primary" size="large" @click="onClickToSearch">Search</el-button>
          </div>
        </el-row>
        <el-row :gutter="20">
          <table v-if="showName" style="margin: 0 auto;margin-top: 10px; text-align: center;width: 585px;border: solid 1px;border-color: #67C23A;">
            <template v-for="v in nameLists" :key="v.name">
              <tr v-if="v.nameId === 0">
                <td style="color: #409EFF;">
                  <el-icon type="primary"><Check /></el-icon>
                  {{v.name}}
                </td>
                <td style="color: #409EFF;">available</td>
                <td>
                  <el-button type="primary" @click="onClickToRegisterName(v)">Register</el-button>
                </td>
              </tr>
              <tr v-if="v.nameId > 0" style="color: #E6A23C;">
                <td>
                  <el-icon type="warning"><Close /></el-icon>
                   <el-link type="warning" target="_blank" :href="tokenExplorerUrl(filenamespace.getAddress(), v.nameId)">{{v.name}}</el-link>
                </td>
                <td style="color: #E6A23C;">registerted</td>
                <td>
                  <el-button type="warning" @click="onClickToViewNameInfo(v)">View</el-button>
                </td>
              </tr>
            </template>
          </table>
        </el-row>
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MintsPage',
  props: {
  }
}
</script>

<script setup lang="ts">
import { ref } from "vue";

import { FileNameSpace } from "../libs/filenamespace";

import { connectState } from "../libs/connect"
import * as constant from "../constant"

const searchName = ref('');

const showName = ref(false);

const nameLists = ref(new Array());

const filenamespace = new FileNameSpace();

const svg = `
      <path class="path" d="
        M 30 15
        L 28 17
        M 25.61 25.61
        A 15 15, 0, 0, 1, 15 30
        A 15 15, 0, 1, 1, 27.99 7.5
        L 15 15
      " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
    `;

//address explore url
const tokenExplorerUrl = (address:string, tokenId:string = '') => {
  for(const i in constant.chainList){
    if(connectState.chainId === constant.chainList[i].chainId){
      const blockExplorerUrls = constant.chainList[i].blockExplorerUrls;
      if(tokenId != ''){
        return `${blockExplorerUrls}/token/${address}?a=${tokenId}#inventory`
      }
      return `${blockExplorerUrls}/token/${address}`
    }
  }
  return address;
}  

const onClickToSearch = async () => {
  searchName.value = searchName.value.trim();

  nameLists.value = new Array();
  if(searchName.value === ''){
    showName.value = false;
    return;
  }else{
    showName.value = true;
  }

  const name = searchName.value + ".fil";

  const nameInfo = await filenamespace.getNameInfoByName(name);

  const newList = new Array();
  newList.push(nameInfo);
  nameLists.value = newList;
}

const onClickToRegisterName = async (nameInfo:any) => {

}

const onClickToViewNameInfo = async (nameInfo:any) => {

}
</script>>