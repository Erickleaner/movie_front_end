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
            <template v-if="role===''">
              <div class="info-area">
                <el-icon name="user-solid"></el-icon>
                <a @click.prevent="handleLogin">登录 / 注册</a>
              </div>
            </template>
            <template v-else>
              <el-popover
                placement="top"
                width="160"
                v-model="visible">
                <p style="text-align: center">是否退出登录?</p>
                <div style="text-align: center; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleLoginOut">确定</el-button>
                </div>
                <div class="info-area" slot="reference">
                  <el-icon name="user-solid"></el-icon>
                  <a @click.prevent="">{{ name }}</a>
                </div>
              </el-popover>
            </template>
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

import {mapActions, mapState} from "vuex";
import {Message} from "element-ui";
import {clearRouter} from "@/router";

export default {
  name: 'MovieHeader',
  components: { },
  data() {
    return {
      input: '',
      activeIndex: '1',
      activeIndex2: '1',
      visible:false
    }
  },
  computed:{
    ...mapState('user',{role:'role',name:'name'}),
  },
  methods:{
    ...mapActions('user',{resetToken:'resetToken'}),
    ...mapActions('permission',{clearRoutes:'clearRoutes'}),
    handleLogin(){
      this.$router.push({path:'/login'})
    },
    handleLoginOut(){
      let _this = this
      this.resetToken().then(()=>{
        _this.clearRoutes()
        clearRouter()
        Message.success('退出登录成功！')
        _this.visible = false
      })
    }
  }
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.title{
  padding: 5px;
  font-size: 36px;
}
.nav-bg{
  background-color: #545c64;
}
.info-area{
  display: flex;
  flex-direction: column;
  align-items: center;
  a{
    margin-top: 2px;
    font-size: 14px;
  }
  i{
    font-size: 24px;
  }
}


</style>
