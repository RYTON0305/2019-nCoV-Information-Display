<template>
  <div
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
    v-infinite-scroll="loadMore"
    infinite-scroll-immediate-check="false"
    style="height: calc(100vh - 64px - 68.8px - 40px); overflow-y: auto"
  >
    <a-list
      v-if="trustList[0]"
      bordered=""
      itemLayout="vertical"
      size="large"
      :dataSource="trustList"
    >
      <!-- <div
        v-if="loadingMore"
        slot="loadMore"
        :style="{
          textAlign: 'center',
          marginTop: '12px',
          height: '32px',
          lineHeight: '32px',
        }"
      >
        <a-spin v-if="loadingMore" /> -->
      <!-- <a-button v-else @click="onLoadMore">loading more</a-button> -->
      <!-- </div> -->
      <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->
      <a-list-item slot="renderItem" slot-scope="item" key="item._id">
        <a-list-item-meta>
          <span class="list-title" slot="title">
            {{ item.title }}
          </span>
          <!-- <a-avatar slot="avatar" :src="item.avatar" /> -->
        </a-list-item-meta>
        <a-collapse :bordered="false">
          <template v-slot:expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel :style="customStyle" :header="item.mainSummary">
            <div>{{ item.body }}</div>
          </a-collapse-panel>
        </a-collapse>
        <img slot="extra" width="100" alt="logo" :src="rumorInfo.listImg" />
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import { getRumors } from '../../api/request';

export default {
  props: {
    rumorInfo: {
      type: Object,
      default: () => ({
        rumorType: 1,
        listImg: '/trusted.png',
      }),
    },
  },
  data() {
    return {
      busy: true,
      trustList: [],
      customStyle: 'background: #f7f7f7;border-radius: 4px;border: 0;overflow: hidden',
      loadingMore: false,
      showLoadingMore: true,
      num: 10,
      loaded: false,
    };
  },
  computed: {},
  async mounted() {
    this.trustList = await getRumors({
      rumorType: this.rumorInfo.rumorType,
      num: this.num,
    });
  },
  methods: {
    async loadMore() {
      if (this.loaded) return;
      this.num += 10;
      this.busy = true;
      this.trustList = await getRumors({ rumorType: 1, num: this.num });
      this.loaded = Object.keys(this.trustList).length != this.trustList;
      this.busy = false;
    },
    onLoadMore() {
      this.trustList = this.trustList.concat(this.trustList);

      // this.getData(res => {
      //   this.data = this.data.concat(res.results);
      //   this.loadingMore = false;
      //   this.$nextTick(() => {
      //     window.dispatchEvent(new Event('resize'));
      //   });
      // });
    },
  },
};
</script>
<style lang="less" scoped>
.ant-list {
  padding: 50px 100px;
  border: 0;
}

.list-title {
  font-weight: 700;
  font-size: 25px;
}
.ant-list-item {
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 24px 7px;
  }
}
// /deep/.ant-list-item-extra-wrap {
//   background-color: #fff;
// }
// .ant-collapse .ant-collapse-item .ant-collapse-header .anticon {
//   left: initial;
//   right: 16px;
// }
</style>
