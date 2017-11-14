<template>
  <div class="headerPin">
    主页 / node.js 新手指引
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        dataList: [],
        userCon: [],
        iPage: 1,
        limit: 40
      }
    },
    created () {
      axios.get('https://cnodejs.org/api/v1/topics?tab=good&page=' + this.iPage + '&limit=' + this.limit + '&mdrender=true')
        .then((response) => {
          this.dataList = response.data.data
        })
    }
  }
</script>
<style>

</style>
