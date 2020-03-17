<template>
  <a-table
    :rowKey="
      record => {
        return record.locationId == 0 && record.locationId == -1
          ? record.locationId
          : Math.random()
      }
    "
    :columns="columns"
    :dataSource="tableData"
    :loading="!tableData[0]"
    :pagination="false"
    childrenColumnName="cities"
    :scroll="{ y: 'calc(100vh - 53px - 53px - 68.8px - 64px)' }"
  />
</template>
<script>
import { cloneDeep } from 'lodash'
import { mapState, mapActions } from 'vuex'
let timer

export default {
  name: 'Table',
  data() {
    return {
      tableData: [],
      screenHeight: document.documentElement.clientHeight, // 屏幕高度
      // screenWidth: document.body.clientWidth, // 这里是给到了一个默认值 （这个很重要）
      // scrollBarWidth: 0,
    }
  },
  mounted() {
    // this.scrollBarWidth =
    //   window.innerWidth - document.body.clientWidth ||
    //   document.documentElement.clientWidth

    window.onresize = () => {
      // console.log('不使用防抖宽高', this.screenWidth, this.screenHeight)
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        this.screenHeight = document.documentElement.clientHeight // 窗口高度
        // this.screenWidth = document.documentElement.clientHeight // 窗口宽度

        // console.log(this.screenWidth, this.screenHeight)
      }, 200)
    }
  },
  computed: {
    // tableWidth() {
    //   return this.screenWidth - 256 - 16 * 2 - this.scrollBarWidth - 16 * 2 - 1
    // },
    tableHeight() {
      return this.screenHeight - 64 - 52.8 * 2 - 68.8
    }, // 屏幕高
    ...mapState(['areaData']),
    columns() {
      const columns = [
        {
          title: '全国疫情数据',
          children: [
            {
              title: '地区',
              dataIndex: 'areaName',
              align: 'center',
              width: '20%',
            },
            {
              title: '现存确诊',
              dataIndex: 'currentConfirmedCount',
              align: 'center',
              // sorter: (a, b) => {
              //   return a.currentConfirmedCount - b.currentConfirmedCount
              // },
              // sortDirections: ['ascend', 'descend'],
              width: '20%',
              // defaultSortOrder: 'descend',
            },
            {
              title: '累计确诊',
              dataIndex: 'confirmedCount',
              width: '20%',
              align: 'center',
            },
            {
              title: '死亡',
              dataIndex: 'deadCount',
              align: 'center',
              width: '20%',
            },
            {
              title: '治愈',
              dataIndex: 'curedCount',
              align: 'center',
              width: '20%',
            },
          ],
        },
      ]
      return columns
    },
  },
  async created() {
    if (!this.areaData[0]) {
      await this.getAreaDataAsync()
    }
    this.formatArea()
    // this.tableData = this.areaData
  },
  methods: {
    ...mapActions(['getAreaDataAsync']),
    formatArea() {
      let tableData = cloneDeep(this.areaData)
      this.tableData = JSON.parse(
        JSON.stringify(tableData).replace(
          /provinceShortName|cityName/g,
          'areaName'
        )
      ).sort((a, b) => b.currentConfirmedCount - a.currentConfirmedCount)
    },
    debounce(fn, delay) {
      let timeout = null
      if (timeout !== null) clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.call(this, arguments)
      }, delay)
    },
  },
}
</script>
<style lang="less" scoped>
/deep/th:nth-of-type(1) {
  background-color: #e3e7f3;
}
/deep/th:nth-of-type(2) {
  background-color: #f3baaf;
}
/deep/th:nth-of-type(3) {
  background-color: #e69a8d;
}
/deep/th:nth-of-type(4) {
  background-color: #b4c0d6;
}
/deep/th:nth-of-type(5) {
  background-color: #95dc9a;
}
// /deep/.ant-spin-nested-loading {
//   height: 400px !important;
// }
/deep/ thead > tr:nth-child(1) th {
  background-color: #4169e2;
  color: #fff;
}
selector::-webkit-scrollbar {
  width: 0;
}
</style>
