<template>
  <div class="app-container">
    <el-button style="float: right" type="primary" @click="dialogFormVisible = true; isCrete = true">新增角色</el-button>
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色编码" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off" v-bind:disabled="!isCrete"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.detail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;form = {}">取 消</el-button>
        <el-button v-if="isCrete" type="primary" @click="handleCreate(form)">确 定</el-button>
        <el-button v-else type="primary" @click="handleUpdate(form)">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="code"
        label="角色码">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <!--<side-list></side-list>-->
          <el-button icon="el-icon-user" @click="handleRole(scope.$index, scope.row)" type="text" size="small">用户</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="handleDelete(true)"
          >
            <el-button icon="el-icon-delete" slot="reference" style="margin-left: 10px" @click="handleDelete(false, scope.$index)" type="danger" size="small" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <side-list :display="sideListDisplay" :code="codeDictionary" @sideListDisplay="handleSideList($event)"></side-list>
  </div>
</template>

<script>
import SideList from './component/roleSideList'

export default {
  name: 'Index',
  components: {
    SideList
  },
  data() {
    return {
      options: [{
        value: 0,
        label: '学历'
      }, {
        value: 1,
        label: '菜单'
      }, {
        value: 2,
        label: '民族'
      }],
      value: 0,
      form: {
        code: '',
        name: '',
        detail: ''
      },
      tableData: [{
        code: 'test',
        name: '临时角色',
        detail: '临时账号'
      }, {
        code: 'admin',
        name: '管理员',
        detail: '管理员'
      }, {
        code: 'teacher',
        name: '教师',
        detail: ''
      }],
      // defaultValue: '1',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      currentIndex: 0,
      isCrete: true,
      sideListDisplay: false,
      codeDictionary: ''
    }
  },
  methods: {
    handleRole(index, row) {
      this.codeDictionary = row.code
      this.sideListDisplay = true
      // console.log(this.sideListDisplay)
    },
    handleSideList(bol) {
      this.sideListDisplay = bol
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
      // this.isCrete = true
      this.form = {}
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.currentIndex = index
      this.form = row
      this.isCrete = false
    },
    handleUpdate(form) {
      this.tableData[this.currentIndex] = form
      this.dialogFormVisible = false
      this.form = {}
    }
  }
}
</script>

<style scoped>

</style>
