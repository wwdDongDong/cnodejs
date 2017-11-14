<template>
    <div class="themeLeft">
      <div class="headerPin radius">
        主页 / 编辑话题
      </div>
      <div style="padding: 10px;background-color: white">
        <div v-show="tittleSH" style="font-weight: 700;color: #b94a48;background-color: #f2dede;border-color: #eed3d7;padding: 8px 35px 8px 14px;margin-bottom: 20px;">
          标题不能是空的
        </div>
        <div style="padding: 10px;overflow: hidden;width: 360px">
          <div style="float: left;margin-top: 7px" v-bind:style="choose?{color:'red'}:{color:'black'}">选择模板</div>
          <select v-model="tab" name="" id="" style="float: right" class="tab">
            <option value="">请选择</option>
            <option value="share">分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
            <option value="dev">测试</option>
          </select>
        </div>
        <div>
          <input class="title" v-model="tittle" type="text" placeholder="标题字数 10 字以上"  height="30px" style="padding-left:10px;box-sizing:border-box;border:1px solid #ddd;border-radius:4px;width: 90%;height: 30px;">
        </div>
        <textarea class="content" v-model="content" v-html="content" style="width: 100%;height: 300px;text-indent: 2em;border: none;margin-top: 13px;outline: none;font-size: 16px;" placeholder="输入你要说的话~~"></textarea>
        <button class="btn" @click="theme_hu">回复</button>
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
        tittleSH: false,
        data: ''
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
        alert(this.content)
        axios.post('https://cnodejs.org/api/v1/topics/update', {accesstoken: '6fdb9c81-466f-4294-ba3e-e2b4eab9fac2', topic_id: this.data.id, title: this.tittle, tab: this.tab, content: this.content}).then((response) => {
          console.log(response.data.data)
          alert('修改成功')
          this.$router.push({path: '/all'})
        })
      }
    },
    created () {
      var data = this.$route.params.name
      console.log(data)
      axios.get('https://cnodejs.org/api/v1/topic/' + data + '?mdrender=true&accesstoken=6fdb9c81-466f-4294-ba3e-e2b4eab9fac2').then((response) => {
        this.tab = response.data.data.tab
        this.tittle = response.data.data.title
        this.content = response.data.data.content
        this.data = response.data.data
        console.log(response.data.data)
//        var content = document.querySelector('.content')
//        var title = document.querySelector('.title')
//        var tab = document.querySelector('.tab')
//        content.value = response.data.data.content
//        title.value = response.data.data.title
//        tab.value = response.data.data.tab
      })
    }
  }
</script>
<style>
.editLeft{
  float: left;
  width: 1062px;
}
.editRight{
  float: right;
  width: 290px;
}
  .btn{
    color: #fff;
    background-color: #05c;
    border:none;
    font-size: 16px;
    width:60px;
    height: 30px;
  }
  .tab{
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
</style>
