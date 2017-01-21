<template>
  <div class="com-home">
    <div class="user-info clearfix">
      <router-link :to="{name:'homeUserInfo'}" class="link-box clearfix">
        <img :src="baseUrl + memberIcon">
        <p>{{username}}</p>
        <span class="iconfont icon-xiangyoujiantou icon-right"></span>
      </router-link>
    </div>
    <div class="user-link">
      <ul>
        <li v-if="isAdmin">
          <router-link to="/admin" class="link-box">
            <span class="icon iconfont icon-shezhi"></span>
            <span class="txt">管理页面</span>
            <span class="iconfont icon-xiangyoujiantou icon-right "></span>
          </router-link>
        </li>
        <li>
          <router-link to="/search/own" class="link-box">
            <span class="iconfont Hui-iconfont-feedback1 icon-detail"></span>
            <span class="txt">我的圈子</span>
            <span class="iconfont icon-xiangyoujiantou icon-right"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/search/star" class="link-box">
            <span class="iconfont Hui-iconfont-star icon-shoucang"></span>
            <span class="txt">我的收藏</span>
            <span class="iconfont icon-xiangyoujiantou icon-right"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/search/userStar" class="link-box">
            <span class="iconfont Hui-iconfont-star icon-shoucang"></span>
            <span class="txt">用户收藏</span>
            <span class="iconfont icon-xiangyoujiantou icon-right"></span>
          </router-link>
        </li>
        <li>
          <router-link to="/modif" class="link-box">
            <span class="icon iconfont icon-yijianfankui"></span>
            <span class="txt">修改密码</span>
            <span class="iconfont icon-xiangyoujiantou icon-right "></span>
          </router-link>
        </li>
      </ul>
    </div>
    <button class="logout" @click="logout">退出登陆</button>
  </div>
</template>
<script>
  import router from '../router/router'

  export default{
    data: function () {
      return {
        memberIcon:null,
        username:null,
        role: null,
        baseUrl: this.$store.state.comm.fileUrl+"image/",
        isAdmin: false
      }
    },
    created: function () {
      let userMsg = JSON.parse(localStorage.getItem('userMsg'));
      this.role = userMsg.memberRole;
      this.memberIcon = userMsg.memberIcon;
      this.username = userMsg.username;
      if(this.role === 3){
        this.isAdmin = true
      }
      this.$store.commit('changeIndexConf', {
        isFooter: true,
        isSearch: false,
        isBack: false,
        title: '个人首页'
      })
    },
    methods: {
      logout:function () {
        let vm = this;
        let url = vm.$store.state.comm.apiUrl + 'user/logout';
        this.$http.get(url).then(function(res){
          // var resData = JSON.parse(res.bodyText);
          var resData = res.data;
          if(resData.status){
            vm.$store.commit('logout')
            router.push('index/hot')
          }
        }).catch(function(err){
          console.error(err);
        });
      }
    },
    computed:{}
  }
</script>
<style lang="scss">
  @import "../../static/css/home.scss";
</style>
