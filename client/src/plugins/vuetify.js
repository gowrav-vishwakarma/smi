import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
// import VModal from 'vue-js-modal/dist/ssr.nocss'

// import 'vue-js-modal/dist/styles.css'

Vue.use(Vuetify);
// Vue.use(VModal, {  dynamicDefaults: {
//     draggable: true,
//     resizable: true,
//     height: 'auto'
//   } })
export default new Vuetify({
    icons: {
        iconfont: "mdi" || "mdiSvg" || "md" || "fa" || "fa4" || "faSvg",
    },
});
