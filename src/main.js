import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./components/router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);
app.use(Toast, {
  position: "top-right",
  timeout: 1000,
  closeOnClick: true,
  pauseOnHover: true,
});

app.mount("#app");