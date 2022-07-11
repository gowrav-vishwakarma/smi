import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import { CurrentUserI } from "@/types/CurrentUser";

import store from "@/store";

export interface IAuthState {
  currentUser: CurrentUserI | null;
}

@Module({ dynamic: true, store, name: "auth" })
export default class Auth extends VuexModule {
  currentUser: CurrentUserI | null = null;

  @Mutation
  setCurrentUser(currentUser: CurrentUserI) {
    this.currentUser = currentUser;
  }
}

export const AuthModule = getModule(Auth);
