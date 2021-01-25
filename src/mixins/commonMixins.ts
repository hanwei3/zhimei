/* 通用的列表数据mixin */
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class extends Vue {
  mounted() {
    console.log('test');
  }
}
