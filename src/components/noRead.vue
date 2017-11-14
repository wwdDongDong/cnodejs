<template>
  <div>
    <div class="headerPin">
      主页 / 新消息
    </div>
    <div v-if="!noRead.length" class="noReadData! noCom">
      暂无新消息
    </div>
    <div v-else-if="noRead.length" class="noReadData noCom" v-for="index,keys in noRead">
      <span v-show="index.type === 'at'">
        <a class="aCom">{{index.author.loginname}}</a> 在 <span style="color: skyblue;cursor: pointer" @click="unitRead(index)">{{index.topic.title}}</span>中@了你
      </span>
      <span v-show="index.type === 'reply'">
        <a class="aCom">{{index.author.loginname}}</a> 回复了你的话题 <span style="color: skyblue;cursor: pointer" @click="unitRead(index)">{{index.topic.title}}</span>
      </span>
    </div>
    <div class="headerPin" style="margin-top: 15px">
      过往信息
    </div>
    <div v-if="hasRead.length >= 6" class="hasReadData noCom" v-for="index,keys in hasRead" v-show="keys<6 &&  num === true">
      <span v-show="index.type === 'at'">
        <a class="aCom">{{index.author.loginname}}</a> 在 <span style="color: skyblue"><a class="aCom">{{index.topic.title}}</a> 中@了你 </span>
      </span>
      <span v-show="index.type === 'reply'">
          <a class="aCom">{{index.author.loginname}}</a> 已经回复了你的话题 <span style="color: skyblue"><a class="aCom">{{index.topic.title}}</a></span>
      </span>
      <div @click="getMore" style="cursor: pointer" v-show="keys === 5 && num === true">获取更多</div>
    </div>
    <div v-if="hasRead.length >= 6" class="hasReadData noCom" v-for="index,keys in hasRead" v-show="num === false">
      <span v-show="index.type === 'at'">
        <a class="aCom">{{index.author.loginname}}</a> 在 <span style="color: skyblue"><a class="aCom">{{index.topic.title}}</a> 中@了你 </span>
      </span>
      <span v-show="index.type === 'reply'">
          <a class="aCom">{{index.author.loginname}}</a> 已经回复了你的话题 <span style="color: skyblue"><a class="aCom">{{index.topic.title}}</a></span>
      </span>
      <div @click="getMore" style="padding: 10px;cursor: pointer" v-show="keys === 5 && num === true">获取更多</div>
    </div>
    <div v-else-if="hasRead.length < 6" class="hasReadData noCom" v-for="index,keys in hasRead" v-show="num === false">
      <span v-show="index.type === 'at'">
        <a class="aCom">{{index.author.loginname}}</a> 在 <span style="color: skyblue"><a class="aCom">{{index.topic.title}}</a> 中@了你 </span>
      </span>
      <span v-show="index.type === 'reply'">
          <a class="aCom">{{index.author.loginname}}</a> 已经回复了你的话题 <span style="color: skyblue"><a class="aCom">{{index.topic.title}}</a></span>
      </span>
      <div @click="getMore" style="cursor: pointer" v-show="keys === 5 && num === true">获取更多</div>
    </div>
    <div v-if="!hasRead.length" class="hasReadData! noCom">
      暂无新消息
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    data () {
      return {
        noRead: '',
        hasRead: '',
        count: '',
        num: true
      }
    },
    created () {
      axios.get('https://cnodejs.org/api/v1/messages/?accesstoken=6fdb9c81-466f-4294-ba3e-e2b4eab9fac2&mdrender=true').then((response) => {
        this.hasRead = response.data.data.has_read_messages
        this.noRead = response.data.data.hasnot_read_messages
      })
    },
    methods: {
      unitRead (index) {
        axios.post('https://cnodejs.org/api/v1/message/mark_one/' + index.id, {accesstoken: '6fdb9c81-466f-4294-ba3e-e2b4eab9fac2'}).then((response) => {
          this.$router.push({path: '/strictpags/' + index.topic.id})
        })
      },
      getMore () {
        this.num = false
      }
    }
  }
</script>
<style>
.noCom{
  padding: 10px;
  background-color: white;
  border-radius: 3px 3px 0 0;
}
</style>
