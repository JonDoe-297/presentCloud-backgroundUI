<template>
  <div class="app-container">
    <el-card style="margin:30px" shadow="always">
      <div class="resource-head">
        <el-col :span="12">
          <p class="resource-title">文件资源</p>
          <p class="resource-course">课程：工程实践</p>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-col>
      </div>
    </el-card>
    <el-card style="margin:30px" shadow="always">
      <div class="resource-body">
        <profile-card></profile-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import ProfileCard from './component/ProfileCard'

export default {
  name: 'Index',
  components: {
    ProfileCard
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  methods: {
    handleChange(file, fileList) {
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
