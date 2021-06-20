<template>
  <a-tabs :tabBarGutter="8" type="card" defaultActiveKey="1">
    <a-tab-pane style="background-color: #f5232e" key="1">
      <div class="tab-tab tab-tag-rumor" slot="tab"><Iconfont type="icon-jia1" />谣言</div>
      <swiper v-if="rumorList.list[0]" class="swiper" :options="swiperOption">
        <swiper-slide class="swiper-slide" v-for="(item, index) in rumorList.list" :key="item._id">
          <a-card :bordered="false" hoverable>
            <div class="rumor-header" slot="cover">
              <div class="rumor-tag">
                <span>{{ index + 1 }}</span>
              </div>
              <img src="/lt.png" alt="" />
              <img src="/rumor_text.png" alt="" />
              <img src="/lb.png" alt="" />
              <img src="/rumor.png" alt="" />
              <img src="/rb.png" alt="" />
              <div class="rumor-title">{{ item.title }}</div>
            </div>
            <a-card-meta>
              <template slot="title">
                <a-tooltip arrowPointAtCenter placement="top" :title="item.mainSummary">
                  <span class="rumor-summary">{{ item.mainSummary }}</span>
                </a-tooltip>
              </template>
              <template slot="description">
                <!-- <div style="height:30px"></div> -->
                <span class="rumor-body">{{ item.body }}</span>
              </template>
            </a-card-meta>
          </a-card>
        </swiper-slide>
        <swiper-slide style="background-color: #fff">
          <div style="text-align: center">
            <div style="padding: 20px 0; font-size: 30px">继续滑动以加载更多</div>
            <a-icon style="font-size: 50px" type="right-circle" />
          </div>
        </swiper-slide>
        <!-- 分页器 -->
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- 左右箭头 -->
        <!-- <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>
    </a-tab-pane>
    <a-tab-pane style="background-color: #43d75d" key="2">
      <div class="tab-tab tab-tag-true" slot="tab">
        <Iconfont style="font-size: 33px" type="icon-zhen" />
        可信消息
      </div>
      <Trusted
        :rumorInfo="{
          rumorType: 1,
          listImg: '/trusted.png',
        }"
      />
    </a-tab-pane>
    <a-tab-pane style="background-color: #bbb" key="3">
      <div class="tab-tab tab-tag-doubtful" slot="tab">
        <Iconfont style="font-size: 28px" type="icon-wenhao" />
        未确认消息
      </div>
      <Trusted
        :rumorInfo="{
          rumorType: 2,
          listImg: '/noconfirm.png',
        }"
      />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Trusted from './Trusted';
// import NoConfirm from './NoConfirm.vue'

export default {
  data() {
    return {
      swiperOption: {
        effect: 'coverflow',
        centeredSlides: true,
        spaceBetween: '25%',
        slidesPerView: 'auto',
        // loop: true,
        // autoplay: {
        //   disableOnInteraction: false,
        // },
        autoplay: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        //   loopedSlides: 2,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        },
        slideToClickedSlide: true,
        on: {
          reachEnd: () => {
            this.getRumorsAsync();
          },
        },
      },
    };
  },
  components: {
    Trusted,
    // NoConfirm,
  },
  mounted() {
    this.getRumorsAsync();
    console.log(this.rumorList);
  },
  computed: {
    ...mapState(['rumorList']),
  },
  methods: {
    ...mapActions(['getRumorsAsync']),
  },
};
</script>

<style lang="less" scoped>
.swiper {
  height: 100%;
  padding: 50px 0;
  // margin-top: 50px;
}
.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
}
/deep/.swiper-pagination-bullet-active {
  background-color: #fff;
}
/deep/.swiper-slide-active {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 24px 7px !important;
}

.ant-card {
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.rumor-header {
  height: 200px;
  background-color: #2834b9;
  position: relative;
  img:nth-of-type(1) {
    position: absolute;
    top: 28px;
    left: 15px;
    width: 56px;
  }
  img:nth-of-type(2) {
    position: absolute;
    left: 20px;
    top: 40px;
    width: 100px;
  }
  img:nth-of-type(3) {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 120px;
  }
  img:nth-of-type(4) {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 140px;
  }
  img:nth-of-type(5) {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 120px;
  }
}

.rumor-summary {
  color: #333;
  font-weight: 700;
  font-size: 22px;
}
.rumor-body {
  color: #666;
  font-size: 16px;
  // color: red;
}
.rumor-tag {
  height: 0;
  width: 0;
  border: 30px solid #f74c32;
  border-right: dashed 30px transparent;
  border-bottom: dashed 30px transparent;
  position: relative;
  z-index: 999;

  span {
    position: absolute;
    top: -25px;
    left: -18px;
    color: #fff;
    font-weight: 700;
    font-size: 18px;
  }
}

.rumor-title {
  color: #fff;
  font-size: 25px;
  width: 300px;
  font-weight: 700;
  position: absolute;
  left: 20px;
  top: 110px;
}

.ant-tabs {
  height: 100%;
  background-color: #fff;
}
.ant-tabs-tabpane {
  height: 100%;
}
/deep/.ant-tabs-content {
  height: calc(100% - 40px);
}
/deep/.ant-tabs-nav-wrap {
  background-color: #f0f2f5;
}
/deep/.ant-tabs-bar {
  margin-bottom: 0;
}
.ant-tabs-tab {
  .anticon {
    font-size: 30px;
    vertical-align: middle;
  }
}
.ant-tabs-tab div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // position: absolute;
  // bottom: 0;
}
// .ant-tabs-tab .icon-larger {
//   font-size: 33px;
// }
// .ant-tabs-tab .icon-smaller {
//   font-size: 33px;
// }
.tab-tab {
  padding: 0 16px;
  transition: background-color 0.3s;
}
/deep/.ant-tabs-tab {
  line-height: 40px !important;
  overflow: hidden;
  padding: 0 !important;
  background-color: #fff !important;
  border-left: 0 !important;
}
/deep/.ant-tabs-tab-active {
  font-weight: 700;
  & /deep/.tab-tag-rumor {
    background-color: #f5232e;
    color: #fff;
  }
  & /deep/.tab-tag-true {
    background-color: #43d75d;
    color: #fff;
  }
  & /deep/.tab-tag-doubtful {
    background-color: #bbb;
    color: #fff;
  }
}
</style>
