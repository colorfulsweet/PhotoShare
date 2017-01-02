<template>
  <div class="index">
    <img src="static/images/03.jpg" alt="">
    <div class="center">
      <router-link to="/index/fresh" class="list" ><p>最新动态</p></router-link>
      <router-link to="/index/hot" class="list" ><p>热门话题</p></router-link>
    </div>
    <div v-show="$route.params.type==='hot'">
      <select @change="change" >
        <option value="1">全部</option>
        <option value="2">最近一周</option>
        <option value="3">今天</option>
      </select>
      <span class="arrow"></span>
    </div>
    <com-list v-bind:list-data="resData"></com-list>
  </div>
</template>

<script>
  import list from '../components/list'
  import router from "../router/router"
  export default{
    name : "index",
    data : function () {
      return {
        resData: {},
        baseUrl : this.$store.state.comm.apiUrl
      }
    },
    created : function() {
      let type = this.$route.params.type || "fresh";
      this.$store.commit('isLoading', true);

      let url = this.baseUrl;
      let params = {
        memberId : localStorage.getItem('memberId'),
      }
      switch(type) {
        case "hot" : //热门话题
          url += 'share/listHot';
          break;
        case "fresh" : //最新动态
          url += 'share/listFresh';
          break;
      }
      let vm = this;
      /*获取最新列表信息*/
      this.$http.get(url,{params}).then(function(res){
        vm.resData = JSON.parse(res.bodyText);
        vm.$store.commit('isLoading', false);//隐藏"加载中"的提示
      }).catch(function(err){
        console.error(err);
      });
      // head的修改
      this.$store.commit('changeIndexConf', {
        isFooter: true,
        isSearch: true,
        isBack: false,
        title: ''
      })
    },
    components: {
      comList: list//分享信息列表
    },
    methods: {
      change:function () {
        let value = event.target.value
        location.hash = 'index/hot#'+ value
      }
    }
  }

</script>
<style lang="scss">
  @import "../../static/css/index.scss";
</style>
