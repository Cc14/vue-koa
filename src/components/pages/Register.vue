<template>
    <div>
        <van-nav-bar
            title="注册页面"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username=''"
                :error-message="usernameErroMsg"
            />
            <van-field
                v-model="password"
                type="password"
                label="用户密码"
                placeholder="请输入用户密码"
                required
                :error-message="passwordErroMsg"
            />
            <div class="register-button">
                <van-button type="primary" @click="registerAction" :loading="openLoading" size="large">用户注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPIconfig.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false,
      usernameErroMsg:'',
      passwordErroMsg:''
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerAction(){
        this.checkForm() && this.axiosRegister()
    },
    axiosRegister() {
      this.openLoading = true;
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.username,
          passWord: this.password
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            Toast.success(response.data.message);
            this.$router.push('/')
          } else {
            this.openLoading = false;
            Toast.fail("注册失败");
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("注册失败");
          this.openLoading = false;
        });
    },
    //表单验证
    checkForm(){
        let isOk = true
        if(this.username.length<5){
            this.usernameErroMsg='用户名不能小于五位'
            isOk=false
        }else{
            this.usernameErroMsg=''
        }
        if(this.password.length<6){
            this.passwordErroMsg='密码不能小于六位'
            isOk = false
        }else{
            this.passwordErroMsg=''
        }
        return isOk
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 80px;
}
.register-banner {
  padding-bottom: 10px;
}
</style>