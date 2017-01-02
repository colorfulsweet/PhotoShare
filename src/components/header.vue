<template>
  <div class="header">
    <div v-show="isShowSearch">
      <com-search></com-search>
      <a class="add-msg" @click="add">+</a>
    </div>
    <div class="title" v-show="!isShowSearch">
      <a v-show="isBack" class="back t-icon" @click="goBack"><span
        class="iconfont icon icon-xiangzuojiantou"></span></a>
      <p>{{title}}</p>
    </div>
  </div>
</template>

<script>
  import Search from './search.vue'
  import router from '../router/router'

  export default{
    data: function () {
      return {}
    },
    computed: {
      isShowSearch: function () {
        return this.$store.state.comm.indexConf.isSearch
      },
      title: function () {
        return this.$store.state.comm.indexConf.title
      },
      isBack: function () {
        return this.$store.state.comm.indexConf.isBack
      }
    },
    methods: {
      goBack: function () {
        history.go(-1);
      },
      add: function () {
        //发布分享必须要先登陆
        if(!localStorage.getItem("memberId")) {
          router.push('/login');
        } else {
          router.push('/addMsg');
        }
      }
    },
    components: {
      comSearch: Search
    }
  }
</script>
<style lang="scss">
  @import "../../static/css/header.scss";
</style>
