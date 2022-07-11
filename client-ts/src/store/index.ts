import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Auth, { IAuthState } from "./module/auth";

Vue.use(Vuex);

export interface IRootState {
  auth: IAuthState;
}

export default new Vuex.Store<IRootState>({
  plugins: [new VuexPersistence({ key: "SMI" }).plugin],
});
