<template>
  <div id="loginForm" style="width:240px;">
      <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      code:"",
      form:{
        userName:"",
        password:""
      },
      loginResult:{

      },
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    onSuccess(data){
        if(data&&data.code==0){
            this.code = data.data.code;
        }else{
            //TODO 上传失败的情况
        }
    },
    onSubmit(){
      var that = this;
          axios({
                    method:'get',
                    url:'/REST/login',
                    params: {
                        userName: this.form.userName,
                        password: this.form.password,
                    },
                    // data: {
                    //         code: 'jZIvKY'
                    //     }
                }).then((response) =>{          //这里使用了ES6的语法
                   //请求成功返回的数据
                   //TODO 登录成功的处理
                   if(response&&response.data){
                      console.log(response.data); 
                      that.loginResult = response.data;
                      this.sendMsgToParent();

                   }
                   
                }).catch(error => console.log(error));
    },
    sendMsgToParent(){
      this.$emit("listenToChildEvent",this.loginResult);
    },
  },
};

</script>
