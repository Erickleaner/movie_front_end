<template>
  <div class="container">
    <h3 class="title">Register Form</h3>
    <el-form ref="registerForm" :model="formData" :rules="formRule" class="form-container" label-position="left" label-width="80px">
      <el-form-item prop="username" label-width="100px">
        <span class="label-item" slot="label">用户名</span>
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label-width="100px">
        <span class="label-item" slot="label">密码</span>
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item ref="phoneItem" prop="phone" label-width="100px">
        <span class="label-item" slot="label">手机号码</span>
        <div class="verify-area">
          <el-input class="verify-input" v-model="formData.phone"/>
          <el-button @click="sendVerifyCode" class="verify-btn" type="primary">{{ verifyBtnText }}</el-button>
        </div>
      </el-form-item>
      <el-form-item prop="verifyCode" label-width="100px">
        <span class="label-item" slot="label">验证码</span>
        <el-input v-model="formData.verifyCode"></el-input>
      </el-form-item>
      <div class="btn-between">
        <el-button @click="handleRegister" class="btn" type="primary">确定</el-button>
        <el-button class="btn">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {checkUsername, register, verifyAsk} from "@/api/user";
import {Message} from "element-ui";

export default {
  name: "Register",
  data(){
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('user name can not be empty'))
        return;
      }
      if (value.length < 4) {
        callback(new Error('The password can not be less than 4 char'))
      }
      checkUsername({username:value}).then(res=>{
        const {data} =res
        if (!data){
          callback(new Error('user name exists'))
        }else callback()
      })
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    const validatePhone = (rule, value, callback) => {
      if (value.length !== 11) {
        callback(new Error('The Phone len only can be 11'))
      } else {
        callback()
      }
    }

    const validateVerify = (rule, value, callback) => {
      if (value.length !== 4) {
        callback(new Error('The verify len only can be 4'))
      } else {
        callback()
      }
    }

    return{
      timer: null,
      count: 0,
      verifyBtnText:'发送验证码',
      formData:{
        username:'',
        password:'',
        phone:'',
        verifyCode:'',
      },
      formRule:{
        username:{ require:true, trigger: 'blur', validator: validateUsername },
        password:{ require:true, trigger: 'blur', validator: validatePassword },
        phone:{ require:true, trigger: 'blur', validator: validatePhone },
        verifyCode:{require:true, trigger: 'blur', validator: validateVerify }
      }
    }
  },
  methods:{
    handleRegister(){
      const _this = this
      this.$refs.registerForm.validate(valid => {
        if (valid){
          register(_this.formData).then(res=>{
            const {data} = res
            if (data){
              Message.success('注册成功！')
            }
          })
        }
      })
    },
    sendVerifyCode(){
      let _this = this;
      if (this.formData.phone.length !== 11) {
        return;
      }
      verifyAsk({phone:this.formData.phone}).then(res=>{
        const {data} = res
        if (data){
          Message.success('发送验证码成功')
          const TIME_COUNT = 60;//设置60秒
          if (!_this.timer) {
            _this.count = TIME_COUNT;
            _this.timer = setInterval(() => {
              if (_this.count > 0 && _this.count <= TIME_COUNT) {
                _this.count--;
                _this.verifyBtnText = this.count.toString()
              } else {
                clearInterval(_this.timer);
                _this.timer = null;
                _this.count = 0;
                _this.verifyBtnText = '发送验证码'
              }
            }, 1000)
          }else {
            Message.warning('倒计时结束前不可重复发送')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
</style>
