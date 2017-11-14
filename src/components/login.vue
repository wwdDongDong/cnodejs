<template>
  <div>
    <div class="headerPin">
      主页 / 登录
    </div>
    <div class="pagLogin">
      <div>
        <div class="pagLogin-group">
          <span>用户名：</span>
          <input type="text">
        </div>
        <div class="pagLogin-group">
          <span>密码：</span>
          <input type="password">
        </div>
      </div>
      <div class="pagLogin-btn">
        <button @click="login">登录</button>
        <button>通过Github登录</button>
        <a class="aCom forget">忘记密码了？</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  methods: {
    login () {
      axios.get(' https://cnodejs.org/api/v1', {accesstoken: '6fdb9c81-466f-4294-ba3e-e2b4eab9fac2'}).then((response) => {
        console.log(response)
      })
      shareTo('wb', 0)
      function shareTo (type, postId) {
        var title = '123东东'
        var img = 'https://avatars1.githubusercontent.com/u/30905492?v=4&s=120'
        var url = window.location.origin + postId
        var href = ''
        if (type === 'qq') {
          href = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + '&showcount=1&desc=&summary=来自一个正经的网站&title=' + title + '&site=逗你的 一个正经网站&pics=' + img
        }
        if (type === 'wb') {
          href = 'http://service.weibo.com/share/share.php?title=' + title + '&pic=' + img + '&url=' + url
        }
        window.open(href, '_blank', 'width=630,height=630,toolbar=no, menubar=no, scrollbars=no, location=no,status=no')
      }
    }
  }
}
</script>
<style>
.pagLogin{
  background: white;
  padding: 10px;
  border-radius: 0 0 3px 3px;
}
  .pagLogin>div:nth-of-type(1){
    margin-top: 40px;
  }
  .pagLogin>div:nth-of-type(2){
    color: #fff;
    padding-left: 180px;
    margin-bottom: 30px;
  }
  .pagLogin-group{
    margin-bottom: 20px;
  }
.pagLogin-group:after{
  content: '·';
  clear: both;
  display: inline-block;
  visibility: hidden;
  height:0;
}
.pagLogin-group>span{
  float: left;
  width: 160px;
  padding-top: 5px;
  text-align: right;
}
  .pagLogin-group>input{
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    border:1px solid #ccc;
    height: 20px;
    padding: 4px 6px;
    border-radius: 4px;
    color: #555;
    width: 270px;
  }
  .pagLogin-btn>button:nth-of-type(1){
    border-radius: 3px;
    border: none;
    background-color: #08c;
    color: #fff;
    padding: 3px 10px;
    margin: 0;
    font-size: 14px;
    transition: all .2s ease-in-out;
    letter-spacing: 2px;
    box-shadow: none;
    line-height: 2em;
  }
.pagLogin-btn>button:nth-of-type(1):hover{
  background-color: #07C!important;
}
.pagLogin-btn>button:nth-of-type(2):hover{
   background-color: #5BC0B9!important;
 }
.pagLogin-btn>button:nth-of-type(2){
  display: inline-block;
  float: none;
  padding: 3px 10px;
  border: none;
  margin: 0;
  font-size: 14px;
  transition: all .2s ease-in-out;
  cursor: pointer;
  letter-spacing: 2px;
  box-shadow: none;
  border-radius: 3px;
  line-height: 2em;
  vertical-align: middle;
  color: #fff;
  background-color: #5bc0de;
}
</style>
