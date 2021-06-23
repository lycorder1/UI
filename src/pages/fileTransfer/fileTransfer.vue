<template>
  <div id="uie">
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
        ><a href="javascript:;" target="_blank">用户管理</a></el-menu-item
      >
    </el-menu>
    <div class="viewC">
      <div id="page1" v-bind:class="{'showc':showData.showc2_1}" >
        <fileu-com></fileu-com>
      </div>
      <div id="page2" v-bind:class="{'showc':showData.showc2_2}"> 
         <filed-com></filed-com>
      </div>
    </div>
    
  </div>
</template>

<script>
import FileuCom from '../../components/FileuCom.vue'
import FiledCom from '../../components/FiledCom.vue'

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      showData:{
        showc2_1: true,
        showc2_2: true,
      },
    };
  },
  components: {
    FileuCom,FiledCom
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
</style>