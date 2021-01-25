import Vue, { DirectiveOptions } from 'vue';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/base.scss";
import './other/vantComponents' // 引入mintui组件
import '../src/mixins/commonMixins.ts'
import {directives, filters} from '@/utils/directive&filter';
Vue.config.productionTip = false;
// 注册全局指令
Object.keys(directives).forEach((key: string) => {
  Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key]);
});

// 注册全局过滤器
Object.keys(filters).forEach((key: string) => {
  Vue.filter(key, (filters as { [key: string ]: Function })[key]);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
