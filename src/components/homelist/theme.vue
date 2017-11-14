<template>
  <div>
    <div class="themeLeft">
      <div class="headerPin radius">
        主页 / 发布话题
      </div>
      <div style="padding: 10px;background-color: white">
        <div v-show="tittleSH" style="font-weight: 700;color: #b94a48;background-color: #f2dede;border-color: #eed3d7;padding: 8px 35px 8px 14px;margin-bottom: 20px;">
          标题不能是空的
        </div>
        <div style="padding: 10px;overflow: hidden;width: 360px">
          <div style="float: left;margin-top: 7px" v-bind:style="choose?{color:'red'}:{color:'black'}">选择模板</div>
          <select v-model="tab" name="" id="" style="float: right">
            <option value="">请选择</option>
            <option value="share">分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
            <option value="dev">测试</option>
          </select>
        </div>
        <div>
          <input v-model="tittle" type="text" placeholder="标题字数 10 字以上"  height="30px" style="padding-left:10px;box-sizing:border-box;border:1px solid #ddd;border-radius:4px;width: 90%;height: 30px;">
        </div>
        <textarea v-model="content" style="width: 100%;height: 300px;text-indent: 2em;border: none;margin-top: 13px;outline: none;font-size: 16px;" placeholder="输入你要说的话~~"></textarea>
        <button class="btn" @click="theme_hu">回复</button>
      </div>
    </div>
    <div class="themeRight">
      <div style="margin-bottom: 13px">
        <div class="headerPin radius">Markdown 语法参考</div>
        <div style="padding: 10px; box-sizing: border-box;font-size: 13px;background-color: white ">
          <div style="height: 30px;margin-top: 4px;">### 单行的标题</div>
          <div style="height: 30px;margin-top: 4px;">**粗体**</div>
          <div style="height: 30px;margin-top: 4px;">`console.log('行内代码')`</div>
          <div style="height: 30px;margin-top: 4px;">```js\n code \n``` 标记代码块</div>
          <div style="height: 30px;margin-top: 4px;">[内容](链接)</div>
          <div style="height: 30px;margin-top: 4px;">![文字说明](图片链接)</div>
          <div style="height: 30px;margin-top: 4px;">Markdown 文档</div>
        </div>
      </div>
      <div style="margin-bottom: 13px">
        <div class="headerPin">话题发布指南</div>
        <div style="padding: 10px; box-sizing: border-box;font-size: 13px;background-color: white">
          <div style="height: 30px;margin-top: 4px;">尽量把话题要点浓缩到标题里</div>
          <div style="height: 30px;margin-top: 4px;">代码含义和报错可在 SegmentFault 提问</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default{
  data () {
    return {
      content: '',
      tab: '',
      choose: '',
      tittle: '',
      tittleSH: false
    }
  },
  methods: {
    theme_hu () {
      if (!this.tab) {
        this.choose = true
        alert('你必须选择一个模块')
        return
      }
      if (!this.tittle) {
        this.choose = false
        this.tittleSH = true
      }
      axios.post('https://cnodejs.org/api/v1/topics/', {accesstoken: '6fdb9c81-466f-4294-ba3e-e2b4eab9fac2', title: this.tittle, tab: this.tab, content: this.content}).then((response) => {
        console.log(response)
        this.$route.push({path: '/home/?tab=dev'})
      })
    }
  },
  created () {
    var data = this.$route.params.data
    if (data) {
      axios.get('https://cnodejs.org/api/v1/user/' + data).then((response) => {
        this.shuju = response.data.data
        this.user.url = response.data.data.avatar_url
        this.user.name = response.data.data.loginname
        this.user.score = response.data.data.score
      })
      axios.get('https://cnodejs.org/api/v1/topic/' + data).then((response) => {
        console.log(response.data.data)
      })
    }
  }
}
</script>
<style>
.radius{
  border-radius: 3px 3px 0 0;
}
.themeLeft{
  float: left;
  width: 1064px;
}
.themeRight{
  float: right;
  width: 290px;
}
  select{
    display: inline-block;
    height: 30px;
    padding: 4px 6px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #555;
    vertical-align: middle;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    width: 290px;
  }
  .btn{
    width: 60px;
    height: 30px;
    color: white;
    font-size: 16px;
    background-color: #0088cc;
    border-radius: 3px;
    margin-top: 13px;
    border: none;
    transition: all .5s;
  }
  .btn:hover{
    background-color: #0086b3;
  }
</style>
