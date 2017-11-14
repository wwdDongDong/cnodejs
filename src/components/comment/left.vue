<template>
  <div>
  <div class="headerPin">个人信息</div>
  <div class="messageName">
    <router-link :to="'/unitMessage/' + message.name" tag="div">
      <img align="center" :src="message.url" alt="">
      <span class="xingming">{{ message.name }}</span>
    </router-link>
    <div class="progress">
      积分 <span v-show="score">{{ score }}</span><span v-show="message.score">{{ message.score }}</span>
    </div>
    <div>
      <em style="font-size: 13px">"这家伙很懒，什么个性签名都没有留下"</em>
    </div>
  </div>
  <div class="zhuti">
    <router-link to="/theme" tag="button">发布主题</router-link>
  </div>
  <div class="nobodyreplay">
    <div class="headerPin">
      无人回复的话题
    </div>
    <div class="nobodyreplay_second">
      <a class="aCom" href="/topic/59e5a09320a1a3647d72acea" title="[koa2]分片上传为什么前台progress事件中的loaded和total一直是2">[koa2]分片上传为什么前台progress事件中的loaded和total一直是2</a>
      <a class="aCom" href="/topic/59e5707b61932717683d23fe" title="Express发送json数据不完整">Express发送json数据不完整</a>
      <a class="aCom" href="/topic/59e3873520a1a3647d72ac39" title="mocha 总结文档">mocha 总结文档</a>
      <a class="aCom" href="/topic/59e31567eab6a65368740142" title="关于process.argv[2]   debug模式和直接运行js文件所得到的值不一致的问题 。">关于process.argv[2]   debug模式和直接运行js文件所得到的值不一致的问题 。</a>
      <a class="aCom" href="/topic/59e1f049eab6a65368740116" title="Cool-Node 中文文档发布，你想要的接地气都在这儿！！！">Cool-Node 中文文档发布，你想要的接地气都在这儿！！！</a>
    </div>
  </div>
</div>
</template>
<script>
 import axios from 'axios'
export default{
   props: {
     message: {
       type: Object,
       default: function () {
         return {
           url: 'https://avatars1.githubusercontent.com/u/30905492?v=4&s=120',
           name: 'wwdDongDong',
           score: ''
         }
       }
     }
   },
   data () {
     return {
       data: '',
       score: ''
     }
   },
   created () {
     axios.get('https://cnodejs.org/api/v1/user/' + this.message.name).then((response) => {
       this.score = response.data.data.score
       console.log(this.score)
     })
   }
}
</script>
<style>

</style>
