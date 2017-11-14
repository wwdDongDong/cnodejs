<template>
  <div class="message">
    <div class="message_left">
      <div class="headerPin">主页 / </div>
      <div class="message_content">
        <div style="padding: 10px;box-sizing: border-box">
          <img :src="shuju.avatar_url" alt="" align="center" width="40px" style="border-radius: 3px">
          <span>{{shuju.loginname}}</span>
        </div>
        <div>{{shuju.score}}积分</div>
        <div><router-link :to="'/shoucang/' + shuju.loginname">{{huati}}个话题收藏</router-link></div>
        <div>
          <span></span>
          <span>http://{{shuju.loginname}}.com</span>
        </div>
        <div>
          <span></span>
          <span>北京</span>
        </div>
        <div>
          <span></span>
          <span>@{{shuju.loginname}}</span>
        </div>
        <div>
          <span></span>
          <span>shit微博</span>
        </div>
        <div>
          <span>注册时间{{shuju.create_at | time}}</span>
        </div>
      </div>
      <div>
        <div class="headerPin">
          <span>最近注册的话题</span>
        </div>
        <div v-for="item in shuju.recent_topics" class="recently_topic">
          <div>
            <div class="topic_left">
              <img align="center" :src="item.author.avatar_url" alt="" width="30px" style="border-radius: 3px">
              <span v-if="item.top" class="all_list_box">置顶</span>
              <span v-else-if="item.good" class="all_list_box">精华</span>
              <span v-else-if="item.tab==='ask'" class="all_list_qa">问答</span>
              <span v-else="index.tab==='share'" class="all_list_qa">分享</span>
              <router-link :to="'/strictpags/' + item.id" tag="a"><a class="aCom">{{item.title}}</a></router-link>
            </div>
            <div class="topic_right">
              <span>{{item.last_reply_at | time}}</span>
            </div>
          </div>
        </div>
        <div class="headerPin">
          最近参与的话题
        </div>
        <div class="recently_join">
          <div v-for="item,keys in shuju.recent_replies">
            <div class="join_left">
              <img align="center" :src="item.author.avatar_url" alt="" width="30px" style="border-radius: 3px">
              <span v-if="item.top" class="all_list_box">置顶</span>
              <span v-else-if="item.good" class="all_list_box">精华</span>
              <span v-else-if="item.tab==='ask'" class="all_list_qa">问答</span>
              <span v-else="index.tab==='share'" class="all_list_qa">分享</span>
              <router-link :to="'/strictpags/' + item.id" tag="a"><a class="aCom">{{item.title}}</a></router-link>
            </div>
            <div class="join_right">
              <span>{{item.last_reply_at | time}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="message_right">
      <v-comment :message="user"></v-comment>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comment from '../../comment/left.vue'
  export default{
    components: {
      vComment: comment
    },
    data () {
      return {
        shuju: '',
        user: {
          url: '',
          name: '',
          score: ''
        },
        huati: '',
        id: ''
      }
    },
    created () {
      let data = this.$route.params.data
      axios.get('https://cnodejs.org/api/v1/user/' + data).then((response) => {
        this.shuju = response.data.data
        this.user.url = response.data.data.avatar_url
        this.user.name = response.data.data.loginname
        this.user.score = response.data.data.score
        this.id = response.data.data.recent_topics[0].id
      })
      axios.get('https://cnodejs.org/api/v1/topic_collect/' + data).then((response) => {
        this.huati = response.data.data.length
      })
    }
  }
</script>
<style>
.message_left{
  float: left;
  width: 1062px;
}
.message_content{
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 15px;
}
.message_right{
  width: 290px;
  float: right;
}
  .recently_topic{
    background-color: white;
  }
  .recently_topic>div{
    padding: 10px;
    overflow: hidden;
  }
  .topic_left,.join_left{
    float: left;
  }
  .topic_right,.join_right{
    float: right;
  }
  .recently_join{
    background-color: white;
    margin-bottom: 13px;
  }
.recently_join>div{
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
