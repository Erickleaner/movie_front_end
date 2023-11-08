<template>
  <div>
    <el-row type="flex" justify="center" align="middle" class="top-margin">
      <el-col :span="18">
        <el-row type="flex" align="middle">
          <el-col :span="8">
            <h2 class="title">电影推荐网</h2>
          </el-col>
          <el-col :span="16">
            <div>
              <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div @click="loginOrRegister" class="login-register">
              <el-icon name="user-solid"></el-icon>
              <a @click.prevent="">登录 / 注册</a>
            </div>
          </el-col>

        </el-row>

      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle" class="nav-bg">
      <el-col :span="18">

        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select=""
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">港片</el-menu-item>
          <el-menu-item index="3">欧美</el-menu-item>
          <el-menu-item index="4">内地</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'MovieHeader',
  components: { },
  data() {
    return {
      input: '',
      activeIndex: '1',
      activeIndex2: '1',
    }
  },
  methods:{
    loginOrRegister(){
      this.$router.push({path:'/login'})
    }
  }
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
@import '@/assets/global/style.scss';
.title{
  padding: 5px;
  font-size: $title-size;
}
//nav set background-color
.nav-bg{
  background-color: #545c64;
}
.login-register{
  display: flex;
  flex-direction: column;
  align-items: center;
  a{
    font-size: 14px;
  }
  i{
    font-size: 24px;
  }
}
//此处的size不符合一般size


</style>
