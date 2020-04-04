<template>
  <a-locale-provider :locale="locale">
    <router-view />
  </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      locale: zhCN,
    }
  },
  computed: {
    ...mapState(['grayMode']),
  },
  watch: {
    grayMode: {
      handler(newValue) {
        document.documentElement.style.filter = newValue
          ? 'grayscale(100%)'
          : 'grayscale(0)'
      },
      immediate: true,
    },
  },
}
</script>
<style lang="less"></style>
