<template>
  <div id="uie" v-if="isRouterAlive">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">操作</template>
        <el-menu-item index="2-1">上传文件</el-menu-item>
        <el-menu-item index="2-2">下载文件</el-menu-item>
        <!-- <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-menu-item index="3">上传历史记录</el-menu-item>
      <el-menu-item index="4"
        ><a href="javascript:;" target="_self">用户管理</a></el-menu-item
      >
       <el-menu-item index="5" v-if="!user.isLogin">登录</el-menu-item>
       <el-menu-item index="6" v-if="user.isLogin" style="float:right;" class="avatarPicItem" >
         <a href="javascript:;" target="_self">
           <img class="avatarPic" :src="user.profilePic" />
         </a>
       </el-menu-item>
    </el-menu>
    <div class="viewC">
      <div id="page1" v-bind:class="{'showc':showData.showc2_1}" >
        <fileu-com></fileu-com>
      </div>
      <div id="page2" v-bind:class="{'showc':showData.showc2_2}"> 
         <filed-com></filed-com>
      </div>
       <div id="page3" v-bind:class="{'showc':showData.showc5}" v-if="!user.isLogin"> 
         <login v-on:listenToChildEvent="showMsgFromChild"></login>
      </div>
       <div id="page4" v-bind:class="{'showc':showData.showc3}" > 
         <file-list></file-list>
      </div>
      <div id="page5" v-bind:class="{'showc':showData.showc4}" > 
         <user-list></user-list>
      </div>
    </div>
    <input type="hidden" id="sessionId" />
  </div>
</template>

<script>
import FileuCom from '../../components/FileuCom.vue'
import FiledCom from '../../components/FiledCom.vue'
import Login from '../../components/Login.vue'
import fileList from '../fileTransfer/fileList.vue'
import UserList from '../../components/UserList.vue'

import axios from 'axios'

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      showData:{
        showc2_1: true,
        showc2_2: true,
        showc5: true,
        showc3: true,
        showc4: true,
      },
      user:{
        profilePic:"http://blog.yaocoder.cn:8088/images/logo.svg",
        isLogin:false
      },
      isRouterAlive:true,
    };
  },
  components: {
    FileuCom,FiledCom,Login,fileList,UserList
  },
  created(){
    //TODO 判断是否登录 获取登录信息
           axios({
                    method:'get',
                    url:'/REST/getUser1',
                    params: {
                    },
                }).then((response) =>{          //这里使用了ES6的语法
                   //请求成功返回的数据
                   //TODO 登录成功的处理
                   if(response&&response.data&&response.data.data){
                       this.user = response.data.data;
                       this.user.isLogin = true;
                   }
                   
                }).catch(error => console.log(error));
  },
  methods: {
    handleSelect(key, keyPath) {
       console.log(key,keyPath);
       var _showData = this.showData;

       Object.getOwnPropertyNames(this.showData).forEach(function(key){
          _showData[key] = true;
       });

       var claVal = "showc"+key.replace("-","_");
       eval(" this.showData."+claVal+"=false ");
    },
    showMsgFromChild(data){
      if(data&&data.code==0){
        this.user = data.data;
        this.user.isLogin = true;
        // this.isRouterAlive = false;
        // this.$nextTick(function () {
        //             this.isRouterAlive = true;         //再打开
        //         });
        location.reload();
      }else{
          this.user.isLogin = false;
      }
    },
  },
  
};

</script>

<style scoped>
.showc{
  display: none;
}
.viewC{
  margin:40px;
}
.avatarPic{
  width:48px;
  height:48px;
}
</style>