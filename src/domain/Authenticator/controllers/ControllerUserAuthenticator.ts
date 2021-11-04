import { ModelUser } from "../models/ModelUser";
import { InfoSessionType } from "../types/InfoSessionType";

export interface ControllerUserAuthenticator {
  signIn(
    params: ControllerUserAuthenticator.params
  ): Promise<ControllerUserAuthenticator.UserModel>;

  signUp(params: ControllerUserAuthenticator.params): Promise<boolean>;

  signOut(): Promise<boolean>;

  checkSession(): InfoSessionType;

  getUserSession(): Promise<ControllerUserAuthenticator.UserModel>
}

export namespace ControllerUserAuthenticator {
  export type params = {
    email: string;
    password: string;
  };

  export type UserModel = ModelUser;
}
