<template>
  <a-card
    v-if="cardList[0]"
    class="container"
    :title="`截至 ${updateTime} 全国数据统计`"
  >
    <a-row :gutter="16">
      <a-col v-for="(item, index) in 6" :key="index" :span="8">
        <a-card-grid>
          <!-- <div class="incr">较昨日+1665</div> -->
          <div class="quantity">
            <a-statistic
              groupSeparator=""
              :value="cardList[index].data"
              :class="`color${index}`"
              :valueStyle="{ 'font-weight': 800, 'font-size': '40px' }"
            >
              <template v-slot:title>
                <span class="defaultFontColor">较昨日</span>
                <span class="incr">{{ cardList[index].incr }}</span>

                <a-tooltip placement="top">
                  <template slot="title">
                    <span>
                      疑似数据「较昨日」直接使用国家卫健委公布的「新增疑似」
                    </span>
                  </template>
                  <a-icon
                    v-if="index === 1"
                    style="
                      color: red;
                      padding:0 10px
                    "
                    type="question-circle"
                  />
                </a-tooltip>
              </template>
            </a-statistic>
          </div>
          <div class="dataTitle">{{ cardList[index].title }}</div>
        </a-card-grid>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import formatTime from '../../utils/formatTime'
export default {
  name: '',
  data() {
    return {
      updateTime: '',
      cardList: [],
    }
  },
  async mounted() {
    await this.getOverallDataAsync()
    this.updateTime = formatTime(this.overallData.updateTime)
    // this.cardList = {
    //   现存确诊: this.overallData.currentConfirmedCount,
    //   境外输入: this.overallData.suspectedCount,
    //   现存重症: this.overallData.seriousCount,
    //   累计确诊: this.overallData.confirmedCount,
    //   累计死亡: this.overallData.deadCount,
    //   累计治愈: this.overallData.curedCount,
    // }
    this.cardList = [
      {
        title: '现存确诊',
        data: this.overallData.currentConfirmedCount,
        incr:
          this.overallData.currentConfirmedIncr > 0
            ? `+${this.overallData.currentConfirmedIncr}`
            : this.overallData.currentConfirmedIncr,
      },
      {
        title: '境外输入',
        data: this.overallData.suspectedCount,
        incr:
          this.overallData.confirmedIncr > 0
            ? `+${this.overallData.confirmedIncr}`
            : this.overallData.confirmedIncr,
      },
      {
        title: '现存重症',
        data: this.overallData.seriousCount,
        incr:
          this.overallData.suspectedIncr > 0
            ? `+${this.overallData.suspectedIncr}`
            : this.overallData.suspectedIncr,
      },
      {
        title: '累计确诊',
        data: this.overallData.confirmedCount,
        incr:
          this.overallData.curedIncr > 0
            ? `+${this.overallData.curedIncr}`
            : this.overallData.curedIncr,
      },
      {
        title: '累计死亡',
        data: this.overallData.deadCount,
        incr:
          this.overallData.deadIncr > 0
            ? `+${this.overallData.deadIncr}`
            : this.overallData.deadIncr,
      },
      {
        title: '累计治愈',
        data: this.overallData.curedCount,
        incr:
          this.overallData.seriousIncr > 0
            ? `+${this.overallData.seriousIncr}`
            : this.overallData.seriousIncr,
      },
    ]
  },

  computed: {
    ...mapState(['overallData']),
  },
  methods: {
    ...mapActions(['getOverallDataAsync']),
  },
}
</script>
<style lang="less" scoped>
/deep/ .ant-card-grid {
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 235px;
  max-height: 50vh;
}
.container {
  height: 100%;
  min-width: 500px;
}
.color0 {
  color: #f74c31;
}
.color1 {
  color: #f78207;
}
.color2 {
  color: #a25a4e;
}
.color3 {
  color: #ae212c;
}
.color4 {
  color: #5d7092;
}
.color5 {
  color: #28b7a3;
}
.incr {
  font-weight: 900;
}
.defaultFontColor {
  color: #000000;
}
.dataTitle {
  font-weight: 900;
  font-size: 20px;
}
</style>
