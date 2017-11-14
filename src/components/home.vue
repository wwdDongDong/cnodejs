<template>
  <div class="home" id="homeApp">
    <div class="home_left">
      <ul class="home_ul">
        <router-link to="?tab=all" tag="li">全部</router-link>
        <router-link to="?tab=good" tag="li">精华</router-link>
        <router-link to="?tab=share" tag="li">分享</router-link>
        <router-link to="?tab=ask" tag="li">问答</router-link>
        <router-link to="?tab=job" tag="li">招聘</router-link>
        <router-link to="?tab=dev" tag="li">客户端测试</router-link>
      </ul>
      <div class="content">
        <div class="all">
          <div v-for="(item,keys) in dataList" class="all_list">
            <div class="all_list_left">
              <a href="" class="all_list_a_img"><img :src='item.author.avatar_url' alt="" class="all_list_img"></a>
              <span class="all_list_number"><span>{{item.reply_count}}</span><span> / </span><span>{{item.visit_count}}</span></span>
              <span v-if="item.top" class="all_list_box">置顶</span>
              <span v-else-if="item.good" class="all_list_box">精华</span>
              <span v-else-if="item.tab==='ask'" class="all_list_qa">问答</span>
              <span v-else="item.tab==='share'" class="all_list_qa">分享</span>
              <span><router-link :to="'/strictpags/' + item.id" class="all_list_a">{{item.title}}</router-link></span>
            </div>
            <div class="all_list_right">
              <a href=""><img :src="item.author.avatar_url" alt="" class="all_list_right_img"></a>
              <span class="all_list_time">{{ item.last_reply_at | time }}</span>
            </div>
          </div>
          <div class="pagination" current_page="1">
            <ul class="pagination_ul">
              <li class="disabled" href="/?tab=all&amp;page=108"><a>«</a></li>
              <li v-for="index,keys in biao">
                <a :href="'/?tab=' + tab + '&amp;page=' + index" @click="pageJump(index)">{{index}}</a>
              </li>
              <li><a>...</a></li>
              <li><a href="/?tab=all&amp;page=108" class="pagination_last_a">»</a></li>
            </ul>
          </div>
      </div>
    </div>
  </div>
    <div class="home_you">
      <v-comment></v-comment>
      <div class="headerPin">友情社区</div>
      <div class="messageName">
        <img src="//o4j806krb.qnssl.com/public/images/ruby-china-20150529.png" alt="" style="width: 150px;">
        <img src="//o4j806krb.qnssl.com/public/images/golangtc-logo.png" alt="" style="width: 150px;">
        <img src="//o4j806krb.qnssl.com/public/images/phphub-logo.png" alt="" style="width: 150px;">
        <img src="//dn-cnode.qbox.me/FjLUc7IJ2--DqS706etPQ1EGajxK" alt="" style="width: 150px;">
      </div>
      <div class="headerPin">
        客户端二维码
      </div>
      <div class="erweima" style="text-align: center">
        <img width="200px" src="//dn-cnode.qbox.me/FtG0YVgQ6iginiLpf9W4_ShjiLfU" alt="">
        <br><span><a href="" style="font-size: 15px; color:#778087;" class="aCom">客户端源码测试</a></span>
      </div>
    </div>
  </div>
</template>

<script>
import comment from './comment/left'
import axios from 'axios'
export default {
  components: {
    'vComment': comment
  },
  data () {
    return {
      dataList: [],
      userCon: [],
      tab: '',
      iPage: 1,
      limit: 40,
      biao: [1, 2, 3, 4, 5]
    }
  },
  watch: {
    $route () {
      var tab = this.$route.query.tab
      axios.get('https://cnodejs.org/api/v1/topics?tab=' + tab + '&page=' + this.iPage + '&limit=' + this.limit + '&mdrender=true')
        .then((response) => {
          this.dataList = response.data.data
        })
      this.pageJump()
    }
  },
  methods: {
    pageJump (index) {
      if (index > 3) {
        this.biao = [index - 2, index - 1, index, index + 1, index + 2]
      } else {
        this.biao = [1, 2, 3, 4, 5]
      }
    }
  },
  created () {
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab
      this.iPage = this.$route.query.page
    } else {
      this.tab = 'all'
    }
    if (!this.$route.query.page || Number(this.$route.query.page) < 3) {
      this.biao = [1, 2, 3, 4, 5]
    } else {
      this.biao = [this.$route.query.page - 2, this.$route.query.page - 1, this.$route.query.page, Number(this.$route.query.page) + 1, Number(this.$route.query.page) + 2]
    }
    axios.get('https://cnodejs.org/api/v1/topics?tab=' + this.tab + '&page=' + this.iPage + '&limit=' + this.limit + '&mdrender=true')
      .then((response) => {
        this.dataList = response.data.data
      })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .nobodyreplay{
    background-color: white;
  }
  .nobodyreplay>div:nth-of-type(1){
    margin-top: 15px;
  }
  .nobodyreplay>div:nth-of-type(2){
    padding: 10px;
    margin-bottom: 15px;
  }
.nobodyreplay a{
  display: inline-block;
  margin-bottom: 10px;
  color: #778087;
  font-size: 15px;
}
.nobodyreplay a:hover{
  background-color: #f5f5f5;
}
  .erweima{
    padding: 10px;
    background-color: white;
  }
  .erweima img{
    width: 200px;
  }
</style>
