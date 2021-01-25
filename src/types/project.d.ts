import Vue, { VNode } from "vue";
import { HttpRequestMethod, HttpRequestMethodAsync } from "@/utils/request";

/* 定义在原型链上面的方法 */
/* 声明 post 和get方法 */
declare module "vue/types/vue" {
  interface Vue {
    // ajax
    $post: HttpRequestMethod; // post方法
    $postAsync: HttpRequestMethodAsync; // 同步的post方法
    $get: HttpRequestMethod; // get方法
    $getAsync: HttpRequestMethodAsync; // 同步的get方法
    // ui
    // $message: {
    //     error: () => {};
    //     warning: () => {};
    //     success: () => {};
    // };
    $showLoading: () => {}; // 显示加载层
    $closeLoading: (immediate?: boolean) => void; // 关闭加载层
    $showToast: (message: string, delay?: number) => void; // 关闭加载层
    $showMessageBox: (
      message: string,
      title?: string,
      options?: any
    ) => Promise<undefined>; // 显示messagebox
    $showMessagePanel: (message: string, title?: string, options?: any) => void; // 显示messagebox

    // 表格数据
    // tableData: TypeTableData;
  }
}

/* 通用的数据列表 */
// interface TypeTableData {
//     data: any[]; // 列表数据
//     count: number; // 总数
//     pageSize: number; // 页面元素个数
//     currentPage: number; // 当前页面下标
// }

declare global {
  interface Window {
    ELEMENT: {
      Message: {
        error: Function;
      };
    };
    VueRouter: {};
  }

  const BUILD_VERSION: string; // 预定义的常量（具体见vue.config.js）, 编译时间版本

  /* jsx */
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = Vue;
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
