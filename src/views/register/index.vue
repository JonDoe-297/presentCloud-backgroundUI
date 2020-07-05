<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>
      <el-tabs stretch v-model="registerForm.role">
        <el-tab-pane label="教师账号" name="teacher"></el-tab-pane>
        <el-tab-pane label="管理员账号" name="admin"></el-tab-pane>
      </el-tabs>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="请输入手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          :type="passwordType"
          ref="password"
          v-model="registerForm.password"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="confPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          :type="passwordType"
          ref="password"
          v-model="registerForm.confPassword"
          placeholder="确认密码"
          name="password"
          tabindex="1"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="name">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.name"
          placeholder="请输入姓名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="sno">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.sno"
          placeholder="请输入工号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:20px;" @click.native.prevent="handleSend">确认</el-button>
      <el-button :loading="loading" type="text" style="width:100%;margin-bottom:5px;margin-left: 0px" @click.native.prevent="handleCancel">重置</el-button>
      <el-button :loading="loading" type="text" style="float:right;font-weight:bold;" @click.native.prevent="handlelogin">返回登录</el-button>

    </el-form>
  </div>
</template>
<script>
import { validUsername, validPassword, validSno } from '@/utils/validate'
export default {
  name: 'Index',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的手机号！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (validPassword(value)) {
        callback(new Error('密码不得少于6位!'))
      } else {
        callback()
      }
    }
    const validateConfPassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('输入密码不一致'))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入姓名！'))
      } else {
        callback()
      }
    }
    const validateSno = (rule, value, callback) => {
      if (!validSno(value)) {
        callback(new Error('请输入正确的9位工号！'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        role: 'teacher',
        username: '',
        name: '',
        sno: '',
        password: '',
        confPassword: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confPassword: [{ required: true, trigger: 'blur', validator: validateConfPassword }],
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        sno: [{ required: true, trigger: 'blur', validator: validateSno }]
      },
      active: 0,
      loading: false,
      passwordType: 'password'
    }
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleSend() {
      this.loading = true
      const registerData = JSON.parse(JSON.stringify(this.registerForm))
      delete registerData.confPassword
      this.$store.dispatch('user/register', registerData).then((data) => {
        if (data.msg === '注册成功') {
          this.$message({
            message: data.msg + '，请重新登入',
            type: 'success'
          })
          this.$router.push({ path: this.redirect || '/login' })
          this.loading = false
        } else {
          this.$message.error(data.msg + '，请更换手机号' || 'Has Error')
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleCancel() {
      this.registerForm.role = 'teacher'
      this.registerForm.username = ''
      this.registerForm.name = ''
      this.registerForm.sno = ''
      this.registerForm.password = ''
      this.registerForm.confPassword = ''
    },
    handlelogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .register-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .register-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#F2F6FC;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .register-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 100px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
    .auto-login{
      margin-bottom: 20px;
    }
    .forget-password{
      margin-top: -10px;
      float: right;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $dark_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
