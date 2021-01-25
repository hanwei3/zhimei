<template>
    <div class="box">
        <span class="hbb-span">{{ userName }}</span>
        <span>{{ moenys | money }}</span>
        <span v-title="汉堡" style="display: none"></span>
    <van-button v-if="userName !== 'admin'" type="primary" @click="goLogin"
        >登录</van-button
    >
    <van-button v-else type="danger" @click="goTui">退出</van-button>
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
        <van-popup v-model="show">内容</van-popup>
        <ul class="news-ul">
      <li
                v-for="(item, idx) in newsList"
                :key="item.idx"
                @click="clickArticle(item.id)"
      >
        <template v-if="item.showDetail">
          <div class="news-show">
                        <div>
                            <img class="news-pic" :src="item.pic" alt="" />
            </div>
            <div class="content-block">
                            <p class="t-title">
                                {{ item.title }}
              </p>
                            <time class="time">{{ item.time }}</time>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="no-data">
            暂无资讯
                    </div>
                </template>
            </li>
    </ul>

        <van-button type="primary" @click="clickTest">test</van-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Mixins } from "vue-property-decorator";
import { HomeModule } from "@/store/modules/user/home";
import dataListMixins from "@/mixins/dataListMixins";
@Component({ components: {} })
export default class extends Mixins(dataListMixins) {
  [x: string]: any;
  newsList: any[] = []; // 新闻数据DE
  show = false;

  moenys = 5;

  get userName() {
    return HomeModule.getMessage;
  }

  mounted() {
    this.getArticleData();
  }

  async getArticleData() {
    HomeModule.getDataList("aaa").then((res: any) => {
      const arr: any[] = [];
      if (res[1] && res[1]?.code === "000000") {
        (res[1]?.data || []).forEach((item: any, idx: number) => {
          arr.push({
            id: String(item.articleId),
            title: item.title,
            pic: item.imgName,
            time: item.publishTime.split(" ")?.[0],
            isHot: false,
            showDetail: idx === 0
          });
        });
        this.newsList = arr;
      }
    });
  }

  clickArticle() {}

  showPopup() {
    this.show = true;
  }

  goLogin() {
    this.doOption("admin");
  }

  goTui() {
    this.doOption("out");
  }
  async doOption(str: string) {
    HomeModule.getUser(str).then(res => {
      if (res === "admin") {
        this.$notify({ type: "primary", message: "登陆成功" });
      } else {
        this.$notify({ type: "primary", message: "已退出登录" });
      }
      setTimeout(() => {
        location.reload();
      }, 500);
    });
  }
  clickTest() {
    // HomeModule.AjaxCommonBtn();
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  background: $common-bg-color;
  .hbb-span {
    padding: 80px 0;
    display: flex;
    justify-content: center;
    background: $color-dark-bg;
    color: $color-up;
  }
  .news-ul {
    float: left;
    width: 100%;
    li {
      display: flex;
      justify-content: center;
      .news-show {
        width: 100%;
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .content-block {
          display: flex;
        }
      }
    }
  }
}
</style>
