<template>
  <div class="file-arae">
    <el-container>
      <el-drawer 
        v-model="showNameSpaceVisiable"
        direction="rtl" 
        destroy-on-close 
      >
        <template #header>
          <h4>Name Space Info.</h4>   
        </template>
        <template #default>
          <el-upload 
            style="width: 200px;"
            :drag="false"
            :multiple="false"
            class="upload-avatar"
            ref="uploadAvatar"
            action=""
            @change="onChangeSelectAvatarFile"
            @click="onSelectAvatarFile"
            accept="image/*"
            :limit="1"
            :show-file-list="false"
            :on-exceed="handleAvtarExceed"
            :auto-upload="false"
            :disabled="nameDetailInfo.isOwner===false"
          >
            <template #trigger>
              <el-avatar :size="100" :src="nameDetailInfo.url">
              </el-avatar>
            </template>
          </el-upload>
          <table style="text-align:left;">
            <tr>
              <td>Id</td>
              <td>
                <el-link type="primary" style="float: left;" target="_blank" :href="tokenExplorerUrl(filenamespace.getAddress(), nameDetailInfo.nameId)">{{nameDetailInfo.nameId}}</el-link>
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                <el-link type="primary" style="float: left;" target="_blank" :href="tokenExplorerUrl(filenamespace.getAddress(), nameDetailInfo.nameId)">{{nameDetailInfo.name}}</el-link>
              </td>
            </tr>
            <tr>
              <td>Owner</td>
              <td>
                <el-link type="primary" target="_blank" :href="addressExplorerUrl(nameDetailInfo.owner)">{{tools.shortString(nameDetailInfo.owner)}}</el-link><el-icon @click="onClickToCopy(nameDetailInfo.owner)"><document-copy /></el-icon>
              </td>
            </tr>
            <template v-for="info in nameDetailInfo.externalInfos" :key="info.name">
              <tr v-if="nameDetailInfo.isOwner || nameDetailInfo.updated">
                <td>{{info.name}}</td>
                <td style="color: #409EFF">
                  <el-input v-if="nameDetailInfo.isOwner" v-model="info.value" clearable></el-input>
                  <p v-if="!nameDetailInfo.isOwner">{{info.value}}</p>
                </td>
                <td><el-button v-if="nameDetailInfo.isOwner" type="danger" @click="onClickToRemoveKeyValues(info.name)"><el-icon><Minus /></el-icon></el-button></td>
              </tr>
            </template>
            <tr v-if="nameDetailInfo.isOwner">
              <td><el-input v-model="inputNameKey" placeholder="Key" clearable /></td>
              <td><el-input v-model="inputNameValue" placeholder="Value" clearable /></td>
              <td><el-button type="primary" @click="onClickToAddKeyValues"><el-icon><Plus /></el-icon></el-button></td>
            </tr>
          </table>
        </template>
        <template #footer>
          <div 
            style="flex: auto"
            v-loading="loadDrawerStatus" 
            element-loading-text="Submitting..."
            :element-loading-spinner="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
            element-loading-background="#00FFD1"
          >
            <el-button v-if="nameDetailInfo.isOwner===true" @click="cancelNameSpaceUpdate">cancel</el-button>
            <el-button v-if="nameDetailInfo.isOwner===true" type="primary" @click="confirmNameSpaceUpdate">confirm</el-button>
          </div>
        </template>          
      </el-drawer>          
      <el-main
        style="height: 450px;margin-top: 5px;" 
        v-loading="loadStatus"
        element-loading-text="Loading..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="#00FFD1"
      > 
        <el-row :gutter="20">
          <div style="margin: 0 auto; text-align: center;margin-top: 10px;">
            <el-input
              v-model="searchContent"
              placeholder="Search by name or address"
              style="width: 500px;"
              size="large"
              clearable
            >
            </el-input>
            <el-button :icon="Search" type="primary" size="large" @click="onClickToSearch">Search</el-button>
          </div>
        </el-row>
        <el-row :gutter="20">
          <template v-for="info in nameLists" :key="info.nameId">
            <el-col :span="8">
              <el-card class="box-card" shadow="always">
                <template #header>
                  <el-link style="float: left;" target="_blank" :href="tokenExplorerUrl(filenamespace.getAddress(), info.nameId)">{{info.name}}</el-link>
                </template>
                <el-avatar :size="100" :src="info.url" />
                <el-link target="_blank" :href="addressExplorerUrl(info.owner)">{{tools.shortString(info.owner)}} <el-icon @click="onClickToCopy(info.owner)"><document-copy /></el-icon></el-link>

                <el-button 
                  type="success" 
                  size="small" 
                  style="float: right;" 
                  v-if="info.isOwner===false"
                  @click="onClickToViewNameInfo(info)"
                >View</el-button>

                <el-button 
                  type="danger" 
                  size="small" 
                  style="float: right;margin-left: 5px;" 
                  v-if="info.isOwner===true"
                  @click="onClickToBurnNameInfo(info)"
                >Burn</el-button>
                <el-button 
                  type="warning" 
                  size="small" 
                  style="float: right;right;margin-left: 5px;" 
                  v-if="info.isOwner===true"
                  @click="onClickToSendNameInfo(info)"
                >Send</el-button>
                <el-button 
                  type="primary" 
                  size="small" 
                  style="float: right;right;margin-left: 5px;" 
                  v-if="info.isOwner===true"
                  @click="onClickToViewNameInfo(info)"
                >Edit</el-button>
              </el-card>
            </el-col>
          </template>
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
import { h, ref } from "vue"
import Resolution from "@unstoppabledomains/resolution"
import { toRaw } from '@vue/reactivity'
import { genFileId } from 'element-plus'

import type { UploadInstance, UploadProps, UploadRawFile, UploadFile, UploadFiles } from 'element-plus'

import { connected, networkConnect, connectState } from "../libs/connect"
import { FileNameSpace } from "../libs/filenamespace"

import * as element from "../libs/element"
import * as tools from "../libs/tools"
import * as storage from '../libs/storage'
import * as w3name from "../libs/w3name"
import * as constant from "../constant"
import * as crypto from "../libs/crypto"

const resolution = new Resolution();

const uploadAvatar = ref<UploadInstance>();
const avatarFileList = ref(new Array());

const searchContent = ref('');
const filenamespace = new FileNameSpace();
const nameLists = ref(new Array());
const loadStatus = ref(false);
const loadDrawerStatus = ref(false);
const showNameSpaceVisiable = ref(false);

const inputNameKey = ref('');
const inputNameValue = ref('');

const nameDetailInfo = ref({
  nameId: 0,
  name: name,
  url: '',
  publicKey: '',
  privateKey: '',
  owner: '',
  oldOwner: '',
  updated: false,
});

const hasMore = ref(false);
const pageSize = ref(9);
const pageCount = ref(0);

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

//address explore url
const addressExplorerUrl = (address:string) => {
  for(const i in constant.chainList){
    if(connectState.chainId === constant.chainList[i].chainId){
      const blockExplorerUrls = constant.chainList[i].blockExplorerUrls;
      return `${blockExplorerUrls}/address/${address}`
    }
  }
  return address;
}     

//transaction explore url
const transactionExplorerUrl = (transaction:string) => {
  for(const i in constant.chainList){
    if(connectState.chainId === constant.chainList[i].chainId){
      const blockExplorerUrls = constant.chainList[i].blockExplorerUrls;
      return blockExplorerUrls + '/tx/' + transaction;
    }
  }
  return transaction;
}

//on click to copy address
const onClickToCopy = async (content:string) => {
  tools.clickToCopy(content);
  
  element.elMessage('success', 'Copy ' + content + ' to clipboard success.');     
}; 

//on avatar file change
const onChangeSelectAvatarFile = async (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  avatarFileList.value = toRaw(uploadFiles);

  nameDetailInfo.value.url = URL.createObjectURL((avatarFileList.value[0].raw as any));
}

//on click to select avatar file
const onSelectAvatarFile = async () => {
  uploadAvatar.value!.clearFiles();
}

//replace the avatar file from old selected to new one
const handleAvtarExceed: UploadProps['onExceed'] = (files:any) => {
  uploadAvatar.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadAvatar.value!.handleStart(file);
};

const onClickToSearch = async () => {
  tools.setUrlParamter('nameId', '0');
  
  searchContent.value = searchContent.value.trim();
  if(searchContent.value === ''){
    handleClick();
    return;
  }

  const nameInfo = await filenamespace.getNameInfoByName(searchContent.value);
  if(nameInfo.nameId > 0){
    const newList = new Array();
    nameInfo.isOwner = nameInfo.owner.toLowerCase() === connectState.userAddr.value.toLowerCase();
    nameInfo.updated = nameInfo.owner === nameInfo.oldOwner;
    newList.push(nameInfo);
    nameLists.value = newList;
    return;
  }

  try{
    const newList = new Array();
    const names = await filenamespace.resolveByAddress(searchContent.value);
    for(const i in names){
      const nameInfo = await filenamespace.getNameInfoByName(names[i]);
      if(nameInfo.nameId > 0){
        nameInfo.isOwner = nameInfo.owner.toLowerCase() === connectState.userAddr.value.toLowerCase();
        nameInfo.updated = nameInfo.owner === nameInfo.oldOwner;
        newList.push(nameInfo);
      }
    }
    nameLists.value = newList;
  }catch(e){
    nameLists.value = new Array();
  }
  
}

const onClickToViewNameInfo = async (nameInfo:any) => {
  showNameSpaceVisiable.value = true;

  nameDetailInfo.value.nameId = nameInfo.nameId;
  nameDetailInfo.value.name = nameInfo.name;
  nameDetailInfo.value.url = nameInfo.url;
  nameDetailInfo.value.publicKey = nameInfo.publicKey;
  nameDetailInfo.value.privateKey = nameInfo.privateKey;
  nameDetailInfo.value.owner = nameInfo.owner;
  nameDetailInfo.value.oldOwner = nameInfo.oldOwner;
  nameDetailInfo.value.updated = nameInfo.updated;
  nameDetailInfo.value.isOwner = nameInfo.isOwner;

  const name = await w3name.parseName(nameInfo.publicKey);
  if(name != null){
    try{
      nameDetailInfo.value.externalInfos = new Array();
      const values = JSON.parse(await w3name.resolveName(name));
      for(const k in values){
        nameDetailInfo.value.externalInfos.push(values[k]);
      }
    }catch(e){
      nameDetailInfo.value.externalInfos = new Array();
    }
  }else{
    nameDetailInfo.value.externalInfos = new Array();
  }
}

const onClickToAddKeyValues = async () => {
  if(inputNameKey.value === '' || inputNameValue.value === ''){
    return;
  }

  nameDetailInfo.value.externalInfos.push({
    name: inputNameKey.value,
    value: inputNameValue.value,
  });

  inputNameKey.value = '';
  inputNameValue.value = '';
}

const onClickToRemoveKeyValues = async (key:string) => {
  const externalInfos = new Array();

  for(const i in nameDetailInfo.value.externalInfos){
    if(nameDetailInfo.value.externalInfos[i].name != key){
      externalInfos.push(nameDetailInfo.value.externalInfos[i]);
    }
  }

  nameDetailInfo.value.externalInfos = externalInfos;
}

const confirmNameSpaceUpdate = async () => {
  try{

    loadDrawerStatus.value = true;

    if(toRaw(avatarFileList.value).length === 1){
      nameDetailInfo.value.url = await storage.uploadFile(toRaw(avatarFileList.value)[0]);
      const tx = await filenamespace.updateAvatar(nameDetailInfo.value.nameId, nameDetailInfo.value.url);
      connectState.transactions.value.unshift(tx);
      connectState.transactionCount.value++;
      const msg = `<div><span>Update name avatar success! Transaction: </span><a href="${transactionExplorerUrl(tx)}" target="_blank">${tx}</a></div>`;
      element.elMessage('success', msg, true);    
    }

    const externalInfos = {};
    for(const i in nameDetailInfo.value.externalInfos){
      const key = nameDetailInfo.value.externalInfos[i].name;
      const value = nameDetailInfo.value.externalInfos[i].value;
      if(key === null || key === undefined || key === '' || value === null || value === undefined || value === ''){
        continue;
      }
      externalInfos[key] = nameDetailInfo.value.externalInfos[i];
    }

    let privateKey = null;

    try{
      privateKey = await crypto.decryptPasswordWithWallet(JSON.parse(nameDetailInfo.value.privateKey));
    }catch(e){
      privateKey = null;
    }

    const name = await w3name.updateName(privateKey, JSON.stringify(externalInfos));

    if(name.toString() != nameDetailInfo.value.publicKey){
      privateKey = await crypto.encryptPasswordWithWallet(tools.uint8ToString(name.key.bytes));
      if(privateKey.sign_data === null || privateKey.sign_data === '' || privateKey.signature === null || privateKey.signature === ''){
      return;
      }

      const tx = await filenamespace.updateKeys(nameDetailInfo.value.nameId, name.toString(), JSON.stringify(privateKey));
      connectState.transactions.value.unshift(tx);
      connectState.transactionCount.value++;
      const msg = `<div><span>Update name keys success! Transaction: </span><a href="${transactionExplorerUrl(tx)}" target="_blank">${tx}</a></div>`;
      element.elMessage('success', msg, true);    
    }else{
      const msg = `Update name keys success!`;
      element.elMessage('success', msg, false);  
    }

    handleClick();
  }catch(e){
    element.alertMessage(e);
  }finally{
    loadDrawerStatus.value = false;
  }  
}

const cancelNameSpaceUpdate = async () => {
  showNameSpaceVisiable.value = false;
}

const onClickToBurnNameInfo = async (nameInfo:any) => {
  try{
    const tx = await filenamespace.burn(nameInfo.nameId);
    connectState.transactions.value.unshift(tx);
    connectState.transactionCount.value++;
    const msg = `<div><span>Delete name space success! Transaction: </span><a href="${transactionExplorerUrl(tx)}" target="_blank">${tx}</a></div>`;
    element.elMessage('success', msg, true);       

    handleClick();
  }catch(e){
    element.alertMessage(e);
  }  
}

//on click to send nft token
const onClickToSendNameInfo = (nameInfo:any) => {
  const opts = {
    message: '',
    confirmButtonText: 'Send',
    cancelButtonText: 'Cancel',
    inputType: 'text',
    inputValue: '',
    inputPlaceholder: '0x0000000000000000000000000000000000000000',
    inputErrorMessage: 'Invalid address',
  };

  opts.message =  h('p', null, [
    h('p', null, 'Please enter address to send the name NFT:'),
    h('p', { style: 'color: teal' }, `name: ${nameInfo.name}`),
  ]);  

  element.elMessageBox('Please enter address to send the name NFT:', 'Send Name NFT', opts, async (name:string) => {

    name = name.trim().toLowerCase();

    let address = name;

    if(address === undefined ||
      address === null ||
      address === '' ||
      address === '0' ||
      address === '0x' ||
      address.match('0x0{1,}$') != null || 
      address === '0x000000000000000000000000000000000000dead'){
  
      name = "0x0000000000000000000000000000000000000000";
    }

    try{
      address = await resolution.addr(name, "ETH");
    }catch(e){

      try{
        address = await filenamespace.resolveByName(name);
      }catch(e){

        try{
          address = await connectState.provider.resolveName(name);
        }catch(e){
          address = null;
        }
      }
    }

    if(address === undefined || address === null || address === ''){
      element.elMessage('error', 'Invalid address input!');
      return;
    } else {
      address = address.trim().toLowerCase();
    }
    
    return sendNFT(nameInfo.name, name, address, nameInfo.nameId);

  });
}

//send a nft to a given address
const sendNFT = (nftName:string, name:string, address:string, tokenId:string) => {

  const opts = {
    message: '',
    confirmButtonText: 'Send',
    cancelButtonText: 'Cancel',
  };

  if(name === address){
    opts.message =  h('p', null, [
      h('p', null, `Are you sure to send the name NFT of ID ${tokenId} ?`),
      h('p', { style: 'color: teal' }, `name: ${nftName}`),
      h('p', { style: 'color: teal' }, 'send user: '),
      h('p', { style: 'color: teal' }, address),
    ]);
  }else{
    opts.message =  h('p', null, [
      h('p', null, `Are you sure to send the name NFT of ID ${tokenId} ?`),
      h('p', { style: 'color: teal' }, `name: ${nftName}`),    
      h('p', { style: 'color: teal' }, `send user: ${name}`),
      h('p', { style: 'color: teal' }, address),
    ]);
  }

  element.elMessageConfirm(`Are you sure to send the name NFT of ID ${tokenId} ?`, 'Send Name NFT', opts, async () => {
    try{
      await networkConnect();

      const tx = await filenamespace.transferFrom(connectState.userAddr.value, address, parseInt(tokenId));

      connectState.transactions.value.unshift(tx.hash);
      connectState.transactionCount.value++;

      const msg = `<div><span>Send success! Transaction: </span><a href="${transactionExplorerUrl(tx.hash)}" target="_blank">${tx.hash}</a></div>`

      element.elMessage('success', msg, true);    

      handleClick();      
    }catch(e){
      element.alertMessage(e);
    }
  });  
}

const getNameCount = async () => {
  const indexs = await filenamespace.getNameIndexsByPageCount(pageSize.value, pageCount.value, false);

  if(indexs.length < pageSize.value){
    hasMore.value = false;
  }else{
    hasMore.value = true;
  }

  const nameId = Number(tools.getUrlParamter('nameId'));

  const infoList = new Array();
  for(const i in indexs){
    const res = await filenamespace.getNameInfoById(indexs[i]);

    res.isOwner = res.owner.toLowerCase() === connectState.userAddr.value.toLowerCase();
    res.updated = res.owner === res.oldOwner;

    if(nameId > 0 && nameId != res.nameId){
      continue;
    }

    infoList.push(res);
  }

  nameLists.value = infoList;
}

//on click for prev page
const onHandlePrev = async () => {
  if(pageCount.value > 0){
    pageCount.value--;
  }
  handleClick();
}

//on click for next page
const onHandleNext = async () => {
  if(hasMore.value){
    pageCount.value++;
  }
  handleClick();
}

const handleClick = async () => {
  try{
    loadStatus.value = true;
    if (!(await connected())){
      nameLists.value = new Array();
      return;
    }

    if(pageCount.value < 0){
      pageCount.value = 0;
    }

    if(searchContent.value != ''){
      await onClickToSearch();
    }else{
      await getNameCount();
    }

  }catch(e){
    nameLists.value = new Array();
  }finally{
    loadStatus.value = false;
  }
}

//clean search content and bind search callback function
connectState.search = '';
connectState.searchCallback = handleClick;

//update page size
handleClick();
</script>>