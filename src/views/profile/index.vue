<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="我加入的" name="join">
                <join />
              </el-tab-pane>
              <el-tab-pane label="我创建的" name="create">
                <create />
              </el-tab-pane>
              <!--<el-tab-pane label="Account" name="account">-->
                <!--<account :user="user" />-->
              <!--</el-tab-pane>-->
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
// import Activity from './components/Activity'
import Create from './components/Create'
import Join from './components/Join'
// import Timeline from './components/Timeline'
// import Account from './components/Account'
import { getInfo } from '@/api/user'

export default {
  name: 'Profile',
  components: { UserCard, Create, Join },
  data() {
    return {
      user: {},
      activeTab: 'join',
      flag: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      getInfo().then(response => {
        const userData = response.data
        this.user = {
          name: userData.username,
          school: userData.userschool,
          department: userData.userDepartment,
          // role: this.roles.join(' | '),
          role: userData.roleList[0].role_description,
          email: 'admin@test.com',
          avatar: this.avatar
        }
        // this.flag = true
      })
    }
  }
}
</script>
