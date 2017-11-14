<template>
  <div class="strictpags">
    <router-view/>
    <div class="strictpag_left">
      <div class="strictpag_header">
        <div class="strictpag_header_one">
          <span v-if="strictData.top" class="all_list_box">置顶</span>
          <span v-else-if="strictData.good" class="all_list_box">精华</span>
          <span v-else-if="strictData.tab==='ask'" class="all_list_qa">问答</span>
          <span v-else-if="strictData.tab==='share'" class="all_list_qa">分享</span>
          <span v-else-if="strictData.tab==='dev'" class="all_list_qa">测试</span>
          <span>{{strictData.title}}</span>
        </div>
        <button class="Cang" :class="{active: btnColor, negative:!btnColor}"><a @click="cang" >{{textC}}</a></button>
        <ul class="strictpag_header_two">
          <li>发布于{{strictData.create_at | time}}</li>
          <li>作者 <a href="">{{strictData.author.loginname}}</a></li>
          <li>{{strictData.visit_count}}浏览过</li>
          <li>最后一次编辑{{strictData.last_reply_at | time}} </li>
          <li>来自
            <span v-if="strictData.tab === 'share'">分享</span>
            <span v-else-if="strictData.tab === 'good'">精华</span>
            <span v-else-if="strictData.tab === 'ask'">问答</span>
            <span v-else-if="strictData.tab === 'dev'">测试</span>
          </li>
        </ul>
        <button v-if="myName === author_id" class="edit"><router-link :to="'/edit/' + topic_id" tag="a" class="aCom">编辑</router-link></button>
        <div class="strictpag_content" v-html="content"></div>
      </div>
      <div class="strictpag_replay">
        <div class="strictpag_replay_header">
          {{strictData.replay_content}} 回复
        </div>
        <div v-for="(index,keys) in replies" class="strictpag_replay_content">
          <a href=""><img :src="strictData" alt=""></a>
          <strong>{{index.author.loginname}}</strong>
          <span>{{keys + 1}}楼 {{index.create_at | time}}</span>
          <div class="zan_content">
            <a @click="zan(keys)" style="cursor: pointer" ><span class="iconfont icon-zan"></span></a>
            <span>{{replies[keys].ups.length}}</span>
            <span @click="imdieate_reply(keys)" style="font-size: 20px;margin-left:5px;font-weight: 700;cursor: pointer;">↑</span>
          </div>
          <div v-html="index.content" class="strictpag_replay_unit_content">
          </div>
          <div class="unitreplay">
            <textarea class="textarea" v-model="textarea.content"></textarea>
            <button class="replay_btn" @click="unit_reply(keys)">回复</button>
          </div>
        </div>
      </div>
        <div class="my_replay headerPin">
        <div>回复内容</div>
      </div>
      <textarea class="textarea" placeholder="留下你的评论吧~~~" v-model="replayContent" autofocus></textarea>
      <button class="replay_btn" @click="replay">回复</button>
    </div>
    <div class="strictpag_right">
      <author :message="item"></author>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comment from '../../comment/left.vue'
  import { obj } from '../../../main'
  export default {
    components: {
      'author': comment
    },
    data () {
      return {
        strictData: '',
        content: '',
        replies: [],
        replayContent: '',
        item: {
          url: '',
          name: ''
        },
        topic_id: '',
        reply_id: '',
        textarea: {
          success: true,
          content: ''
        },
        textC: '',
        clect: '',
        myName: '59e4a9e9bcfcc03162f2fed4',
        author_id: '',
        btnColor: ''
      }
    },
    watch: {
      $route () {
        this.replay() // 为什么我回复的时候，页面没有刷新呢？怎么没有监听呢？
        this.zan() //
        this.cang()
      }
    },
    created () {
      var user = this.$route.params.id
      axios.get(obj + '/topic/' + user + '?mdrender=false&accesstoken=6fdb9c81-466f-4294-ba3e-e2b4eab9fac2').then((response) => {
        this.strictData = response.data.data
        this.replies = this.strictData.replies
        if (response.data.data.is_collect) {
          this.$set(this.strictData, 'is_collect', true)
          this.btnColor = false
          this.textC = '取消收藏'
        } else {
          this.$set(this.strictData, 'is_collect', false)
          this.btnColor = true
          this.textC = '收藏'
        }
        this.content = this.strictData.content
        this.author_id = response.data.data.author_id
        this.item.url = response.data.data.author.avatar_url
        this.item.name = response.data.data.author.loginname
        this.topic_id = response.data.data.id
      })
    },
    methods: {
      // 回复
      replay () {
        if (this.replayContent) {
          axios.post('https://cnodejs.org/api/v1/topic/' + this.topic_id + '/replies', {accesstoken: '6fdb9c81-466f-4294-ba3e-e2b4eab9fac2', content: this.replayContent, reply_id: this.reply_id}).then((response) => {
            document.location.reload()
          })
        } else {
          alert('请输入你的评论哦~~')
          return false
        }
      },
      // 赞
      zan (keys) {
        axios.post('https://cnodejs.org/api/v1/reply/' + this.replies[keys].id + '/ups', {accesstoken: '6fdb9c81-466f-4294-ba3e-e2b4eab9fac2'}).then((response) => {
          console.log(response.data.action)
          if (response.data.action === 'up') {
            this.$set(this.replies[keys], 'ups.length', this.replies[keys].ups.length++)
          } else if (response.data.action === 'down') {
            this.$set(this.replies[keys], 'ups.length', this.replies[keys].ups.length--)
          }
        })
      },
      // 单个回复
      imdieate_reply (keys) {
//        Vue.set(this.replies, keys, this.replies[ keys ].is)
        var unitreplay = document.querySelectorAll('.unitreplay')
        var unitarea = document.querySelectorAll('.unitreplay>textarea')
        unitreplay[ keys ].style.display = 'block'
        unitarea[ keys ].value = '@' + this.replies[ keys ].author.loginname
      },
      unit_reply (keys) {
        var unitarea = document.querySelectorAll('.unitreplay>textarea')
        var content = unitarea[ keys ].value
        axios.post('https://cnodejs.org/api/v1/topic/' + this.topic_id + '/replies', {accesstoken: '6fdb9c81-466f-4294-ba3e-e2b4eab9fac2', content: content, reply_id: this.replies[keys].id}).then((response) => {
          window.location.reload()
        })
      },
      // 收藏以及取消
      cang () {
        if (this.strictData.is_collect) {
          this.$set(this.strictData, 'is_collect', false)
          axios.post('https://cnodejs.org/api/v1/topic_collect/de_collect', {accesstoken: '6fdb9c81-466f-4294-ba3e-e2b4eab9fac2', topic_id: this.topic_id}).then((response) => {
          })
          this.textC = '收藏'
          this.btnColor = true
          console.log(this.strictData.is_collect)
        } else {
          this.$set(this.strictData, 'is_collect', true)
          axios.post('https://cnodejs.org/api/v1/topic_collect/collect', {accesstoken: '6fdb9c81-466f-4294-ba3e-e2b4eab9fac2', topic_id: this.topic_id}).then((response) => {
            console.log(response)
          })
          this.textC = '取消收藏'
          this.btnColor = false
        }
      }
    }
  }
</script>
<style>
  .strictpag_replay{
    width: 1062px;
    margin-bottom: 13px;
  }
  .strictpag_left{
    float: left;
    overflow: hidden;
  }
  .strictpag_replay_header{
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
  }
  .strictpag_replay_content{
    background-color: white;
    padding: 10px;
    font-size: 14px;
    border-top: 1px solid #f0f0f0;
  }
  .strictpag_replay_unit_content>div{
    padding-left: 50px;
  }
  .strictpag_replay_unit_content{
    font-size: 15px;
    line-height: 1.7em;
    overflow: auto;
    word-wrap: break-word;
  }
  .strictpag_replay_unit_content p{
    margin-bottom: 1em;
  }
  .zan_content{
    width:60px;
    float: right;
    white-space: nowrap;
  }
  .zan_content>a{
    display: inline-block;
    color: #ddd;
    text-decoration: none;
    font-size:17px;
  }
  .zan_content>a:hover{
    text-decoration:underline;
  }
  .textarea{
    width:100%;
    height: 190px;
    margin-bottom:13px;
    padding:10px;
    text-indent: 2em;
    box-sizing: border-box;
    border:none;
    resize: vertical;
    font-size: 20px;
  }
  .replay_btn{
    width: 50px;
    height: 30px;
    border: none;
    background: #0088cc;
    border-radius: 3px;
    margin-bottom: 13px;
    outline:none;
    color: white;
    font-weight: 700;
  }
  .replay_btn>a{
    text-decoration: none;
    font-size: 16px;
    color: white;
    font-weight: 700;
  }
  .Cang{
    float: right;
    margin-right: 20px;
    margin-top: 15px;
    width: 50px;
    height: 30px;
    border: none;
    border-radius: 3px;
    margin-bottom: 13px;
    outline:none;
  }
  .negative{
    background-color: #ddd;
    color: black;
  }
  .Cang>a{
    white-space: nowrap;
    font-size: 12px!important;
  }
  .unitreplay{
    display: none;
  }
  .active{
    background-color:#55a532;
    color: white;
  }
  .edit{
    margin-right: 20px;
    margin-top: 15px;
    width: 50px;
    height: 30px;
    border: none;
    border-radius: 3px;
    margin-bottom: 13px;
    outline:none;
    color: white;
    font-weight: 700;
  }
</style>
