<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="name"
        label="菜单名称">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="icon">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" disabled @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <!--<side-list></side-list>-->
          <!--<el-button icon="el-icon-user" @click="handleRole(scope.$index, scope.row)" type="text" size="small">用户</el-button>-->
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="handleDelete(true)"
          >
            <el-button icon="el-icon-delete" slot="reference" style="margin-left: 10px" @click="handleDelete(false, scope.$index)" type="danger" size="small" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      tableData: [{
        id: 1,
        name: '首页',
        icon: 'dashboard',
        path: '/dashboard'
      }, {
        id: 2,
        name: '班课',
        icon: 'example',
        path: '/class',
        hasChildren: true
      }, {
        id: 3,
        name: '系统管理',
        icon: 'edit',
        path: '/systemManage',
        hasChildren: true
      }, {
        id: 4,
        name: '个人中心',
        icon: 'user',
        path: '/profile',
        hasChildren: true
      }],
      currentIndex: 0
    }
  },
  methods: {
    handleDelete(bol, index) {
      if (bol) {
        this.tableData.splice(this.currentIndex, 1)
      } else {
        this.currentIndex = index
      }
    },
    load(tree, treeNode, resolve) {
      let nodes = []
      if (tree.id === 2) {
        nodes = [
          {
            id: 20,
            name: '班课查询',
            icon: 'table',
            path: '/class/index'
          }, {
            id: 21,
            name: '创建班课',
            icon: 'tree',
            path: '/class/create'
          }
        ]
      } else if (tree.id === 3) {
        nodes = [
          {
            id: 31,
            name: '数据字典',
            icon: 'table',
            path: '/systemManage/dataDict'
          }, {
            id: 32,
            name: '参数管理',
            icon: 'table',
            path: '/systemManage/parameter'
          }, {
            id: 33,
            name: '用户管理',
            icon: 'user',
            path: '/systemManage/user'
          }, {
            id: 34,
            name: '菜单管理',
            icon: 'list',
            path: '/systemManage/menuManage'
          }, {
            id: 35,
            name: '角色管理',
            icon: 'people',
            path: '/systemManage/roleUser'
          }
        ]
      } else if (tree.id === 4) {
        nodes = [
          {
            id: 40,
            name: '资源',
            icon: 'search',
            path: '/profile/resource'
          }, {
            id: 41,
            name: '用户信息',
            icon: 'skill',
            path: '/profile/info'
          }, {
            id: 42,
            name: '设置',
            icon: 'edit',
            path: '/profile/setting'
          }
        ]
      }
      setTimeout(() => {
        resolve(nodes)
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>
