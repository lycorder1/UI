<template>
  <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>好友</template>
        <el-menu-item-group>
          <el-submenu index="1-1">
            <template slot="title">在线好友</template>
             <el-menu-item v-for="(item,i) in onLineUserListData" v-bind:key="i" v-bind:index="1-1-i">
              <div style="width: 100%;overflow: hidden;" @click="getDetailMsg($event,item.userFriend.oId)">
                <img v-bind:src="item.userFriend.profilePic" style="width:24px;height:24px;border-radius: 100%;" >
                <span style="margin-left: 10px;">{{ item.userFriend.name }}</span>
                <span style="font-size: 12px;color: gray;margin-left: 10px;">{{ item.userFriend.des }}</span>
             </div>
           </el-menu-item>
          </el-submenu>
        </el-menu-item-group>
        <el-menu-item-group>
           <el-submenu index="1-2">
            <template slot="title">离线好友</template>
             <el-menu-item v-for="(item,i) in offLineUserListData" v-bind:key="i" v-bind:index="1-2-i">
              <div style="width: 100%;overflow: hidden;" @click="getDetailMsg($event,item.userFriend.oId)" >
                <img v-bind:src="item.userFriend.profilePic" style="width:24px;height:24px;border-radius: 100%;" >
                <span style="margin-left: 10px;">{{ item.userFriend.name }}</span>
                <span style="font-size: 12px;color: gray;margin-left: 10px;">{{ item.userFriend.des }}</span>
             </div>
           </el-menu-item>
          </el-submenu>
          
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>群组</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{friendName}}</span>
    </el-header>
    
    <el-main>
      <el-table :data="tableData"  :border=false :show-header=false :row-style=returnStyle >
        <el-table-column label="" width="96"  class-name="el-table-column-1" style="border-bottom: 0px;">
           <template slot-scope="scope">
              <p v-show="scope.row.oId==myUserid">{{ friendMsgNames[scope.row.userId] }}</p>
              <!-- <el-popover trigger="hover" placement="top">
                <p v-show="scope.row.oId==myUserid">{{ friendMsgNames[scope.row.userId] }}</p>
              </el-popover> -->
           </template>
        </el-table-column>
        <el-table-column prop="msg" label="" show-overflow-tooltip class-name="el-table-column-1" style="border-bottom: 0px;">
          <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.msg }}</p>
                <div v-if="scope.row.userId==myUserid" style="text-align:right;" slot="reference" class="name-wrapper">
                  <el-tag size="medium" >{{ scope.row.msg }}</el-tag>
                </div>
                 <div v-else slot="reference" class="name-wrapper">
                  <el-tag size="medium" >{{ scope.row.msg }}</el-tag>
                </div>
                
              </el-popover>
           </template>
        </el-table-column>
        <el-table-column label="" width="96"  class-name="el-table-column-1" style="border-bottom: 0px;">
           <template slot-scope="scope">
              <p style="text-align:right;" v-show="scope.row.userId==myUserid">{{ myName }}</p>
              <el-popover trigger="hover" placement="top">
                <p style="text-align:right;" v-show="scope.row.userId==myUserid">{{ myName }}</p>
              </el-popover>
           </template>
        </el-table-column>
      </el-table>
    </el-main>

     <textarea v-model="mytext" name="" id="sendText" cols="30" rows="6" style="border: 0px;resize: none;min-height:80px;"></textarea>
       <el-button type="primary" @click="sendMsg(mytext)">发送</el-button>
  </el-container>
</el-container>
</template>

<script>
import axios from 'axios'
import globalOptions from '../commonJS/ComJS'


export default {
  data() {
    return {
      fileList: [
      ],
      item:{
        date: '',
        name: '',
        address: ''
      },
      tableData:[],
      onLineUserListData:[],
      offLineUserListData:[],
      webSocket:null,
      friendName: '',
      myName:"test",
      myUserid:0,
      friendMsgDatas:{},
      friendMsgNames:{},
      currUid:0,
      mytext: "",
    };
  },
  methods: {
   allcopy:function(e){
       console.log(e);
   },
   returnStyle:function(e){
       let styleRes = {
	     }
       return styleRes;
   },
   getDetailMsg:function(e,uid){
      if(this.friendMsgDatas[uid]){
        this.tableData = this.friendMsgDatas[uid];
      }else{
         postWebSocket("chat/getFriendMsg",getParamByWebSocket(uid),this.webSocket);
      }
      this.currUid = uid;
      this.mytext = "";
   },
   sendMsg:function(msg){
      var paramObj = {
                       msg:msg,
                       type:0,
                       oId:this.currUid,
                       userId:this.myUserid
                    };
      postWebSocket("chat/sendMsgUser",getParamByWebSocket(this.currUid,paramObj),this.webSocket);
      this.mytext = "";
      // if(this.friendMsgDatas[this.currUid]){
      //         this.friendMsgDatas[this.currUid].push(paramObj);
      // }
   },
  },
  mounted (){
       
  },
  created(){
//TODO 判断是否登录 获取登录信息
        var that = this;
        var CHAT = {socket:null};
        if (window.WebSocket){
						CHAT.socket = new WebSocket("ws://yaocoder.cn:8999/ws");
            	// CHAT.socket = new WebSocket("ws://127.0.0.1:8998/ws");
              that.webSocket = CHAT.socket;
						CHAT.socket.onopen = function(){
							console.log("客户端与服务端建立连接成功");
						},
						CHAT.socket.onmessage = function(e){
              var res = JSON.parse(e.data);
              //TODO 返回信息接口处理 对应不同接口使用不同处理方式
              switch(res.handleName){
                case "chat/Login":
                  //登录成功 设置聊天用户信息
                  var _user = JSON.parse(res.data)
                  that.myName = _user.name;
                  that.myUserid =  _user.id;
                  break;
                case "chat/sendMsgUser":
                  var data= res.data;
                  if(that.friendMsgDatas[res.uId]){
                    that.friendMsgDatas[res.uId].push(data);
                  }
                  //TODO新消息提示
                  
                  break;
                case "chat/getFriendMsg":
                  var data= res.data;
                  that.tableData = data;
                  that.friendMsgDatas[res.uId] = data;
                  //登录成功 设置聊天用户信息
                  break;
                case "chat/getOnlineOrUnlineUser":
                  var data= res.res;
                  that.onLineUserListData = data.online;
                  that.offLineUserListData = data.offline;
                   if(that.onLineUserListData){
                      for(var i=0;i<that.onLineUserListData.length;i++){
                           that.friendMsgNames[that.onLineUserListData[i].userFriend.oId] = that.onLineUserListData[i].userFriend.name;
                      }
                   }
                    if(that.offLineUserListData){
                      for(var i=0;i<that.offLineUserListData.length;i++){
                           that.friendMsgNames[that.offLineUserListData[i].userFriend.oId] = that.offLineUserListData[i].userFriend.name;
                      }
                   }
                  //登录成功 设置聊天用户信息
                  //TODO获取用户列表（在线和离线用户列表）
                  break;
                case "chat/LoginNotice":
                  for(var i=0;i<that.offLineUserListData.length;i++){
                    if(that.offLineUserListData[i].userFriend.oId==res.uId){
                        that.onLineUserListData.push(that.offLineUserListData[i]);
                        that.offLineUserListData.splice(i,1);
                    }
                  }
                  break;
              }
							
						},
						CHAT.socket.onerror = function(){
							console.log("发生错误");
						},
						CHAT.socket.onclose = function(){
							console.log("客户端与服务端关闭连接成功");
						}						
					}else{
						alert("2020年都过了，升级下浏览器吧");
					}

        setTimeout(()=>{
          // var request3 = {
          //   requestType:"json",
          //   method:"get",
          //   url:"chat/sendMsg",
          //   content:{
          //     msg:"i like you",
          //     type:0,
          //     oId:2
          //   }
          // };
          postWebSocket("chat/Login",getParamByWebSocket(""),CHAT.socket);

          postWebSocket("chat/getOnlineOrUnlineUser",getParamByWebSocket(""),CHAT.socket);
        },1000)
          
  },
};

function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
  return unescape(arr[2]);
  else
  return null;
}

function getParamByWebSocket(uid,data){
  var obj = {
        userId:uid,
        // sId:getCookie("sessionId"),
        sId:globalOptions.getCookie("sessionId"),
        data:data
  }
  return obj;
}

function postWebSocket(url,param,socket){
   var request1 = {
            requestType:"json",
            method:"get",
            url:url,
            content:param
          };

    socket.send(JSON.stringify(request1));
}

</script>

<style>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

.el-table-column-1{
    border-bottom: 0px!important;
  }


.el-table td, .el-table th.is-leaf{
  border-bottom: 0px;
}  

.el-table::before{
  width: 0;
  height:0;
}
</style>