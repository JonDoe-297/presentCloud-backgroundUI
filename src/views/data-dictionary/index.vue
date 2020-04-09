<template>
  <div class="app-container">
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button style="float: right" type="primary" @click="dialogFormVisible = true">新增</el-button>
    <el-dialog title="数据字典" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="字典码" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用途描述" :label-width="formLabelWidth">
          <el-input v-model="form.detail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否为默认值" :label-width="formLabelWidth">
          <el-checkbox v-model="form.default"></el-checkbox>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.order" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
        prop="detail"
        label="用途描述">
      </el-table-column>
      <el-table-column
        prop="name"
        label="字典名称">
      </el-table-column>
      <el-table-column
        prop="defaultValue"
        label="默认值">
        <template scope="scope">
          <i v-if="scope.row.defaultValue == true" class="el-icon-check"></i>
          <!--<i v-else class="el-icon-close"></i>-->
          <!--<el-checkbox v-model="scope.row.defaultValue"></el-checkbox>-->
        </template>

        <!--<el-checkbox v-model="defaultValue"></el-checkbox>-->
        <!--<el-radio v-model="defaultValue" label="1"></el-radio>-->
      </el-table-column>
      <el-table-column
        prop="order"
        label="排序">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(false, scope.$index)" type="danger" size="small" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="deleteVisible"
      width="30%">
      <span>是否删除该字段？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleDelete(true)">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
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
        detail: '',
        default: false,
        order: 0
      },
      formLabelWidth: '120px',
      tableData: [{
        code: 'YanJiuSheng',
        name: '研究生',
        detail: '研究生学历',
        defaultValue: false,
        order: 0
      }, {
        code: 'DaXueSheng',
        name: '大学生',
        detail: '大学学历',
        defaultValue: true,
        order: 1
      }, {
        code: 'GaoZhongSheng',
        name: '高中生',
        detail: '高中学历',
        defaultValue: false,
        order: 2
      }, {
        code: 'ChuZhongSheng',
        name: '初中生',
        detail: '初中学历',
        defaultValue: false,
        order: 3
      }],
      // defaultValue: '1',
      dialogFormVisible: false,
      deleteVisible: false,
      currentIndex: 0,
      isCrete: true
    }
  },
  methods: {
    handleDelete(bol, index) {
      if (bol) {
        this.tableData.splice(this.currentIndex, 1)
        this.deleteVisible = false
      } else {
        this.currentIndex = index
        this.deleteVisible = true
      }
    },
    handleCreate(form) {
      this.tableData.push(form)
      this.dialogFormVisible = false
      this.isCrete = true
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.currentIndex = index
      this.form = row
      this.isCrete = false
      // console.log(row)
    },
    handleUpdate(form) {
      this.tableData[this.currentIndex] = form
      this.dialogFormVisible = false
      // console.log(row)
    }
  }
}
</script>

<style scoped>

</style>
