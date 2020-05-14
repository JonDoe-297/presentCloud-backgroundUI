<template>
  <div>
    <!--<el-button icon="el-icon-setting" @click="handleSetting(diaplay)" type="text" size="small">字典配置</el-button>-->
    <el-card class="box-card" v-if="sideDiaplay">
      <div slot="header" class="clearfix">
        <span>角色管理</span>
        <el-button icon="el-icon-close" @click="handleClose()" style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <!--TODO-->
      <el-button style="float: right" type="primary" @click="dialogFormVisible = true">新增用户</el-button>
      <!--<el-button style="float: right;margin-right: 5px" type="primary" @click="dialogFormVisible = true">已有用户</el-button>-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="account"
          label="用户账号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名称">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" disabled type="text" size="small">编辑</el-button>
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
    <el-dialog title="添加已有账号" :visible.sync="dialogFormVisible">
      <el-table
        :data="existRoleData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="account"
          label="用户账号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名称">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleSideList',
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
      formLabelWidth: '120px',
      dialogFormVisible: false,
      currentIndex: 0,
      sideDiaplay: false,
      existRoleData: [{
        account: 'test',
        name: 'test'
      }, {
        account: 'admin',
        name: '管理员'
      }],
      selecData: [],
      tableData: [{
        account: 'test',
        name: 'test'
      }, {
        account: 'admin',
        name: '管理员'
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
      if (val === 'admin') {
        this.tableData = [{
          account: 'admin',
          name: '管理员'
        }]
        // this.tableData = []
      } else {
        this.tableData = []
      }
    }
  },
  created() {
    // console.log(this.display)
  },
  methods: {
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
    handleSelectionChange(selection) {
      this.selecData = selection
    },
    handleAddRole() {
      for (let i = 0; i < this.selecData.length; i++) {
        if (this.tableData.indexOf(this.selecData[i])) {
          this.tableData.push(this.selecData[i])
        }
      }
      this.dialogFormVisible = false
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
