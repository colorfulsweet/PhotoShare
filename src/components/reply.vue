<template>
  <div v-show="isComment" class="b-reply">
    <input class="r-input" type="text" v-model="replyText" :placeholder="reply">
    <span @click="submit">回复</span>
  </div>
</template>
<script>
  export default{
    data: function () {
      return {
        replyText : null
      }
    },
    // updated: function () {
    //   this.replyText = null;
    // },
    computed: {
      isComment: function () {
        return this.$store.state.reply.isComment
      },
      reply: function () {
        if (this.$store.state.reply.name !== '') {
          return '回复 ' + this.$store.state.reply.name
        } else {
          return '评论'
        }
      }
    },
    methods: {
//      提交回复或评论
      submit: function (e) {
        let val = this.replyText;
        let url = this.$store.state.comm.apiUrl + 'comment/publish';
        let memberId = localStorage.getItem('memberId');

        if(val.length > 100) {
          alert('评论不能多于100字！');
          return false;
        }

        let params;
        // if(this.$store.state.reply.name !== ''){
          params = {
            content: val,
            sharedId: this.$route.params.id,
            memberId: memberId
            // commentToMemberId: this.$store.state.reply.commentId,
            // fromMemberNickname: JSON.parse(localStorage.getItem('userMsg')).memberName,
            // toMemberNickname: this.$store.state.reply.name,
            // fromMemberAvatar: this.$store.state.comm.fileUrl+JSON.parse(localStorage.getItem('userMsg')).memberAvatar
          }
        // }else{
        //   param = {
        //     commentContent: val,
        //     sharedId: this.$route.params.id,
        //     commentFromMemberId: memberId,
        //     fromMemberNickname: JSON.parse(localStorage.getItem('userMsg')).memberName,
        //     toMemberNickname: this.$store.state.reply.name,
        //     fromMemberAvatar: this.$store.state.comm.fileUrl + JSON.parse(localStorage.getItem('userMsg')).memberAvatar
        //   }
        // }
        this.$store.commit('isLoading', true);
        this.$http.get(url,{params}).then(function(res){
          let resData = JSON.parse(res.bodyText);
          if(resData.status) {
            location.reload();
          }
        }).catch(function(err){
          console.error(err);
        });
      }
    }
  }
</script>
<style lang="scss">
  @import "../../static/css/reply.scss";
</style>
