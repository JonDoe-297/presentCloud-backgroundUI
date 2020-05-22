<template>
  <div class="app-container">
    <el-row :gutter="30">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!--<el-button style="float: right; padding: 3px 0" type="text">新增院系</el-button>-->
            <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible = true">新增节点</el-button>
          </div>
          <el-tree node-key="id" default-expand-all :data="data" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false">
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="学校/院系名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="所属学校">
              <el-input :disabled="isDisableType" v-model="form.schoolName"></el-input>
            </el-form-item>
            <el-form-item label="机构类型">
              <el-radio v-model="form.type" label="1">学校</el-radio>
              <el-radio v-model="form.type" label="2">院系</el-radio>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="45%"
      :before-close="handleClose">
      <el-form ref="form" :model="newform" label-width="100px">
        <el-form-item label="学校/院系名称">
          <el-input v-model="newform.name"></el-input>
        </el-form-item>
        <el-form-item label="所属学校">
          <el-input :disabled="newisDisableType" v-model="newform.schoolName"></el-input>
        </el-form-item>
        <el-form-item label="机构类型">
          <el-radio v-model="newform.type" label="1">学校</el-radio>
          <el-radio v-model="newform.type" label="2">院系</el-radio>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="newform.phone"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="newform.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      data: [{
        id: 1,
        label: '福州大学',
        data: {
          name: '福州大学',
          schoolName: '',
          type: '1',
          phone: '',
          desc: ''
        },
        children: [{
          label: '数学与计算机科学学院',
          data: {
            name: '数学与计算机科学学院',
            schoolName: '福州大学',
            type: '2',
            phone: '',
            desc: ''
          }
        }, {
          label: '机械工程及自动化学院',
          data: {
            name: '机械工程及自动化学院',
            schoolName: '福州大学',
            type: '2',
            phone: '',
            desc: ''
          }
        }, {
          label: '电气工程与自动化学院',
          data: {
            name: '电气工程与自动化学院',
            schoolName: '福州大学',
            type: '2',
            phone: '',
            desc: ''
          }
        }, {
          label: '经济与管理学院',
          data: {
            name: '经济与管理学院',
            schoolName: '福州大学',
            type: '2',
            phone: '',
            desc: ''
          }
        }, {
          label: '人文社会科学学院',
          data: {
            name: '人文社会科学学院',
            schoolName: '福州大学',
            type: '2',
            phone: '',
            desc: ''
          }
        }]
      }],
      form: {
        name: '',
        schoolName: '',
        type: '1',
        phone: '',
        desc: ''
      },
      newform: {
        name: '',
        schoolName: '',
        type: '1',
        phone: '',
        desc: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isDisableType: true,
      newisDisableType: true,
      dialogVisible: false
    }
  },
  watch: {
    'form.type'(newValue, oldValue) {
      if (newValue === '2') {
        this.isDisableType = false
      } else {
        this.isDisableType = true
      }
    },
    'newform.type'(newValue, oldValue) {
      if (newValue === '2') {
        this.newisDisableType = false
      } else {
        this.newisDisableType = true
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      this.form = data.data
      console.log(data)
    },
    handleCreate() {
      if (this.newform.type === '2') { // 院系
        this.data.forEach((item, index) => {
          const nodeData = {
            label: this.newform.name,
            data: this.newform
          }
          if (item.label === this.newform.schoolName) {
            this.data[index].children.push(nodeData)
          }
        })
      } else { // 学校
        const nodeData = {
          id: 2,
          label: this.newform.name,
          data: this.newform
        }
        this.data.push(nodeData)
      }
      this.dialogVisible = false
    },
    handleSave() {
      console.log('submit!')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleReset() {
      this.form = {
        name: '',
        schoolName: '',
        type: '1',
        phone: '',
        desc: ''
      }
    }
  }
}
</script>

<style lang="scss">
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
