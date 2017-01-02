<template>
  <div class="add-pet">
    <div class="c-Publish">
      <div class="Pu-text">
        <textarea rows="6" placeholder="这一刻的想法..." v-model="message"></textarea>
        <span class="limit">{{ message.length }}／300</span>
      </div>
      <div class="Pu-img">
        <span v-for="value in imgArr">
           <a href="javascript:;">
             <img :src="value.src" alt="img">
           </a>
        </span>
        <a href="javascript:;" class="Pu-Add-img">
          <div class="addImg">+</div>
          <input type="file" v-on:change="addImg">
        </a>
      </div>
    </div>
    <a @click="submitInfo" class="btn-b">发 布</a>
  </div>
</template>

<script>
  import router from '../router/router'

  export default{
    name : "addMsg",
    data: function () {
      return {
        message: '',
        imgArr: []
      }
    },
    created: function () {
      this.$store.commit('changeIndexConf', {
        isFooter: false,
        isSearch: false,
        isBack: true,
        isShare: false,
        title: '发布圈子'
      })
    },
    components: {},
    methods: {
      submitInfo: function () {
        if (this.message.length > 300) {
          alert('字数不能超过300！')
        }else if(this.message.length === 0 && this.imgArr.length === 0){
          alert('发布消息不能为空')
        }else{
          let url = this.$store.state.comm.apiUrl + "share/publishShared";

          let urlArr=[];
          this.imgArr.forEach(function(element, index){
            urlArr.push(encodeURIComponent(element.src.substring(23)));
          })
          this.$store.commit('isLoading', false)
          let params = {
            sharedContent : this.message,
            memberId : localStorage.getItem('memberId'),
            sharedPhoto : urlArr
          }
          this.$http.post(url,{params}).then(function(res){
            alert('发布成功');
            router.push('/index/fresh');
            this.$store.commit('isLoading', false);
          }).catch(function(err){
            console.error(err);
          });
        }
      },
      addImg: function (event) {
        let self = this
        if (self.imgArr.length < 6) {
          var file = event.target.files[0]
          if (!/image\/\w+/.test(file.type)) {
            alert('文件必须为图片！');
            return false;
          }
          //显示图片预览
          var reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function (e) {
            self.imgArr.push({src: this.result});
          }
        } else {
          alert('一次最多只能上传6张图片！');
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../../static/css/addMsg.scss";
</style>
