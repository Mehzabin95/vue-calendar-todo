import { createApp } from "vue";
import App from "./App.vue";
import "./input.css";
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
