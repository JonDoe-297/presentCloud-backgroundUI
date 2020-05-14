<template>
  <div class="app-container">
    <el-button style="float: right" type="primary" @click="handleCreate">添加用户</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="account"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="出生日期">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <!--<side-list></side-list>-->
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="handleDelete(true)"
          >
            <el-button icon="el-icon-delete" slot="reference" style="margin-left: 10px" @click="handleDelete(false, scope.$index)" type="danger" size="small" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <side-list :display="sideListDisplay" :data="userData" :isCreate="isCreate" @sideListDisplay="handleSideList($event)"></side-list>
  </div>
</template>

<script>
import SideList from './component/userSideList'

export default {
  name: 'Index',
  components: {
    SideList
  },
  data() {
    return {
      tableData: [{
        account: 'admin',
        name: '管理员',
        sex: '男',
        birthday: '',
        phone: '18911111111'
      }],
      // defaultValue: '1',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      currentIndex: 0,
      isCreate: true,
      sideListDisplay: false,
      userData: {}
    }
  },
  methods: {
    handleSideList(bol) {
      this.sideListDisplay = bol
    },
    handleCreate() {
      this.isCreate = true
      this.sideListDisplay = true
      this.userData = {}
    },
    handleEdit(index, row) {
      this.isCreate = false
      this.sideListDisplay = true
      this.userData = row
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

<style scoped>

</style>
