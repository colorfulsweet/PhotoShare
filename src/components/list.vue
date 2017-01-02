<template>
  <div class="com-list">
    <ul>
      <li class="list-li" v-for="value in doList">
        <div class="user">
          <a :href="route + value.user.id">
          <img :src="imageUrl + value.user.memberIcon" alt=""/>
          </a>
          <div class="name">
            <p>{{value.user.memberNickname}}</p>
            <p class="createtime"  v-if="value.sharedCreatetime">{{value.sharedCreatetime}}</p>
          </div>
          <router-link :to="{  name: 'article', params: { id: value.id }}" class="btn-d btn-s"  v-if="value.photos">详情</router-link>
        </div>
        <div class="detail" v-if="value.photos">
          <p>{{value.sharedContent}}</p>
          <ul :class="['clearfix','img-box',{r3:value.photos.length>1?true:false}]">
            <li v-for="photoId in value.photos">
              <img :src="imageUrl + photoId">
            </li>
          </ul>
          <p class="action">
            <span class="zan" v-bind:class="{ hasZan : value.memberIsThumbs }" @click="zan(value)"><span class="icon iconfont icon-zans"></span><span>{{value.sumThumbs}}</span></span>
            <span class="kanguo"><span class="icon iconfont icon-kanguos"></span><span>{{value.sharedView}}</span></span>
            <span v-if="canDelet" @click="del(value.sharedId)"><span class="icon iconfont icon-lajixiang"></span></span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    name: "list",
    data: function () {
      return {
        doListData: {},
        imageUrl: this.$store.state.comm.fileUrl+"image/",
        baseUrl: this.$store.state.comm.apiUrl+"share/",
        memberId: localStorage.getItem('memberId'),
        route:'#/search/user?id=',
        user: ''
      }
    },
    props: ['listData'],
    computed: {
      doList: function () {
        if (this.listData.status) {
          this.doListData = this.listData.data
          return this.doListData
        }
      },
      canDelet:function () {
        if(this.$route.params.types === 'own'){
          return true
        }else{
          return false
        }
      }
    },
    methods: {
      //点赞
      zan:function (obj) {
        let url = this.baseUrl + 'thumbsUp/'+obj.id;
        let choice = obj.memberIsThumbs ? 1 : 0;
        var params = {
          memberId: this.memberId,
          //当前用户是否赞过
          choice: choice
        }
        this.$http.get(url,{params}).then(function(res){
          var resData = JSON.parse(res.bodyText);
          if(resData.status) {
            if(choice){
              //已赞过则是取消赞 数量-1
              obj.sumThumbs --;
            }else{
              obj.sumThumbs ++;
            }
            obj.memberIsThumbs = !obj.memberIsThumbs;
          } else {
            alert('请登陆后再操作！')
          }
        }).catch(function(err){
          console.error(err);
        });

      },
      //删除
      del:function (id) {
        //TODO 删除分享
      }
    }
  }
</script>

<style lang="scss">
  @import "../../static/css/list.scss";
</style>
