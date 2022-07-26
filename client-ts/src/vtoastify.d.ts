import VueToastify from "vue-toastify";

declare module "vue/types/vue" {
  interface Vue {
    $vToastify: VueToastify;
  }
}
