<template>
  <div class="header">
    {{ this.$route.meta.title }}
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
<style lang="less" scoped>
.header {
  float: right;
}
</style>
