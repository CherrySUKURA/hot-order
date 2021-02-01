import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import {deepClone,switchTimeFormat} from './common/common.js'


Vue.prototype.$deepClone = deepClone
Vue.prototype.$switchTimeFormat = switchTimeFormat
// Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	deepClone,
    ...App
})
app.$mount()
export default app
