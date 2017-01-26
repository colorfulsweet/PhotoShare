<template>
  <div class="register">
    <form role="form" class="form-horizontal">
      <ul class="formarea">
        <li>
          <label class="lit">账号：</label>
          <input type="tel" placeholder="手机号码" class="textbox" required v-model="phone"/>
        </li>
        <li>
          <label class="lit">密码：</label>
          <input type="password" placeholder="设置密码" class="textbox" required v-model="pwd"/>
        </li>
        <li>
          <label class="lit">确认密码：</label>
          <input type="password" placeholder="确认密码" class="textbox" required @keyup="pwdCheck" v-model="pwdAgain"/>
        </li>
        <li class="liLink">
          <span v-if="showTip" style="color:red;">两次输入的密码不一致</span>
          <router-link :to="{name: 'login'}" class="fr" >已有账号? 登陆</router-link>
        </li>
        <li>
          <input type="button" v-bind:disabled="!check" ref="isSubmit" @click="register" value="立即注册" class="button"/>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
  import router from '../router/router'

  export default{
    data: function () {
      return {
        phone : null,
        pwd : null,
        pwdAgain : null,
        check : false,
        showTip : false
      }
    },
    watch : {
      phone : function(newVal, oldVal){
        if(!/^[0-9]+$/.test(newVal) && newVal) {
          this.phone = oldVal;
        }
      },
      pwdAgain : function(newVal, oldVal) {
        if(newVal && newVal === this.pwd) {
          this.check = true;
        } else {
          this.check = false;
        }
      }
    },
    created () {
      this.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        title: '注册'
      })
    },
    methods: {
      register: function () {
        let url = this.$store.state.comm.apiUrl + 'user/register'
        let params = {
          tel : this.phone,
          password : this.pwd
        };
        this.$http.post(url,params,function (res) {
          var resData = res.data;
          if(resData.result){
            alert('注册成功，请登陆！');
            router.push('login');
          }else{
            alert('注册失败：用户名已存在');
          }
        })
      },
      pwdCheck : function () {
        if(this.pwd === this.pwdAgain) {
          this.showTip = false;
        } else {
          this.showTip = true;
        }
      }
    }
  }
</script>
<style >
  @import "../../static/css/login.scss";
</style>
