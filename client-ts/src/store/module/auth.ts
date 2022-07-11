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
  async setCurrentUser(currentUser: CurrentUserI) {
    // await validatorDto(CurrentUserI, currentUser);
    this.currentUser = currentUser;
  }
}
