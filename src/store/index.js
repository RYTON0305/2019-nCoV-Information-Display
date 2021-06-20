import Vue from 'vue';
import Vuex from 'vuex';
import { getAreaData, getOverallData, getNews, getRumors } from '../api/request';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    areaData: [],
    overallData: [],
    updateTime: '',
    newsList: {
      num: 0,
      list: [],
    },
    rumorList: {
      num: 0,
      list: [],
    },
    grayMode: window.localStorage.getItem('grayMode') === 'true' || false,
  },
  mutations: {
    getAreaData(state, item) {
      state.areaData = item;
      state.updateTime = item[0].updateTime;
    },
    getOverallData(state, item) {
      state.overallData = item;
      state.updateTime = item.updateTime;
    },
    getNews(state, item) {
      state.newsList.list = item;
      state.updateTime = item[0].pubDate;
    },
    getRumors(state, item) {
      state.rumorList.list = item;
      state.updateTime = item.updateTime;
    },
    handleGrayMode(state, checked) {
      state.grayMode = checked;
      window.localStorage.setItem('grayMode', state.grayMode);
    },
  },
  actions: {
    async getAreaDataAsync(context) {
      const areaData = await getAreaData();
      context.commit('getAreaData', areaData);
    },
    async getOverallDataAsync(context) {
      const overallData = await getOverallData();
      context.commit('getOverallData', overallData);
    },
    async getNewsAsync({ state, commit }, payload) {
      state.newsList.num += 10;
      if (!payload) {
        payload = {};
      } else if (payload.num) {
        state.newsList.num = payload.num;
      }
      console.log('getNewsAsync -> payload', payload);
      const newsList = await getNews({
        num: state.newsList.num,
        province: payload.province,
      });
      if (newsList.length === 0) {
        state.newsList.num = 10;
      }
      commit('getNews', newsList);
    },
    async getRumorsAsync({ state, commit }, payload) {
      state.rumorList.num += 10;
      if (!payload) {
        payload = {};
      } else if (payload.num) {
        state.rumorList.num = payload.num;
      }
      const rumorList = await getRumors({
        num: state.rumorList.num,
        rumorType: payload.rumorType,
      });
      console.log(rumorList);
      if (rumorList.length === 0) {
        state.rumorList.num = 10;
      }
      commit('getRumors', rumorList);
    },
  },
  modules: {},
});
