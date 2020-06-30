<template>
  <div>
    <!--<el-button icon="el-icon-setting" @click="handleSetting(diaplay)" type="text" size="small">字典配置</el-button>-->
    <div class="mask" v-if="sideDiaplay" @click="handleClose()"></div>
    <el-card class="box-card" v-if="sideDiaplay">
      <div slot="header" class="clearfix">
        <span>字典列表</span>
        <el-button icon="el-icon-close" @click="handleClose()" style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <el-button style="float: right" type="primary" @click="dialogFormVisible = true">新增</el-button>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="value"
          label="数据值">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @onConfirm="handleDelete(true)"
            >
              <el-button slot="reference" style="margin-left: 10px" @click="handleDelete(false, scope.$index)" type="danger" size="small" >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据值" :label-width="formLabelWidth">
          <el-input v-model="form.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用途描述" :label-width="formLabelWidth">
          <el-input v-model="form.detail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch
            v-model="form.enable"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;form = {}">取 消</el-button>
        <el-button v-if="isCrete" type="primary" @click="handleCreate(form)">确 定</el-button>
        <el-button v-else type="primary" @click="handleUpdate(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SideList',
  props: {
    display: {
      default: false,
      type: Boolean,
      deep: true
    },
    code: {
      type: String,
      deep: true
    }
  },
  data() {
    return {
      isCrete: true,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      currentIndex: 0,
      sideDiaplay: false,
      form: {
        value: '',
        name: '',
        detail: '',
        enable: true
      },
      tableData: [{
        value: '1',
        name: '研究生',
        detail: '有效',
        enable: true
      }, {
        value: '2',
        name: '本科生',
        detail: '有效',
        enable: true
      }, {
        value: '3',
        name: '高中生',
        detail: '有效',
        enable: true
      }]
    }
  },
  // computed: {
  //   switchStatus: function() {
  //     return this.display // 直接监听props里的status状态
  //   }
  // },
  watch: {
    display(val, oldVal) {
      this.sideDiaplay = val
    },
    code(val, oldVal) {
      if (val === 'edu_background') {
        this.tableData = [{
          value: '1',
          name: '研究生',
          detail: '有效',
          enable: true
        }, {
          value: '2',
          name: '本科生',
          detail: '有效',
          enable: true
        }, {
          value: '3',
          name: '高中生',
          detail: '有效',
          enable: true
        }]
        // this.tableData = []
      } else if (val === 'nation') {
        this.tableData = [{
          value: '1',
          name: '汉族',
          detail: '有效',
          enable: true
        }, {
          value: '2',
          name: '回族',
          detail: '有效',
          enable: true
        }]
      } else if (val === 'msg_category') {
        this.tableData = [{
          value: '1',
          name: '通知公告',
          detail: '有效',
          enable: true
        }, {
          value: '2',
          name: '系统消息',
          detail: '有效',
          enable: true
        }]
      } else if (val === 'sex') {
        this.tableData = [{
          value: '1',
          name: '男',
          detail: '有效',
          enable: true
        }, {
          value: '2',
          name: '女',
          detail: '有效',
          enable: true
        }]
      }
    }
  },
  created() {
    console.log(this.display)
  },
  methods: {
    // handleSetting(show) {
    //   this.diaplay = !show
    // },
    handleClose() {
      this.sideDiaplay = false
      this.$emit('sideListDisplay', false)
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.currentIndex = index
      this.form = row
      this.isCrete = false
    },
    handleDelete(bol, index) {
      if (bol) {
        this.tableData.splice(this.currentIndex, 1)
      } else {
        this.currentIndex = index
      }
    },
    handleCreate(form) {
      this.tableData.push(form)
      console.log(this.tableData)
      this.dialogFormVisible = false
      this.isCrete = true
      this.form = {}
    },
    handleUpdate(form) {
      this.tableData[this.currentIndex] = form
      this.dialogFormVisible = false
      this.form = {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    opacity: 0.5;
    background-color: black;
    z-index: 1001;
  }
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
    z-index: 1002;
    right: 10px;
    width: 600px;
    height: 98%;
    animation: show .5s
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
