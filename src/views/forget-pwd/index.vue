<template>
  <div class="forget-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">忘记密码</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:20px;" @click.native.prevent="handleSend">发送</el-button>
      <el-button :loading="loading" type="text" style="width:100%;margin-bottom:5px;margin-left: 0px" @click.native.prevent="handleCancel">取消</el-button>
      <el-button :loading="loading" type="text" style="float:right;font-weight:bold;" @click.native.prevent="handlelogin">返回登录</el-button>

    </el-form>
  </div>
</template>
<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Index',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }]
      },
      active: 0,
      loading: false
    }
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    },
    handleSend() {
      console.log('hhh')
    },
    handleCancel() {
      this.loginForm.username = ''
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
    .forget-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .forget-container {
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

  .forget-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
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
