import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Authorized from './components/Authorized'
import Auth from './directives/auth'
import axios from 'axios'
Vue.prototype.axios = axios
// Echarts
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

// 注册组件后即可使用
Vue.component('v-chart', ECharts)
//Echarts

import {
  Button,
  Input,
  TimePicker,
  LocaleProvider,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Spin,
  Carousel,
  Table,
  Card,
  Row,
  Col,
  Statistic,
  Tooltip,
  Timeline,
  message,
  Tabs,
  List,
  Avatar,
  Collapse,
} from 'ant-design-vue'
Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Input)
Vue.use(TimePicker)
Vue.use(LocaleProvider)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(Spin)
Vue.use(Carousel)
Vue.use(Table)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Statistic)
Vue.use(Tooltip)
Vue.use(Timeline)
Vue.use(Tabs)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Collapse)

Vue.prototype.$message = message
import moment from 'moment'

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (dataStr) {
    return moment(parseInt(dataStr)).format(pattern)
  } else return
})
// iconfont
const Iconfont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1679779_o9zdpu7t5.js',
})
Vue.component('Iconfont', Iconfont)

// swiper
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(vueSwiper)

// vue-infinite-scroll
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.component('Authorized', Authorized)
Vue.use(Auth)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
