<template>
  <div class="search">
    <input class="box" v-model="searchText" placeholder="搜索" type="text"/>
    <span class="icon iconfont icon-sousuo submit" @click="submit"></span>
  </div>
</template>

<script>
  import router from '../router/router'

  export default{
    data: function () {
      return {
        searchText: null
      }
    },
    methods:{
      submit:function () {
        if(!this.searchText) {
          alert("请输入搜索内容!");
          return false;
        }
        router.push('/search/sea?q='+this.searchText);
      }
    }
  }
</script>
<style lang="scss">
  @import "../../static/css/search.scss";
</style>
