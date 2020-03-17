<template>
  <div class="container">
    <v-chart autoresize v-if="areaData[0]" :options="option" />
    <a-spin size="large" v-else tip="加载中" />
  </div>
</template>

<script>
import 'echarts/map/js/china.js'
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    mapType: {
      type: String,
      default: 'currentConfirmedCount',
    },
  },
  data() {
    return {
      option: {
        backgroundColor: '#f1f2f6',
        title: {
          text: `疫情地图`,
          subtext: '确诊病例数（排除死亡、治愈）',
          link: 'https://ncov.dxy.cn/ncovh5/view/pneumonia',
        },
        series: [
          {
            data: [],
            name: '现存确诊：',
            type: 'map',
            map: 'china',
            label: {
              show: true,
              fontSize: 10,
              color: '#000000',
            },
            zoom: 1.2,
            itemStyle: {
              areaColor: '#fff',
            },
            emphasis: {
              // 控制鼠标滑过之后的背景色和字体颜色
              label: {
                // color: '#fff',
                fontSize: 12,
              },
              itemStyle: {
                areaColor: '#fddd32',
              },
            },
          },
        ],
        visualMap: [
          {
            type: 'piecewise',
            show: true,
            // splitNumber:4
            pieces: [
              // 分段
              { min: 10000 },
              { min: 1000, max: 10000 },
              { min: 500, max: 999 },
              { min: 100, max: 499 },
              { min: 10, max: 99 },
              { min: 1, max: 9 },
              { value: 0 },
            ],
            // align:'right',// 默认left
            // orient:'horizontal' 默认竖直
            // left right 这些属性控制 分段坐在的位置
            // showLabel:false
            // textStyle:{}
            inRange: {
              symbol: 'rect',
              color: [
                '#fff',
                '#fcebcf',
                '#f59e83',
                '#e45a4f',
                '#cb2a2e',
                '#811c24',
                '#4f060d',
              ],
            },
            itemWidth: 10,
            itemHeight: 10,
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: '<div>{b}</div>{a}{c}',
          textStyle: {
            align: 'center',
          },
        },
      },
    }
  },
  computed: {
    ...mapState(['areaData']),
  },
  watch: {
    mapType(newVal) {
      // console.log('change')
      this.formatMapData()
      this.option.series[0].name =
        newVal === 'confirmedCount' ? '累计确诊：' : '现存确诊：'
    },
  },
  mounted() {},
  async created() {
    await this.getAreaDataAsync()
    this.formatMapData()
  },
  methods: {
    ...mapActions(['getAreaDataAsync']),
    formatMapData() {
      let formatMapData = JSON.parse(JSON.stringify(this.areaData)).map(
        item => ({
          name: item['provinceShortName'],
          value: item[`${this.mapType}`],
        })
      )
      formatMapData.push({
        name: '南海诸岛',
        value: 0,
      })
      this.option.series[0].data = formatMapData
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.echarts {
  width: 100%;
  height: 100%;
  min-width: 500px;
  min-height: 500px;
}
.container {
  width: 100%;
  height: 100%;
}
</style>
