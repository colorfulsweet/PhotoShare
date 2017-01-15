<template>
  <div id="loadingToast" class="loading weui_loading_toast">
    <div class="loader loader-default is-active" :data-text="tip"></div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        tip : "正在加载..."
      }
    }
  }
</script>
<style lang="scss">
  @import "../../static/css/loader-default.css";
</style>
