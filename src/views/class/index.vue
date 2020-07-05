<template>
  <div class="app-container">
    <el-row style="margin-bottom: 15px;float: right">
      <el-col :span="24">
        <!--<el-input style="width: 200px" v-model="searchInput" placeholder="请输入班课编码查询"></el-input>-->
        <!--<el-button type="success" round icon="el-icon-search" @click="handleSearch">搜索</el-button>-->
        <router-link to='/class/create'>
          <el-button type="primary" round>创建班课</el-button>
        </router-link>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!--<el-table-column align="center" prop="created_at" label="班课编码" width="200">-->
        <!--<template slot-scope="scope">-->
          <!--&lt;!&ndash;<i class="el-icon-time" />&ndash;&gt;-->
          <!--<span>{{ scope.row.classnum}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="课程">
        <template slot-scope="scope">
          {{ scope.row.classname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="课程号">
        <template slot-scope="scope">
          {{ scope.row.classnum }}
        </template>
      </el-table-column>
      <el-table-column label="学生人数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.studentList.length }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" width="350" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleClass(scope.$index, scope.row)">进入班课</el-button>
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="success"-->
            <!--@click="handleEdit(scope.$index, scope.row)">班课资源</el-button>-->
          <el-button
            size="mini"
            type="warning"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            disabled
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getClassList } from '@/api/class'
import { mapGetters } from 'vuex'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      searchInput: ''
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const data = {
        userId: this.userId
      }
      getClassList(data).then(response => {
        this.list = response.data
        // const studentList = this.list.studentList
        this.listLoading = false
      })
      // this.listLoading = false
    },
    handleClass(index, row) {
      // console.log(row.classnum)
      this.$router.push({
        name: 'Detail',
        path: '/class/detail',
        query: { classNum: row.classnum } // 参数传值
      })
    },
    handleEdit(index, row) {
      this.$router.push({
        name: 'Create',
        path: '/class/create',
        query: { detail: JSON.stringify(row) } // 参数传值
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
    // handleSearch() {
    //   console.log(this.searchInput)
    // }
  }
}
</script>
