import axios from 'axios';
// 079855e0232e4571b6758385bd2fc86f
// const token = '77777'
// axios.defaults.headers.common['token'] = token
export const getAreaData = async () => {
  // let res = await this.axios.get('/apis/ithil_j/activity/movie_annual2017')
  // let res = await axios({
  //   method: 'get',
  //   // url: '/mapData.json',
  //   url: '/api/getPneumonia',
  //   headers: { token: '079855e0232e4571b6758385bd2fc86f' },
  // })
  // let res = await axios('/mapData.json')

  // if (res.data.msg !== 'ok') {
  //   return console.log(res.data.msg)
  // }
  // let { listData } = res.data.data

  const res = await axios.get('/api/area');
  // let res = await axios.get('/mapData1.json')
  const areaData = res.data.results.filter((item) => item.countryName === '中国');

  return areaData;

  // this.option.series[1].data = this.confirmedData
};
// https: lab.isaaclin.cn/nCoV/api/overall
export const getOverallData = async () => {
  const res = await axios.get('/api/overall');
  // let res = await axios.get('/overall.json')
  if (!res.data.success) return;
  const overallData = res.data.results[0];
  return overallData;
};
export const getNews = async ({ province = '', num = 10 }) => {
  // let res = await axios.get('https://lab.isaaclin.cn/nCoV/api/overall')
  const res = await axios.get('/api/news', {
    params: {
      province,
      num,
    },
  });
  if (!res.data.success) return;
  const newsList = res.data.results;
  return newsList;
};
export const getRumors = async ({ rumorType = 0, num = 10 }) => {
  // export const getRumors = async () => {
  const res = await axios.get('/api/rumors', {
    params: {
      rumorType,
      num,
    },
  });
  // let res = await axios.get('/rumors.json')
  if (!res.data.success) return;
  const rumorList = res.data.results;
  return rumorList;
};
