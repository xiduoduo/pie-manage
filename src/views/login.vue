<template>
  <div class="login-page">
    <div class="login-main">
      <div class="login-window">
        <div class="main-window">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
            <el-row class="tab" type="flex">
              <el-col :span="2">
                <img class="admin-logo" src="@/assets/images/admin.png" alt />
              </el-col>
              <el-col :span="22" class="input-content">
                <el-input
                  v-model="loginForm.username"
                  type="text"
                  placeholder="请输入用户名"
                  style="height:100%"
                  class="admin-input"
                ></el-input>
              </el-col>
            </el-row>
            <el-row class="tab" type="flex">
              <el-col :span="2">
                <img class="admin-logo" src="@/assets/images/password.png" alt />
              </el-col>
              <el-col :span="22" class="input-content">
                <el-input
                  v-model="loginForm.password"
                  show-password
                  placeholder="请输入密码"
                  class="admin-input"
                  @keyup.enter.native="handleLogin"
                ></el-input>
              </el-col>
            </el-row>
           

            <div class="checkbox">
              <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
            </div>
            <div class="loginBtn" @click.prevent="handleLogin" v-if="!loading">登 录</div>
            <div class="loginBtn" v-else>登录中. . .</div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <div class="login-bottom"></div> -->
  </div>
</template>
<script>
// import { getCodeImg } from '@/api/login'
// import Cookies from 'js-cookie'
// import { encrypt, decrypt } from '@/utils/jsencrypt'
// import Header from '@/components/headerPage'

export default {
  name: 'Login',
  components: {  },
  data() {
    return {
      input: '',
      checked: '',
      codeUrl: '',
      cookiePassword: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: '',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' },
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
        ],
        
      },
      loading: false,
      redirect: undefined,
    }
  },
  mounted() {},
  created() {
    
  },
  methods: {
    userLogin() {
      
    },
    handleLogin() {
      this.$router.push({ path: '/ocean' })
    },
  },
}
</script>
<style  lang="scss" scoped >
.tab {
  width: 556px;
  height: 64px !important;
}
.admin-logo {
  width: 24px;
  margin-left: 24px;
  margin-top: 20px;
}
.admin-input {
  height: 100%;
  font-size: 20px;
}

.login-page {
  height: 100%;
  width: 100%;
  background: url('~@/assets/images/bg.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  .login-header {
    height: 10%;
  }
  .login-main {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-window {
      width: 772px;
      height: 476px;

      background: url('~@/assets/images/bg2.png') no-repeat;
      background-size: 100%;
      .main-title {
        margin-top: 40px;
        text-align: center;
        font-size: 24px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #e6f7ff;
      }

      .main-window {
        width: 70%;
        margin: 0 auto;
        margin-top: 90px;
        .el-row {
          height: 40px;
          line-height: 40px;
          margin-top: 20px;
          img {
            vertical-align: middle;
          }
          .input-content {
            ::v-deep .el-input__inner {
              background-color: transparent;
              border: 0;
              color: #e6f7ff;
            }
          }
        }
        .login-code {
          height: 100%;
          img {
            height: 100%;
            width: 100%;
            cursor: pointer;
          }
        }
        .checkbox {
          margin: 20px 0px 20px 5px;
          ::v-deep .el-checkbox__label {
            color: #ffffff;
          }
        }
        .loginBtn {
          width: 556px;
          height: 64px;
          line-height: 64px;
          text-align: center;
          font-size: 24px;
          color: #ffffff;
          background: #0669D5;
          margin-top: 30px;
        }
      }
    }
  }
}
.tab {
  background: url('~@/assets/images/square.png') no-repeat;
  background-size: contain;
}

</style>