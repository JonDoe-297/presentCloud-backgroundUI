<template>
  <el-row>
    <el-col :span="6" v-for="(o, index) in fileNum" :key="o" :offset="index % 3 != 0 ? 2 : 0" style="padding-bottom: 25px">
      <el-card :body-style="{ padding: '0px' }">
        <!--<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
        <el-row>
          <el-col :span="6"><i class="el-icon-files" style="font-size: 30px;padding: 20px;color:blue;"></i></el-col>
          <el-col :span="18">
            <div class="card-title">VUE</div>
            <div style="padding: 10px 5px 10px 0">文件简介文件简介文件简介文件简介文件简介</div>
          </el-col>
        </el-row>
        <el-row>
          <div style="padding: 5px 45px 14px 45px;background-color: #F2F6FC">
            <div class="bottom clearfix">
              <el-button type="text" class="button-left" @click="handleDelete(index)">删除</el-button>
              <el-button type="text" class="button-right" @click="handleDownload(index)">下载</el-button>
            </div>
          </div>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { getFilesByUserId, downloadByFilepathId, deleteFileByFilepathId } from '@/api/resource'
export default {
  name: 'ResourceCard',
  props: {
    fileNum: {
      default: 6,
      type: Number,
      deep: true
    },
    file: {
      type: Array,
      deep: true
    }
  },
  data() {
    return {
      currentDate: new Date()
    }
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
    handleDownload(index) {
      const data = {
        FilepathId: this.file[index].filepathid
      }
      downloadByFilepathId(data).then(response => {
        console.log(response)
      })
    },
    handleDelete(index) {
      const data = {
        filePathId: this.file[index].filepathid
      }
      deleteFileByFilepathId(data).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.handleGetResource
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  .card-title {
    font-weight:bold;
    padding-top: 20px;
    font-size:16px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button-left{
    padding: 0;
    float: left;
  }
  .button-right {
    padding: 0;
    float: right;
  }

  .image {
    width: 20%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
