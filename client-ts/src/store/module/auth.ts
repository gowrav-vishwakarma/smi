import { validatorDto } from "@/helper/validateDto";
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";

export class CurrentUserI {
  _id!: string;
  email!: string;
  name!: string;
  accessToken!: string;
  userToppics!: string[];
  userLanguages!: string[];
}

export interface IAuthState {
  currentUser: CurrentUserI | null;
}

@Module({ name: "auth" })
export default class Auth extends VuexModule implements IAuthState {
  currentUser: CurrentUserI | null = null;

  get token(): string | undefined {
    return this.currentUser?.accessToken;
  }

  get isAuthenticated(): boolean {
    return this.currentUser !== null && this.currentUser?.accessToken !== null;
  }

  get loggedInUser(): CurrentUserI | null {
    return this.currentUser ?? null;
  }

  @Mutation
  setCurrentUser(currentUser: CurrentUserI) {
    this.currentUser = currentUser;
  }

  @Action
  async setCurrentUserAction(currentUser: CurrentUserI) {
    this.context.commit(
      "setCurrentUser",
      await validatorDto(CurrentUserI, { ...currentUser })
    );
  }

  @Action
  async resetCurrentUserAction() {
    await this.context.commit("setCurrentUser", null);
  }
}
