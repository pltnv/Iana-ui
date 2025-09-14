import { createApp } from "vue";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
import clickOutside from "./plugins/click-outside";
import "./assets/style.css";

createApp(App).use(clickOutside).mount("#app");
