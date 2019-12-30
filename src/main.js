import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import 'common/stylus/index.styl'
import './register.js' // 运行模块中的全局代码, 但实际上不导入任何值。

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
