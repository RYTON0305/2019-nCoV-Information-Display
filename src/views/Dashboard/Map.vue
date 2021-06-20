<template>
  <div class="container">
    <a-radio-group
      @change="handleMapType"
      name="mapTypeGroup"
      defaultValue="currentConfirmedCount"
      buttonStyle="solid"
    >
      <a-radio-button value="currentConfirmedCount">现存确诊</a-radio-button>
      <a-radio-button value="confirmedCount">累计确诊</a-radio-button>
    </a-radio-group>
    <MapChart :mapType="mapType" />
  </div>
</template>

<script>
import MapChart from './MapChart.vue';

export default {
  name: '',
  data() {
    return {
      mapType: 'currentConfirmedCount',
    };
  },
  components: {
    MapChart,
  },
  methods: {
    handleMapType(e) {
      this.mapType = e.target.value;
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 16px;
  overflow: hidden;
}
// /deep/ .ant-btn-group {
//   position: absolute;
//   top: 0px;
//   right: 50%;
//   transform: translate(50%, 0);
//   z-index: 9999;
// }
.ant-radio-group {
  margin: 10px;
}
</style>
