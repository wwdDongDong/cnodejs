<template>
  <div class="all">
    <div v-for="(item,keys) in dataList" class="all_list">
      <div class="all_list_left">
        <a href="" class="all_list_a_img"><img :src='item.author.avatar_url' alt="" class="all_list_img"></a>
        <span class="all_list_number"><span>{{item.reply_count}}</span><span> / </span><span>{{item.visit_count}}</span></span>
        <span v-if="item.top" class="all_list_box">置顶</span>
        <span v-else-if="item.good" class="all_list_box">精华</span>
        <span v-else-if="item.tab==='ask'" class="all_list_qa">问答</span>
        <span v-else="item.tab==='share'" class="all_list_qa">分享</span>
        <span><router-link :to="'strictpags/' + item.id" class="all_list_a">{{item.title}}</router-link></span>
      </div>
      <div class="all_list_right">
        <a href=""><img :src="item.author.avatar_url" alt="" class="all_list_right_img"></a>
        <span class="all_list_time">{{ item.last_reply_at | time }}</span>
      </div>
    </div>
    <div class="pagination" current_page="1">
      <ul>
        <li class="disabled"><a>«</a></li>
        <li class="disabled active"><a>1</a></li>
        <li><a href="/?tab=all&amp;page=2">2</a></li>
        <li><a href="/?tab=all&amp;page=3">3</a></li>
        <li><a href="/?tab=all&amp;page=4">4</a></li>
        <li><a href="/?tab=all&amp;page=5">5</a></li>
        <li><a>...</a></li>
        <li><a href="/?tab=all&amp;page=108" class="pagination_last_a">»</a></li>
      </ul>
    </div>
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
      axios.get('https://cnodejs.org/api/v1/topics?tab=share&page=' + this.iPage + '&limit=' + this.limit + '&mdrender=true')
        .then((response) => {
          this.dataList = response.data.data
        })
    }
  }
</script>
<style>

</style>
