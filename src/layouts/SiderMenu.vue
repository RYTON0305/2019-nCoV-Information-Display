<template>
  <div>
    <!-- style="width: 256px" -->
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      :mode="$route.query.navLayout | handleNavLayoutType"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="
            () =>
              $router.push({ path: item.path, query: $route.query }).catch((err) => {
                err;
              })
          "
        >
          <a-icon v-if="item.meta" :type="item.meta.icon" />
          <span v-if="item.meta">{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/*
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from './SubMenu';
import { check } from '../utils/auth';

export default {
  props: {
    theme: {
      type: String,
      default: 'dark',
    },
    collapsed: {
      type: Boolean,
      // default: false,
    },
  },
  components: {
    'sub-menu': SubMenu,
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    // console.log(menuData)
    return {
      list: [],
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
    };
  },
  mounted() {
    // console.log(this.$route.query.navLayout)
  },
  filters: {
    handleNavLayoutType: (value) => {
      switch (value) {
        case 'top':
          return 'horizontal';
        case 'left':
          return 'inline';
        default:
          return 'inline';
      }
    },
  },
  watch: {
    '$route.path': function (val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
    collapsed(newVal) {
      if (newVal) {
        this.openKeys = [];
      } else {
        this.openKeys = this.openKeysMap[this.$route.path];
      }
    },
  },
  methods: {
    // toggleCollapsed() {
    //   this.collapsed = !this.collapsed
    // },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (const item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [...parentKeys, item.path]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path,
            );
          }
          menuData.push(newItem);
          // console.log(menuData)
        } else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
          menuData.push(...this.getMenuData(item.children));
          // console.log(menuData)
        }
      }
      return menuData;
    },
  },
};
</script>
