<template>
  <div class="com-comment">
    <div class="title">评论区</div>
    <div class="content">
      <ul class="c-list clearfix">
        <li v-for="(comment,index) in comments">

          <div class="c-top clearfix">
            <img :src="imageUrl + comment.user.memberIcon">
            <p class="name">{{comment.user.memberNickname}} <!-- 回复 {{v.toMemberNickname}} --></p>
            <time>{{formatDate(comment.createTime)}}</time>
            <span v-if="id==comment.user.id" class="icon iconfont icon-lajixiang delete" @click="del(comment.id,index)"></span>
            <a @click="doReply" :commentId="comment.user.id" :name="comment.user.memberNickname" class="reply">
              <span class="iconfont icon icon-more2" :commentId="comment.user.id" :name="comment.user.memberNickname"></span>
              回复
            </a>
          </div>
          <div class="c-bottom">
            <p>{{comment.content}}</p>
          </div>

        </li>
      </ul>
      <a @click="doComment" class="comment-btn btn-b">评 论</a>
    </div>
  </div>
</template>
<script>
  import router from "../router/router";
  import moment from "moment";

  export default {
    data: function () {
      return {
        id: localStorage.getItem('memberId'),
        imageUrl : this.$store.state.comm.fileUrl+"image/",
        baseUrl : this.$store.state.comm.apiUrl+"comment/"
      }
    },
    props: ['content'],
    computed: {
      //评论
      comments: function () {
        return this.$store.state.reply.comment;
      }
    },
    methods: {
      /**
      * 日期时间格式化
      * @param time 表示时间的整数(可以是字符串格式)
      */
      formatDate : function(time){
        let date = new Date(parseInt(time));
        return moment(date).format("LLL");
      },
      doReply: function (event) {
        let p = event.target
        let name = p.getAttribute('name')
        let id = p.getAttribute('commentId')

        this.$store.commit('reply', {name: name, commentId: id})
      },
      doComment: function () {
        if(!localStorage.getItem("memberId")) {
          router.push("/login");
          return;
        }
        this.$store.commit('reply', {name: '', commentId: ''});
      },
      /**
      * 删除评论
      * @param id 评论的ID
      * @param index 评论的索引(从0开始)
      */
      del: function (id,index) {
        let url = this.baseUrl + "/del";
        let params = {
          commentId: id
        };
        this.$http.get(url,{params}).then(function (res) {
          var resData = JSON.parse(res.bodyText);
          if(resData.status){
            this.comments.splice(index,1);
            // location.reload();
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    watch: {}
  }
</script>
<style lang="scss">
  @import "../../static/css/comment.scss";
</style>
