<template>
  <div id="app">
    <div class="load" v-if="loading">
      <load type="balls" color="#20A0FF" :size="{ width: '60px', height: '60px' }"></load>
    </div>
    <div v-if="loading" class="loadingPag"></div>
    <div class="header">
      <div>
        <div class="header_left">
          <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg">
          <div>
            <input type="text">
          </div>
        </div>
        <ul class="header_right">
          <router-link to="/" tag="li">首页</router-link>
          <router-link to="/noRead" tag="li" style="position: relative;"><span class="noReadSphere" v-show="allReadL" @click="allRead">{{noRead}}</span> 未读消息</router-link>
          <router-link to="/newuser" tag="li">新手入门</router-link>
          <router-link to="/api" tag="li">API</router-link>
          <router-link to="/about" tag="li">关于</router-link>
          <router-link to="/register" tag="li">注册</router-link>
          <router-link to="/login" tag="li">登录</router-link>
          <router-link to="/setting" tag="li">设置</router-link>
          <router-link to="/exit" tag="li">退出</router-link>
        </ul>
      </div>
    </div>
    <div class="view">
      <router-view/>
    </div>
    <div class="footer">
      <div>
        <div>
          <a href="">RSS  </a>
              |
          <a href="">源码地址</a>
        </div>
        <div>
          <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
          <p>
            服务器赞助商为
            <a href="">
              <img src="//dn-cnode.qbox.me/FuIpEaM9bvsZKnQ3QfPtBHWQmLM9" alt="" width="92px" align="center">
            </a>
            ，存储赞助商为
            <a href="">
              <img src="//dn-cnode.qbox.me/Fg0jtDIcTqVC049oVu5-sn6Om4NX" alt="" width="115px" align="center">
            </a>
            ，由
            <a href="">
              <img src="//dn-cnode.qbox.me/FpMZk31PDyxkC8yStmMQL4XroaGD" alt="" width="166px" align="center">
            </a>
            提供应用性能服务。
          </p>
          <p>
            新手搭建 Node.js 服务器，推荐使用无需备案的
            <a href="https://www.digitalocean.com/?refcode=eba02656eeb3" class="lastA">DigitalOcean(https://www.digitalocean.com/)</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import vueLoading from 'vue-loading-template'
import { obj } from './main'
export default {
  components: {
    'load': vueLoading
  },
  data () {
    return {
      noRead: '',
      loading: true,
      allReadL: ''
    }
  },
  beforeCreate () {
    window.onmousewheel = document.onmousewheel = false
  },
  created () {
    function messageCount () {
      return axios.get(obj + '/message/count' + '?accesstoken=6fdb9c81-466f-4294-ba3e-e2b4eab9fac2')
    }
    function dataAll () {
      return axios.get(obj + '/topics?tab=all&page=1&limit=40&mdrender=true')
    }
    axios.all([messageCount(), dataAll()]).then((response) => {
      console.log(response)
      if (response[0].data.success) {
        this.loading = false
        this.noRead = response.data.data
        window.onmousewheel = document.onmousewheel = false
      } else {
        this.$route.push({path: '/noFound'})
      }
    })
  },
  methods: {
    allRead () {
      axios.post(obj + '/message/mark_all', {accesstoken: '6fdb9c81-466f-4294-ba3e-e2b4eab9fac2'}).then((response) => {
        this.allReadL = response.data.data.count
        this.$router.push({path: '/noRead'})
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.noReadSphere{
  position: absolute;
  left:0;
  top: 5px;
  border-radius: 50%;
  background-color: #55a532;
  color: white;
  font-weight: 700;
  font-size: 16px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 22px;
  white-space: nowrap;
}
.loadingPag{
  width: 100%;
  height: 2414px;
  position: absolute;
  z-index: 99;
  background-color: rgba(0,0,0,0.2);
}
.load{
  position: absolute;
  left: calc(50% - 30px);
  top:calc(50% - 30px);
  z-index: 100;
}
</style>
