<template>
    <div>
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <div class="login-panel">
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
            <div class="login-button">
                <van-button type="primary" @click="loginAction" :loading="openLoading" size="large">登录</van-button>
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
      usernameErroMsg: "",
      passwordErroMsg: ""
    };
  },
  created() {
    console.log(localStorage.userInfo);
    if (localStorage.userInfo) {
      Toast.success("您已经登录过了");
      this.$router.push("/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      this.checkForm() && this.axiosLoginUser();
    },
    axiosLoginUser() {
      this.openLoading = true;
      axios({
        url: url.loginUser,
        method: "post",
        data: {
          userName: this.username,
          passWord: this.password
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.userName };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch(err => {
                Toast.fail("登录信息保存失败");
                this.openLoading = false;
              });
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch(err => {
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
    //表单验证
    checkForm() {
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErroMsg = "用户名不能小于五位";
        isOk = false;
      } else {
        this.usernameErroMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErroMsg = "密码不能小于六位";
        isOk = false;
      } else {
        this.passwordErroMsg = "";
      }
      return isOk;
    }
  }
};
</script>

<style scoped>
.login-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 80px;
}
.login-banner {
  padding-bottom: 10px;
}
</style>