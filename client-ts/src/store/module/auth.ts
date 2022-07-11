import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";

export interface CurrentUserI {
  _id: string;
  email: string;
  name: string;
  accessToken: string;
}

export interface IAuthState {
  currentUser: CurrentUserI | null;
}

@Module({ name: "auth" })
export default class Auth extends VuexModule implements IAuthState {
  currentUser: CurrentUserI | null = null;

  get token() {
    return this.currentUser?.accessToken;
  }

  @Mutation
  setCurrentUser(currentUser: CurrentUserI) {
    this.currentUser = currentUser;
  }
}
