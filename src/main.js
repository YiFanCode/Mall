import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/imgs/loading-svg/loading-bars.svg',
  attempt: 1,
})
// import env from './env'

// 全局过滤器
Vue.filter('currency',(val) => {
      if(!val){
          return '0.00'
      }
      return ` ¥${val.toFixed(2)}元`
})

// 根据前端跨域方式做调整
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL

// 接口错误拦截
axios.interceptors.response.use((response) => {
  let res = response.data
  if (res.status === 0) {
    return res.data
  } else if (res.status === 10) {
    window.location.href = '/#/login'
  } else {
    alert(res.msg)
  }
})


import App from './App.vue'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
