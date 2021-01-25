// 作为Actions的所有子模块挂载实例的根目录
// const {get， getAsync， post， postAsync} = request；
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
// @ts-ignore vuex的持久化管理 根据模块和指定需要存储的进行存储
const vuexPersisted = new createPersistedState({
  key: "vuexPersistedData",
  storage: window.localStorage,
  reducer: state => ({
    Home: {
      name: state.Home.name,
      login: state.Home.login
    }
  })
});
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [vuexPersisted]
});
