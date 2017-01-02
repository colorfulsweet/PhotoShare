<template>
  <div>
    <com-list v-bind:list-data="resData"></com-list>
    <div class="tip" v-show="empty">暂无数据，{{tip}}～</div>
  </div>
</template>

<script>
  import list from '../components/list.vue'
  // import axios from 'axios'

  export default{
    name : "search",
    data : function () {
      return {
        resData: {},
        tip:null,
        empty: false,
        uri : null,
        query : {}
      }
    },
    created () {
      let type = this.$route.params.type;
      let title, search, back;
      switch(type) {
        case "sea" :
          title = "搜索结果";
          search = false;
          back = true;
          this.uri = "share/search";
          this.query.q = this.$route.query.q;//搜索内容
          break;
        case "own" :
          title = "我的圈子";
          search = false;
          back = true;
          this.tip = "赶紧去发布动态";
          this.uri = "share/viewOwnShared";
          break;
        case "star" :
          title = '我的收藏';
          search = false;
          back = true;
          this.tip = '赶紧去收藏';
          this.uri = "share/viewCollect"
          break;
        case "userStar" :
          title = '收藏用户';
          search = false;
          back = true;
          this.tip = '赶紧去收藏';
          this.uri = "share/viewUserCollect";
          break;
        case "msg" :
          title = '最新动态';
          search = false;
          back = true;
          this.uri = "share/listOneMinuteShared";
          break;
        case "user" :
          title = '动态';
          search = false;
          back = true;
          break;
        default :
          search = true
          back = false
      }

      this.$store.commit('isLoading', true);
      this.fetchData(type)
      this.$store.commit('changeIndexConf', {
        isFooter: true,
        isSearch: search,
        isBack: back,
        title: title
      })
    },
    watch: {
      '$route' (to, from) {
        this.fetchData(this.$route.params.types)
      }
    },
    components: {
      comList: list
    },
    computed: {
      loading: function () {
        return this.$store.state.comm.loading
      }
    },
    methods: {
      fetchData: function (type) {
        var vm = this
        let url = this.$store.state.comm.apiUrl + this.uri;
        let params = {
          memberId : localStorage.getItem('memberId'),
        };
        for(let name in this.query) {
          params[name] = this.query[name];
        }
        this.$http.get(url, {params}).then(function(res){
          var resData = JSON.parse(res.bodyText);
          vm.$store.commit('isLoading', false);
          vm.empty = !resData.data.length;
          vm.resData = resData.data;
        }).catch(function(err){
          console.error(err);
        });
      }
    }
  }
</script>
<style lang="scss" scope>
  .tip{
    position: fixed;
    top: 180px;
    left: 50%;
    z-index: 99;
    margin-left: -3.8em;
    width: 7.6em;
    min-height: 4.6em;
    border-radius: 5px;
    background: rgba(40, 40, 40, 0.75);
    color: #fff;
    text-align: center;
    padding-top: 2rem;
  }
</style>
