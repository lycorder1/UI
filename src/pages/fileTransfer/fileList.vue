<template>
  <div id="uie">
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="fileName"
      label="文件名称"
      width="180">
    </el-table-column>
    <!-- <el-table-column
      label="下载地址"
      width="180">
       <el-link type="success" :href="virtualAddress" >{{virtualAddress}}</el-link>
    </el-table-column> -->
     <el-table-column
      fixed="right"
      label="下载地址"
      width="180">
      <template slot-scope="scope">
        <el-link type="success" :href="'REST'+scope.row.virtualAddress" target="_blank" >下载</el-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="downCode"
      label="下载码">
    </el-table-column>
    <el-table-column
      prop="downCount"
      label="剩余下载数量">
    </el-table-column>
    <el-table-column
      prop="effectiveDate"
      label="过期时间">
    </el-table-column>
     <el-table-column
      prop="createDate"
      label="创建时间">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
     tableData: []
    };
  },
  created(){
    var that = this;
    //TODO 判断是否登录 获取登录信息
           axios({
                    method:'get',
                    url:'/REST/FileTransfer/getDownList',
                    params: {
                    },
                }).then((response) =>{          //这里使用了ES6的语法
                   //请求成功返回的数据
                   //TODO 登录成功的处理
                  var s = response.data;
                  console.log(s);
                  if(s&&s.code==0){
                    that.tableData = s.data;
                  }
                   
                }).catch(error => console.log(error));
  },
  methods: {
     handleClick(row) {
        console.log(row);
     }
  },
};
</script>

<style scoped>
.inputlog {
 margin:0 10px;
}

</style>