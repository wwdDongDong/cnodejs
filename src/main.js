// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './scss/all'
import './font/iconfont.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.filter('time', function (value) {
  var nowTime = new Date()
  var beforeTime = new Date(value)
  var mixTim = nowTime.getTime() - beforeTime.getTime()
  var mixTime = new Date(mixTim)
  var year = mixTime.getFullYear() - 1970
  var month = mixTime.getMonth()
  var date = mixTime.getDate() - 1
  var hour = mixTime.getHours()
  var minute = mixTime.getMinutes()
  if (year !== 0) {
    return year + '年前'
  }
  if (month !== 0) {
    return month + 1 + '月前'
  }
  if (date !== 0) {
    return date + '天前'
  }
  if (hour !== 0) {
    return hour + '小时前'
  }
  if (minute !== 0) {
    return minute + '分钟前'
  }
})
let obj = 'https://cnodejs.org/api/v1'
export { obj }
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
