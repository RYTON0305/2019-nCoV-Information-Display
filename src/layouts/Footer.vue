<template>
  <div>
    @ 数据来自
    <a
      style="padding-right: 10px; font-weight: 700"
      href="https://github.com/BlankerL/DXY-COVID-19-Crawler"
      target="_blank"
      >DXY-COVID-19-Crawler</a
    >

    <span v-if="this.$store.state.updateTime">
      <span style="padding-right: 10px">|</span>本页数据更新时间
      <span style="color: #1890ff">{{ $store.state.updateTime | dateformat }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped></style>
