<template>
  <div class="app-container">
    <div class="param-create">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="每次签到经验值">
          <el-input v-model="form.value" />
        </el-form-item>
        <el-form-item label="签到范围">
          <el-input v-model="form.distance" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        value: 2,
        distance: 50
      }
    }
  },
  methods: {
    handleSave() {
      this.$message({
        message: 'success！',
        type: 'success'
      })
    },
    handleReset() {
      this.form = {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .param-create {
      width: 50%;
    }
  }
</style>

