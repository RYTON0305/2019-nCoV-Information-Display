<template>
  <a-list bordered="" itemLayout="vertical" size="large" :dataSource="trustList">
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
      <img slot="extra" width="100" alt="logo" src="/noconfirm.png" />
    </a-list-item>
  </a-list>
</template>
<script>
export default {
  data() {
    return {
      trustList: [],
      customStyle: 'background: #f7f7f7;border-radius: 4px;border: 0;overflow: hidden',
    };
  },
  mounted() {
    this.axios.get('/noconfirm.json').then((res) => {
      this.trustList = res.data.results;
    });
  },
};
</script>
<style lang="less" scoped>
.ant-list {
  padding: 50px 100px;
  background-color: #bbb;
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
