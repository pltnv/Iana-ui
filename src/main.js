import { createApp } from "vue";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
import clickOutside from "./plugins/click-outside";

createApp(App).use(clickOutside).mount("#app");
