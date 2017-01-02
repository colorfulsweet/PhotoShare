<!-- 当前登录用户的个人信息展示页面 -->
<template>
  <div class="com-homeuserinfo">
    <ul class="user-link">
      <li class="user-icon">
        <router-link to="#" class="link-box ">
          <span class="txt">头像</span>
          <img :src="baseUrl + memberIcon">
          <span class="iconfont icon-xiangyoujiantou icon-right"></span>
        </router-link>
      </li>
      <li>
        <router-link to="#" class="link-box">
          <span class="txt">昵称</span>
          <p>{{memberNickname}}</p>
          <span class="iconfont icon-xiangyoujiantou icon-right"></span>
        </router-link>
      </li>
      <li>
        <router-link to="#" class="link-box">
          <span class="txt">性别</span>
          <p>{{gender}}</p>
          <span class="iconfont icon-xiangyoujiantou icon-right"></span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    name: "userInfo",
    data: function () {
      return {
        memberIcon : '',
        memberNickname : '',
        baseUrl : this.$store.state.comm.fileUrl+"image/",
        gender : ''
      }
    },
    created: function () {
      this.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        isShare: false,
        title: '个人信息'
      })

      let userMsg = JSON.parse(localStorage.getItem('userMsg'));

      this.memberIcon = userMsg.memberIcon;//头像ID
      this.gender = userMsg.gender ? '男' : '女';//性别
      this.memberNickname = userMsg.memberNickname;//昵称
    }
  }
</script>
<style lang="scss">
  @import "../../static/css/homeuserinfo.scss";
</style>
