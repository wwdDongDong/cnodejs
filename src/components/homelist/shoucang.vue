<template>
  <div>
    <div class="message_left">
      <div class="headerPin">主页 {{Cname}} 收藏的话题</div>
      <div class="shoucang">
        <div v-for="index,keys in cangCon" class="cangdiv" style="padding: 10px;box-sizing: border-box;">
          <span><img :src="index.author.avatar_url" alt="" class="img" align="center"></span>
          <span>{{index.reply_count}} / {{index.visit_count}}</span>
          <span><router-link class="aCom" :to="'/strictpags/' + index.id" tag="a">{{index.title}}</router-link></span>
        </div>
      </div>
    </div>
    <div class="message_right">
      <author :message="item"></author>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comment from '../comment/left.vue'
  export default{
    components: {
      'author': comment
    },
    data () {
      return {
        Cname: '',
        cangCon: '',
        item: {
          url: '',
          name: '',
          score: ''
        }
      }
    },
    created () {
      this.Cname = this.$route.params.Cname
      axios.get('https://cnodejs.org/api/v1/topic_collect/' + this.Cname).then((response) => {
        this.cangCon = response.data.data
        console.log(this.cangCon)
      })
      axios.get('https://cnodejs.org/api/v1/user/' + this.Cname).then((response) => {
        this.item.url = response.data.data.avatar_url
        this.item.name = response.data.data.loginname
        this.item.score = response.data.data.score
      })
    }
  }
</script>
<style>
  .shoucang{
    float: left;
    width: 1062px;
    background-color: white;
  }
  .message_left{
    float: left;
    width: 1062px;
  }
  .message_right{
    width: 290px;
    float: right;
  }
  .img{
    width: 30px;
  }
  .cangdiv:hover{
    background-color: #f5f5f5;
  }
</style>
