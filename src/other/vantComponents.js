import Vue from "vue";
import "vant/lib/index.css";
import { Button, Cell, Popup, Notify } from "vant";

Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);
Vue.component(Cell.name, Cell);

Vue.use(Notify);
