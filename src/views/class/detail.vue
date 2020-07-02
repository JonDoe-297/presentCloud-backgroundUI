<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-col :span="6" :xs="24">
        <class-card :class-num="classNum" />
      </el-col>

      <el-col :span="18" :xs="24">
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="学生列表" name="student" />
          <el-tab-pane label="签到列表" name="checkin" />
          <!--<el-tab-pane label="Account" name="account">-->
          <!--<account :user="user" />-->
          <!--</el-tab-pane>-->
          <!--<el-card>-->
          <el-row style="margin-bottom: 15px;float: right">
            <el-col :span="24">
              <el-button v-if="activeTab === 'student'" type="primary" round disabled>添加学生</el-button>
              <el-button v-else-if="activeTab === 'checkin'" type="primary" round @click="dialogVisible = true">创建签到</el-button>
              <router-link to="/class/index">
                <el-button type="success" round>返回班课列表</el-button>
              </router-link>
            </el-col>
          </el-row>
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="学生学号">
              <template slot-scope="scope">
                {{ scope.row.usersno }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="学生姓名">
              <template slot-scope="scope">
                {{ scope.row.username }}
              </template>
            </el-table-column>
            <el-table-column label="所属院系" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userDepartment }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="handleDelete(true, scope.row)"
                >
                  <el-button
                    slot="reference"
                    size="mini"
                    type="danger"
                  >删除</el-button>
                </el-popconfirm>
                <!--<el-button-->
                <!--size="mini"-->
                <!--type="danger"-->
                <!--@click="handleDelete(false, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        <!--</el-card>-->
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog
      title="选择签到时间范围"
      :visible.sync="dialogVisible"
      width="390px"
      :before-close="handleClose"
    >
      <el-time-picker
        v-model="timeValue"
        is-range
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCheckin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getClassByClassnum, removeStudent } from '@/api/class'
import { getCheckinInfoList, addCheckinInfo } from '@/api/checkin'
import ClassCard from './components/ClassCard'
export default {
  name: 'Detail',
  components: { ClassCard },
  data() {
    return {
      list: null,
      listLoading: true,
      searchInput: '',
      classNum: 0,
      activeTab: 'student',
      timeValue: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      dialogVisible: false
    }
  },
  computed: {
    // 默认时间
    timeDefault() {
      const date = new Date()
      // 通过时间戳计算
      let defalutStartTime = date.getTime() - 7 * 24 * 3600 * 1000 // 转化为时间戳
      let defalutEndTime = date.getTime()
      const startDateNs = new Date(defalutStartTime)
      // 月，日 不够10补0
      defalutStartTime = startDateNs.getFullYear() + '-' + ((startDateNs.getMonth() + 1) >= 10 ? (startDateNs.getMonth() + 1) : '0' + (startDateNs.getMonth() + 1)) +
        '-' + (startDateNs.getDate() >= 10 ? startDateNs.getDate() : '0' + startDateNs.getDate()) + ' ' + ((startDateNs.getHours()) >= 10 ? (startDateNs.getHours()) : '0' + (startDateNs.getHours())) +
        ':' + (startDateNs.getMinutes() >= 10 ? startDateNs.getMinutes() : '0' + startDateNs.getMinutes()) + ':' + (startDateNs.getSeconds() >= 10 ? startDateNs.getSeconds() : '0' + startDateNs.getSeconds())
      defalutEndTime = defalutStartTime
      console.log([defalutStartTime, defalutEndTime])
      return [defalutStartTime, defalutEndTime]
    }
  },
  watch: {
    activeTab(val, oldVal) {
      if (val === 'student') {
        this.fetchStudentData(this.classNum)
      } else {
        this.fetchCheckinData(this.classNum)
      }
    }
  },
  mounted() {
    // 时间默认值
    this.timeValue = this.timeDefault
  },
  created() {
    this.classNum = this.$route.query.classNum
    this.fetchStudentData(this.classNum)
    this.fetchCurrentTime()
  },
  methods: {
    fetchStudentData(num) {
      this.listLoading = true
      const data = {
        classNum: num
      }
      getClassByClassnum(data).then(response => {
        this.list = response.data.studentList
        // const studentList = this.list.studentList
        this.listLoading = false
      })
    },
    fetchCheckinData(num) {
      this.listLoading = true
      const data = {
        classNum: num
      }
      getCheckinInfoList(data).then(response => {
        this.list = []
        // this.list = response.data.studentList
        console.log(response)
        // const studentList = this.list.studentList
        this.listLoading = false
      })
    },
    fetchCurrentTime() {
      console.log(1)
      // this.timeValue =
    },
    handleDelete(bol, row) {
      if (bol) {
        const data = {
          classNum: this.classNum,
          stuId: row.userid
        }
        removeStudent(data).then(response => {
          console.log(response)
          if (response.code === '200') {
            this.fetchStudentData(this.classNum)
          }
          // const studentList = this.list.studentList
        })
      }
    },
    handleCheckin() {
      const time = {
        classNum: this.classNum,
        startTime: this.formatDate(this.timeValue[0]),
        endTime: this.formatDate(this.timeValue[1]),
        code: ''
      }
      addCheckinInfo(time).then(response => {
        console.log(response)
        // const studentList = this.list.studentList
        this.dialogVisible = false
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    formatDate(date) {
      console.log(date)
      const y = date.getFullYear()
      const m = date.getMonth() + 1
      // m = m < 10 ? '0' + m : m
      const d = date.getDate()
      // d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let minu = date.getMinutes()
      minu = minu < 10 ? '0' + minu : minu
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return y + '/' + m + '/' + d + ' ' + h + ':' + minu + ':' + s
    }
  }
}
</script>

<style scoped>

</style>
