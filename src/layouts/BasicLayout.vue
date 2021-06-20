<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-show="navLayout === 'left'"
        :theme="navTheme"
        collapsible
        v-model="collapsed"
        width="256"
        :style="{
          height: '100vh',
          position: 'fixed',
          left: 0,
          boxShadow: 'rgba(0, 21, 41, 0.08) 3px 0px 4px 0px',
          zIndex: 9999999,
        }"
        :trigger="null"
        breakpoint="lg"
      >
        <!-- :collapsedWidth="0" -->

        <div
          class="logo"
          :style="{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            backgroundColor: navTheme === 'light' ? '#fff' : '#002140',
            boxShadow: navTheme === 'light' ? 'rgb(232, 232, 232) 1px 1px 0px 0px' : '',
          }"
        >
          <Iconfont type="icon-yiqingfenxi" />
          <div v-show="!collapsed" style="margin-left: 10px">疫情动态</div>
        </div>
        <SiderMenu :theme="navTheme" :collapsed="collapsed" />
      </a-layout-sider>

      <a-layout>
        <a-layout-header
          :style="{
            background: '#fff',
            padding: 0,
            marginLeft: collapsed ? '80px' : '256px',
            width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)',
            'z-index': '999',
            transition: 'all .2s',
            boxShadow: 'rgba(0, 21, 41, 0.08) 0px 1px 4px 0px',
          }"
        >
          <a-icon
            v-show="navLayout === 'left'"
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          />
          <Header v-show="navLayout === 'left'" />
          <SiderMenu :theme="navTheme" v-show="navLayout === 'top'" />
        </a-layout-header>

        <a-layout-content
          :style="{
            marginLeft: collapsed ? '80px' : '256px',
            width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)',
            overflow: 'hidden',
            transition: 'all .2s',
            'background-color': '#f1f2f6',
          }"
        >
          <router-view></router-view>
        </a-layout-content>

        <a-layout-footer
          :style="{
            background: '#fff',
            'text-align': 'center',
            marginLeft: collapsed ? '80px' : '256px',
            transition: 'all .2s',
            width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)',
            boxShadow: 'rgba(0, 21, 41, 0.08) 0px -1px 4px 0px',
            zIndex: 999,
          }"
        >
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
import SiderMenu from './SiderMenu.vue';
import SettingDrawer from '../components/SettingDrawer';

export default {
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark';
    },
    navLayout() {
      return this.$route.query.navLayout || 'left';
    },
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer,
  },
};
</script>
<style lang="less" scoped>
.trigger {
  padding: 0 20px;
  height: 64px;
  line-height: 64px;
  font-size: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #eee;
  }
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
  .anticon {
    font-size: 30px;
  }
}
.nav-theme-dark {
  /deep/.logo {
    color: #fff;
  }
}
.ant-layout-content {
  min-width: 1000px;
}
</style>
