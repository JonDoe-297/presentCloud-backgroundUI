<template>
  <el-row>
    <el-col :span="6" v-for="(o, index) in 6" :key="o" :offset="index % 3 != 0 ? 2 : 0" style="padding-bottom: 25px">
      <el-card :body-style="{ padding: '0px' }">
        <!--<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
        <el-row>
          <el-col :span="6"><i class="el-icon-files" style="font-size: 30px;padding: 20px"></i></el-col>
          <el-col :span="18">
            <div class="card-title">VUE</div>
            <div style="padding: 10px 5px 10px 0">文件简介文件简介文件简介文件简介文件简介</div>
          </el-col>
        </el-row>
        <el-row>
          <div style="padding: 5px 45px 14px 45px;background-color: #F2F6FC">
            <div class="bottom clearfix">
              <el-button type="text" class="button-left">删除</el-button>
              <el-button type="text" class="button-right">下载</el-button>
            </div>
          </div>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ProfileCard',
  data() {
    return {
      currentDate: new Date()
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
