/* 通用的列表数据mixin */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import MescrollVue from "mescroll.js/mescroll.vue";
import MeScroll, { MeScrollInstance } from "mescroll.js";

@Component({
  components: { MescrollVue }
})
export default class dataListMixins extends Vue {
  protected dataLoaded = false; // 数据
  protected dataList: any[] = []; // 数据
  protected page = 1; // 当前页数
  // @ts-ignore
  protected mescroll?: MeScrollInstance = undefined; // mescroll实例对象

  mescrollDown = {
    isBounce: false,
    auto: true,
    textInOffset: "下拉刷新",
    textOutOffset: "释放刷新",
    callback: this.downCallback
  };

  mescrollUp = {
    isBounce: false,
    auto: false,
    htmlNodata: '<p class="upwarp-nodata">没有更多了</p>',
    callback: this.upCallback
  };

  mounted() {
    console.log(111);
  }

  beforeDestroy() {
    if (this.mescroll) {
      this.mescroll.destroy();
    }
  }

  beforeRouteEnter(to: any, from: any, next: any) {
    // 如果没有配置顶部按钮或isBounce,则beforeRouteEnter不用写
    next((vm: Vue) => {
      // 滚动到原来的列表位置,恢复顶部按钮和isBounce的配置
      if (this.$refs.mescroll) {
        (this.$refs.mescroll as any).beforeRouteEnter();
      }
    });
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    // 如果没有配置顶部按钮或isBounce,则beforeRouteLeave不用写
    // 记录列表滚动的位置,隐藏顶部按钮和isBounce的配置
    if (this.$refs.mescroll) {
      (this.$refs.mescroll as any).beforeRouteLeave();
    }
    next();
  }

  // @ts-ignore
  protected mescrollInit(mescroll:MeScrollInstance) {
    this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
  }

  // @ts-ignore
  protected downCallback(mescroll:MeScrollInstance) {
    this.getData(1);
  }

  protected upCallback(page: number, meScroll: any) {
    this.getData(this.page + 1);
  }

  protected getData(page: number) {
    console.error("你需要自己实现getData函数以覆盖该函数");
  }

  protected handleRefresh(isNormal: boolean, hasMore?: boolean) {
    this.dataLoaded = true;
    if (isNormal) {
      this.$nextTick(() => {
        this.mescroll && this.mescroll.endSuccess(10, !!hasMore);
      });
    } else {
      this.mescroll && this.mescroll.endErr();
    }
  }
}
