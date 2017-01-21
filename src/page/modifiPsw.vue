<!-- 修改密码页面 -->
<template>
  <div class="login">
    <form role="form" class="form-horizontal" name="RegisterForm">
      <ul class="formarea">
        <li>
          <label class="lit">旧密码：</label>
          <input type="password" placeholder="修改前密码" class="textbox" required v-model="pwd"/>
        </li>
        <li>
          <label class="lit">新密码：</label>
          <input type="password" placeholder="修改后密码" class="textbox" required v-model="newpwd"/>
        </li>
        <li>
          <input type="button" @click="submitUpdate" value="确认修改" class="button"/>
        </li>
      </ul>
    </form>
  </div>

</template>

<script>
  import router from '../router/router'

  export default{
    data : function(){
      return{
        pwd : null,
        newpwd : null
      };
    },
    created () {
      this.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        isShare: false,
        title: '修改密码'
      })
    },
    methods: {
      submitUpdate: function () {
        let url = this.$store.state.comm.apiUrl + 'user/updatePassword'
        let params = {
          memberId : localStorage.getItem('memberId'),
          pwd : this.pwd,//旧密码
          newpwd : this.newpwd//新密码
        }
        this.$http.post(url,params).then(function(res){
          var resData = JSON.parse(res.bodyText);
          if(resData.status) {
            alert("修改成功");
            router.push("/home");
          }
        }).catch(function(err){
          console.error(err);
        })
      }
    }
  }
</script>

<style style="scss">
  @import "../../static/css/login.scss";
</style>
