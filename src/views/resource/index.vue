<template>
  <div class="app-container">
    <el-card style="margin:30px" shadow="always">
      <div class="resource-head">
        <el-col :span="12">
          <p class="resource-title">文件资源</p>
          <p class="resource-course">课程：工程实践</p>
          <i class="el-icon-s-promotion" style="font-size: 15px;padding: 15px 0 0 30px;margin-right:10px;color:blue;"> 资源管理</i>
          <i class="el-icon-warning-outline" style="font-size: 15px;padding: 15px 0 0 30px;margin-right:10px;color:blue;"> 权限管理</i>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-col>
      </div>
    </el-card>
    <el-card style="margin:30px" shadow="always">
      <div class="resource-body">
        <resource-card :fileNum="fileNum" :file="file"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import ResourceCard from './component/ResourceCard'
import { getFilesByUserId, upload } from '@/api/resource'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    ResourceCard
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      fileNum: 0,
      file: []
    }
  },
  created() {
    this.handleGetResource()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    handleGetResource() {
      const data = {
        userId: this.userId
      }
      getFilesByUserId(data).then(response => {
        const fileData = response.data
        this.file = fileData
        this.fileNum = fileData.length
      })
    },
    handleChange(file, fileList) {
      // console.log(file)
      var fileData = new FormData()
      fileData.append('file', file)
      fileData.append('userId', this.userId)
      upload(fileData).then(response => {
        console.log(response)
      })
      this.fileList = fileList.slice(-3)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    padding: 0px;
    .resource-head{
      .resource-title{
        font-weight:bold;
        padding-left: 30px;
        padding-top: 20px;
        font-size:18px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      }
      .resource-course{
        font-weight:normal;
        padding-left: 30px;
        padding-top: 5px;
        font-size:15px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      }
      width: 100%;
      height: 140px;
      background-color: white;
    }
    .resource-body{
      width: 100%;
      /*height: 465px;*/
      height: 100%;
      /*background-color: #d9d9d9;*/
    }
    .upload-demo{
      float: right;
      position: absolute;
      top: 120px;
      right: 100px;
    }
  }
</style>
