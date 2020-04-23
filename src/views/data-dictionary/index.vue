<template>
  <div class="app-container">
    <!--<el-select v-model="value" placeholder="请选择">-->
      <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
      <!--</el-option>-->
    <!--</el-select>-->
    <el-button style="float: right" type="primary" @click="dialogFormVisible = true">新增</el-button>
    <el-dialog title="数据字典" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="字典码" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用途描述" :label-width="formLabelWidth">
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
        label="字典码">
      </el-table-column>
      <el-table-column
        prop="name"
        label="字典名称">
      </el-table-column>
      <el-table-column
        prop="detail"
        label="用途描述">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <!--<side-list></side-list>-->
          <el-button icon="el-icon-setting" @click="handleSetting(scope.$index, scope.row)" type="text" size="small">字典配置</el-button>
          <el-popconfirm
            title="这是一段内容确定删除吗？"
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
import SideList from './component/SideList'

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
        code: 'edu_background',
        name: '教育背景',
        detail: '学位学历'
      }, {
        code: 'nation',
        name: '民族',
        detail: ''
      }, {
        code: 'msg_category',
        name: '通告类型',
        detail: '消息类型1:通知公告2:系统消息'
      }, {
        code: 'sex',
        name: '性别',
        detail: '性别 男 女'
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
    handleSetting(index, row) {
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
      this.isCrete = true
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
