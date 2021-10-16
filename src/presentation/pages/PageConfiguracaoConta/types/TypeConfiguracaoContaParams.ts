import { ControllerUserAuthenticator } from "../../../../domain/Authenticator/controllers/ControllerUserAuthenticator";
import { RegistrationUser } from "../../../../infra/User/RegistrationUser";


export type TypeConfiguracaoContaParams = {
  userAuthenticator: ControllerUserAuthenticator,
  registrationUser: RegistrationUser
}