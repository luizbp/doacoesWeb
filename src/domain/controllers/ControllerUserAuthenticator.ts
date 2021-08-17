import { ModelUser } from "../models/ModelUser";
import { InfoSessionType } from "../types/InfoSessionType";

export interface ControllerUserAuthenticator {
  signIn(
    params: ControllerUserAuthenticator.params
  ): Promise<ControllerUserAuthenticator.UserModel>;

  signOut(): Promise<boolean>;

  checkSession():Promise<InfoSessionType>
}

export namespace ControllerUserAuthenticator {
  export type params = {
    email: string;
    password: string;
  };

  

  export type UserModel = ModelUser;
}
