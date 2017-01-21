<template>
  <div>
    <div class="com-article">
      <div class="user">
        <img :src="iconUrl" alt=""/>
        <div class="name">
          <p>{{resData.memberNickname}}
            <span v-bind:class="{ hasZan : resData.hasStar }" class="Userstar" @click="star"><span class="icon iconfont icon-jushoucang"></span> <span> 收藏</span></span>
          </p>
          <time>{{formatDate(resData.sharedCreatetime)}}</time>
        </div>
      </div>
      <div class="imgbox">
        <ul>
          <li v-for="value in resData.photos" v-bind:class="{r3:resData.photos.length<=1?true:false}">
            <img :src="imageUrl + value">
          </li>
        </ul>
      </div>
      <div class="art-detail">
        <p> {{resData.sharedContent}}</p>
      </div>
      <p class="operate">
        <span class="zan" v-bind:class="{ hasZan : !(resData.memberIsThumbs-1) }" @click="zan"><span class="icon iconfont icon-zans"></span><span>{{resData.sumThumbs}}</span></span>
        <span class="kanguo"><span class="icon iconfont icon-kanguos"></span><span>{{resData.sharedView}}</span></span>
      </p>
      <p class="starList">
        <span v-for="value in resData.thumbUps"> {{ value.memberNickname }}, </span>
      </p>
      <com-comment></com-comment>
    </div>
    <com-reply v-on:submit="handleSubmit"></com-reply>
  </div>
</template>


<script>
  import Comment from '../components/comment.vue'
  import Reply from '../components/reply'
  import moment from "moment";

  export default {
    name: "article",
    data: function () {
      return {
        content: null,
        resData: {},
        iconUrl : "",
        baseUrl: this.$store.state.comm.apiUrl+"share/",
        imageUrl: this.$store.state.comm.fileUrl+"image/",
        memberId: localStorage.getItem('memberId')
      }
    },
    created: function () {
      let vm = this
      vm.$store.commit('isLoading', true)
      vm.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        isShare: true,
        title: '详情页'
      })
      let id = this.$route.params.id

      vm.$store.commit('isLoading', true)

      this.$store.state.reply.articleId = id

      let url = this.baseUrl + "get/"+id;
      let memberId = localStorage.getItem('memberId')
      let params = {
        "memberId" : memberId
      }
      this.$http.get(url,{params}).then(function(res){
        // var resData = JSON.parse(res.bodyText);
        var resData = res.data;
        if(resData.status) {
          vm.resData = resData.data;
          vm.iconUrl = vm.imageUrl + resData.data.user.memberIcon;
          vm.$store.state.reply.comment = vm.resData.comments;//评论内容
          vm.$store.commit('isLoading', false);
        }
      }).catch(function(err){
        console.error(err);
      });

    },
    components: {
      comComment: Comment,
      comReply: Reply
    },
    methods: {
      handleSubmit: function (val) {
        this.content = val
      },
      /**
      * 日期时间格式化
      * @param time 表示时间的整数(可以是字符串格式)
      */
      formatDate : function(time){
        let date = new Date(parseInt(time));
        return moment(date).format("LLL");
      },
      zan:function () {
        let obj = this.resData;
        let url = this.baseUrl + 'thumbsUp/'+obj.id;
        let choice = obj.memberIsThumbs ? 1 : 0;
        var params = {
          memberId: this.memberId,
          //当前用户是否赞过
          choice: choice
        }
        this.$http.get(url,{params}).then(function(res){
          // var resData = JSON.parse(res.bodyText);
          var resData = res.data;
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
      //收藏
      star: function () {
        //收藏分享 TODO
      }
    }
  }
</script>
<style lang="scss">
  @import "../../static/css/article.scss";
</style>
