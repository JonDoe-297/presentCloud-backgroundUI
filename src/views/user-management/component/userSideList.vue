<template>
  <div>
    <!--<el-button icon="el-icon-setting" @click="handleSetting(diaplay)" type="text" size="small">字典配置</el-button>-->
    <el-card class="box-card" v-if="sideDiaplay">
      <div slot="header" class="clearfix">
        <span>新增</span>
        <el-button icon="el-icon-close" @click="handleClose()" style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <el-scrollbar style="height: 578px;">
        <el-form ref="form" :model="form" label-width="143px">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="form.account" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickname" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.sex" />
          </el-form-item>
          <el-form-item label="出生日期">
            <el-input v-model="form.birthday" />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone" />
          </el-form-item>
          <el-form-item label="学号">
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
          <el-form-item label="所在班级">
            <el-input v-model="form.class" />
          </el-form-item>
          <el-form-item label="个人介绍">
            <el-input v-model="form.introduction" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button v-if="isCreate" type="primary" @click="handleCreate()">创建</el-button>
            <el-button v-else type="success" @click="handleEdit()">保存</el-button>
            <el-button @click="handleClose()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserRoleSideList',
  props: {
    display: {
      default: false,
      type: Boolean,
      deep: true
    },
    code: {
      type: String,
      deep: true
    },
    data: {
      type: Object,
      deep: true
    },
    isCreate: {
      type: Boolean,
      deep: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      currentIndex: 0,
      sideDiaplay: false,
      form: {
        name: '',
        nickname: '',
        id: '',
        introduction: '',
        schoolValue: '',
        facultyValue: '',
        class: ''
      },
      schoolOptions: [{
        value: '选项1',
        label: '福州大学'
      }, {
        value: '选项2',
        label: '厦门大学'
      }, {
        value: '选项3',
        label: '厦门理工学院'
      }, {
        value: '选项4',
        label: '华侨大学'
      }, {
        value: '选项5',
        label: '福建师范大学'
      }, {
        value: '选项6',
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
  // computed: {
  //   switchStatus: function() {
  //     return this.display // 直接监听props里的status状态
  //   }
  // },
  watch: {
    load() {
      this.count += 2
    },
    display(val, oldVal) {
      this.sideDiaplay = val
    },
    data(val, oldVal) {
      this.form = val
    }
  },
  created() {
    // console.log(this.display)
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
    handleClose() {
      this.sideDiaplay = false
      this.$emit('sideListDisplay', false)
    },
    handleCreate() {
      this.$message({
        message: '创建成功',
        type: 'success'
      })
      this.sideDiaplay = false
      this.$emit('sideListDisplay', false)
      this.$emit('userData', this.form)
    },
    handleEdit(index, row) {
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    },
    handleDelete(bol, index) {
      if (bol) {
        this.tableData.splice(this.currentIndex, 1)
      } else {
        this.currentIndex = index
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    position: fixed;
    top: 5px;
    z-index: 999;
    right: 10px;
    width: 600px;
    height: 98%;
    animation: show .5s;
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
  @-webkit-keyframes show {
    0% {
      opacity: 0;
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(25px, 0, 0);
    }
    75% {
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      transform: translate3d(5px, 0, 0);
    }
    100% {
      transform: none;
    }
  }

</style>
