<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <p class="setting-title">基本信息</p>
        <el-form ref="form" :model="form" label-width="159px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickname" />
          </el-form-item>
          <el-form-item label="角色">
            <el-input disabled v-model="form.roles" />
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="form.id" />
          </el-form-item>
          <el-form-item label="所在院校">
            <el-select v-model="schoolValue" placeholder="请选择">
              <el-option
                v-for="item in schoolOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="facultyValue" placeholder="请选择">
              <el-option
                v-for="item in facultyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="所在班级">-->
            <!--<el-input v-model="form.class" />-->
          <!--</el-form-item>-->
          <el-form-item label="个人介绍">
            <el-input v-model="form.introduction" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">更新信息</el-button>
            <el-button @click="getUser">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <p class="setting-title">头像</p>
        <div class="setting-icon">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// import { addDepartment } from '@/api/class'
// import { addSchool } from '@/api/class'
import { getInfo } from '@/api/user'
export default {
  data() {
    return {
      form: {
        name: '',
        nickname: '',
        id: '',
        introduction: '',
        schoolValue: '',
        facultyValue: ''
      },
      schoolOptions: [{
        value: '福州大学',
        label: '福州大学'
      }, {
        value: '厦门大学',
        label: '厦门大学'
      }, {
        value: '厦门理工学院',
        label: '厦门理工学院'
      }, {
        value: '华侨大学',
        label: '华侨大学'
      }, {
        value: '福建师范大学',
        label: '福建师范大学'
      }, {
        value: '福建农林大学',
        label: '福建农林大学'
      }],
      schoolValue: '',
      facultyValue: '',
      imageUrl: '',
      facultyOptions: [{
        value: '选项1',
        label: '数学与计算机工程学院'
      }, {
        value: '选项2',
        label: '外国语学院'
      }, {
        value: '选项3',
        label: '经济与管理学院'
      }]
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    getUser() {
      getInfo().then(response => {
        const userData = response.data
        this.form = {
          name: userData.username,
          nickname: '',
          roles: userData.roleList[0].role_description,
          id: '',
          introduction: '',
          schoolValue: userData.userschool,
          facultyValue: userData.userDepartment
        }
      })
    },
    onSubmit() {
      this.$message({
        message: '更新成功!',
        type: 'success'
      })
      // this.$router.push('/class')
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    .setting-title{
      font-weight:bold;
      padding-left: 80px;
      font-size:18px;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .setting-icon{
      padding-left: 80px;
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }

  }
</style>
