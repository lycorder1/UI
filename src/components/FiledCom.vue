<template>
  <div id="uie">
    <p>&nbsp;&nbsp;请输入下载码</p>
    <br>
    <div style="display:flex;">
      <el-input v-model="input1" 
      type="text"
      maxlength=1
      minlength=1 
      class="inputlog"
      ref="input1"
      id="filed_input1"
      @input="handleInput(1,input1)"
      @paste.native="dosth"
      ></el-input>
      
      <el-input v-model="input2" 
      type="text"
      maxlength=1
      minlength=1 
      ref="input2"
       id="filed_input2"
      @input="handleInput(2,input2)"
      class="inputlog"
      ></el-input>
            
      <el-input v-model="input3" 
      type="text"
      maxlength=1
      minlength=1 
      class="inputlog"
      ref="input3"
       id="filed_input3"
      @input="handleInput(3,input3)"
      ></el-input>

       <el-input v-model="input4"  
      type="text"
      maxlength=1
      minlength=1 
      class="inputlog"
      ref="input4"
      id="filed_input4"
      @input="handleInput(4,input4)"
      ></el-input>

       <el-input v-model="input5"  
      type="text"
      maxlength=1
      minlength=1 
      class="inputlog"
      ref="input5"
      id="filed_input5"
      @input="handleInput(5,input5)"
      ></el-input>

       <el-input v-model="input6" 
      type="text"
      maxlength=1
      minlength=1 
      class="inputlog"
      ref="input6"
      id="filed_input6"
      @input="handleInput(6,input6)"
      ></el-input>
      
      
      </div>

      <br>
      <el-progress type="circle" :percentage="pg" v-show="progStatus"></el-progress>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
        // {
        //   name: "food2.jpeg",
        //   url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
      ],
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      pg:0,
      progStatus:false,
    };
  },
  methods: {
   handleInput:function(index,value){
       var that = this;
       if(value){
           if(index<6)
            eval(" setTimeout(function(){ that.$refs.input"+(index+1)+".focus();that.$refs.input"+(index+1)+".select(); },50); ");
            else if(this.input1&&this.input2&&this.input3&&this.input4&&this.input5&&this.input6)
            {
               downFile(this.input1+this.input2+this.input3+this.input4+this.input5+this.input6,that)
            }
       }else{
            if(index>1)
            eval(" setTimeout(function(){ that.$refs.input"+(index-1)+".focus();that.$refs.input"+(index-1)+".select(); },50); ");
       }
   },
   allcopy:function(e){
       console.log(e);
   },
   dosth:function(e){
        var that = this;
        let pastedText ="";
        if (e.clipboardData && e.clipboardData.getData);
          pastedText = e.clipboardData.getData('Text');
			
        let textArr = pastedText.split("");
        textArr.splice(7);
        textArr.map((item,index)=>{
          eval(" that.input"+(index+1)+"=item ")
        });
        if(this.input1&&this.input2&&this.input3&&this.input4&&this.input5&&this.input6)
        {
            downFile(this.input1+this.input2+this.input3+this.input4+this.input5+this.input6,that)
        }
   }
  },
  mounted (){
       
  }
};

function downFile(code,data){
  var that = data;
  that.progStatus = true;         
          //调用下载接口
                axios({
                    method:'get',
                    url:'/REST/FileTransfer/file/down',
                     params: {
                        code: code
                    },
                    responseType: 'blob',
                    onDownloadProgress(progress){
                       that.pg = Math.round(progress.loaded/progress.total*100);
                    }
                    // data: {
                    //         code: 'jZIvKY'
                    //     }
                }).then((response) =>{          //这里使用了ES6的语法
                    // console.log(response);       //请求成功返回的数据
                    let fileName = response.headers["content-filename"];
                    let contentType = response.headers["content-type"];
                    const blob = new Blob([response.data],{type: contentType});
                    let url = window.URL.createObjectURL(blob);
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    // 指定文件名&文件类型(后缀名)
                    /**
                     * 添加属性,并赋指定的值 el.setAttribute('download','zzz')
                     * demo: <a href="abc.gif" download="zzz"> 
                     * download属性的值即使当前要导出的文件的文件名
                     * */
                    link.setAttribute('download', fileName);
                    link.click();
                    // 释放创建的对象(创建的新的URL必须通过该方法释放)
                    window.URL.revokeObjectURL(url);
                    that.pg = 100;
                }).catch(error => console.log(error));
}

</script>

<style scoped>
.inputlog {
 margin:0 10px;
 min-width: 50px;
 width:50px;
}

</style>