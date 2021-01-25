import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import request from "@/utils/request";
@Module({ name: "Home", dynamic: true, namespaced: true, store })
export default class Home extends VuexModule {
  public name = "请登录";
  public message = "未知";
  public login = false;

  get getMessage() {
    const obj =
      JSON.parse(<string>localStorage.getItem("vuexPersistedData")) || {};
    return obj["Home"]?.name;
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }
  @Mutation
  private SET_LOGIN(login: boolean) {
    this.login = login;
  }
  @Action
  public getUser(name: string) {
    if (name === "admin") {
      this.SET_NAME("admin");
      this.SET_LOGIN(true);
    } else {
      this.SET_NAME("请登录");
      this.SET_LOGIN(false);
    }
    return new Promise((resolve, reject) => {
      resolve(name);
    });
  }
  @Action
  public async getDataList(name: string) {
    const result = await request.postAsync("/affiche/getArticleIndex");
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }
}

export const HomeModule = getModule(Home);
