// 전역 css
import "./assets/main.css";
// 부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; //이것만 추가하면 됨 , 위에것의 압축버전 , 똑같은거 2개 추가했더니 충돌나서 네비바 토글 오류났음 ㅡㅡ
import "bootstrap-icons/font/bootstrap-icons.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount("#app");
