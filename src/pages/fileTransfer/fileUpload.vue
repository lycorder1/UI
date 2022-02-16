<template>
  <div id="uie">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="/REST/FileTransfer/file/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        文件上传大小不超过500M
      </div>
    </el-upload>
    <div style="display:flex;">
      <el-input v-model="input1" 
      type="text"
      maxlength=1
      minlength=1 
      class="inputlog"
      style="width:40px;"
      ></el-input>
      
      <el-input v-model="input2" 
      type="text"
      maxlength=1
      minlength=1 
      class="inputlog"
      style="width:40px;"></el-input>
            
      <el-input v-model="input3" 
      type="text"
      maxlength=1
      minlength=1 
      class="inputlog"
      style="width:40px;"></el-input>

       <el-input v-model="input4"  
      type="text"
      maxlength=1
      minlength=1 
      class="inputlog"
      style="width:40px;"></el-input>

       <el-input v-model="input5"  
      type="text"
      maxlength=1
      minlength=1 
      class="inputlog"
      style="width:40px;"></el-input>

       <el-input v-model="input6" 
      type="text"
      maxlength=1
      minlength=1 
      class="inputlog"
      style="width:40px;"></el-input>
      
      
      </div>
  </div>
</template>

<script>
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
  },
};
</script>

<style scoped>
.inputlog {
 margin:0 10px;
}

</style>