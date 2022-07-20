import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";
import VuexPersistence from "vuex-persist";
import Auth, { IAuthState } from "./module/auth";
import Filter from "./module/filter";

Vue.use(Vuex);

export interface IRootState {
  auth: IAuthState;
}

const store = new Vuex.Store<IRootState>({
  modules: {
    auth: Auth,
    filter: Filter,
  },
  plugins: [new VuexPersistence({ key: "SMI" }).plugin],
});

export default store;
export const AuthStoreModule = getModule(Auth, store);
export const FilterStoreModule = getModule(Filter, store);
