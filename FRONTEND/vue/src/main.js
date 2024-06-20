import { createApp } from "vue";
import "vuetify/dist/vuetify.min.css";
import VueTheMask from "vue-the-mask";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

const app = createApp(App);

app.use(vuetify);
app.use(VueTheMask);

app.mount("#app");
