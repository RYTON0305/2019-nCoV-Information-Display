<template>
  <div
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
    v-infinite-scroll="loadMore"
    infinite-scroll-immediate-check="false"
    style="height:calc(100vh - 68.8px - 64px);overflow-y:auto;padding:0 16px"
  >
    <a-input-search
      class="news-input"
      placeholder="输入省份或直辖市名称，如：湖北省、北京市。"
      @search="onSearch"
      size="large"
      enterButton="搜索新闻"
    >
      <!-- <a-button slot="enterButton">搜索新闻</a-button> -->
    </a-input-search>

    <a-timeline v-if="newsList.list[0]" :pending="true" mode="alternate">
      <a-timeline-item
        v-for="(item, index) in newsList.list"
        :key="item.summary"
      >
        <a-icon
          v-if="index === 0"
          slot="dot"
          type="clock-circle-o"
          style="font-size: 16px;"
        />
        <a-card style="width: 500px;">
          <template slot="title">
            <a-tooltip arrowPointAtCenter placement="top" :title="item.title">
              <span class="news-title">
                <Iconfont
                  class="newTag"
                  v-if="index === 0"
                  type="icon-zuixin"
                />
                {{ item.title }}
              </span>
            </a-tooltip>
          </template>
          <p>{{ item.summary }}</p>
          <!-- <div class="infoSource">
          <span>信息来源：{{ item.infoSource }}</span>
        </div> -->
          <a-card-meta class="infoSource">
            <!-- <template slot="title"> 信息来源：{{ item.infoSource }} </template> -->

            <template slot="description">
              <div>信息来源：{{ item.infoSource }}</div>
              <div>{{ item.pubDate | dateformat }}</div>
            </template>
          </a-card-meta>
        </a-card>
      </a-timeline-item>
      <div class="loadmore">
        <div class="loadmore-text">继续滑动以加载更多</div>
        <a-icon class="loadmore-icon" type="down-circle" />
      </div>
    </a-timeline>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'News',
  data() {
    return {
      busy: false,
      province: '',
    }
  },
  mounted() {
    this.getNewsAsync()
  },
  computed: {
    ...mapState(['newsList']),
  },
  methods: {
    ...mapActions(['getNewsAsync']),
    async loadMore() {
      console.log('loadmore')
      this.busy = true
      await this.getNewsAsync()
      this.busy = false
    },
    async onSearch(province) {
      if (province) {
        await this.getNewsAsync({ num: 10, province })
      }
      await this.getNewsAsync({ num: 10, province })
      if (this.newsList.list.length !== 0) {
        if (province) this.$message.success(`成功搜索到${province}的相关新闻`)
        this.province = province
      } else {
        this.$message.error('请输入正确的省份或直辖市名称')
      }
    },
  },
}
</script>
<style lang="less" scoped>
.ant-timeline {
  padding-top: 20px;
  // &:nth-child(2n) .infoSource {
  //   text-align: right;
  // }
}
.ant-card {
  display: inline-block;
}
.newTag {
  font-size: 25px;
  vertical-align: text-bottom;
  color: red;
}
.news-title {
  font-size: 20px;
  font-weight: 700;
}
.ant-timeline {
  overflow-x: hidden;
}
.ant-timeline-item-left {
  .infoSource {
    text-align: right;
  }
}
.ant-timeline-item-right {
  .infoSource {
    text-align: left;
  }
}
.loadmore {
  text-align: center;
  padding: 20px;
  .loadmore-text {
    margin-bottom: 10px;
  }
  .loadmore-icon {
    font-size: 20px;
  }
}
.news-input {
  width: 40%;
  margin: 20px auto;
  display: block;
}
</style>
