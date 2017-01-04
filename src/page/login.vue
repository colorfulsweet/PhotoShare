<template>
  <div class="login">
    <form role="form" class="form-horizontal" name="RegisterForm">
      <ul class="formarea">
        <li>
          <label class="lit">账号：</label>
          <input type="text" placeholder="手机号码" class="textbox" required v-model="name"/>
        </li>
        <li>
          <label class="lit">密码：</label>
          <input type="password" placeholder="登陆密码" class="textbox" required v-model="pwd"/>
        </li>
        <li class="liLink lg_liLink">
          <span><label><input type="checkbox"/>记住密码</label></span>
          <span><a href="#/register">新用户注册</a></span>
          <span><a href="#/find_pwd">忘记密码?</a></span>
        </li>
        <li>
          <input type="button" @click="loginAction" value="立即登陆" class="button"/>
        </li>
      </ul>
    </form>
  </div>

</template>

<script>
  import router from '../router/router'

  export default{
    name : "login",
    data : function(){
      return {
        name : null,
        pwd : null
      }
    },
    created () {
      this.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        isShare: false,
        title: '登陆页面'
      })
    },
    methods: {
      loginAction: function () {
        let vm = this;
        let url = vm.$store.state.comm.apiUrl + 'user/login';
        let params = {
          username : this.name,
          password : this.pwd
        };
        this.$http.post(url,{params}).then(function(res){
          var resData = JSON.parse(res.bodyText);
          if(resData.status) {
            vm.$store.commit('isLogin', resData.data);
            alert('登陆成功！');
            //登陆可能是由不同的位置触发的, 所以登陆成功以后直接回退到之前所在页面
            router.go(-1);
          } else {
            alert('用户名/密码错误');
          }
        }).catch(function(err){
          console.error(err);
        });

      }
    }
  }
</script>

<style style="scss">
  @import "../../static/css/login.scss";
</style>
