import { ControllerUserAuthenticator } from "../../../../domain/Authenticator/controllers/ControllerUserAuthenticator";
import { RegistrationBasicBasket } from "../../../../infra/Product/RegistrationBasicBasket";


export type TypeCadastroConferenciaParams = {
  userAuthenticator: ControllerUserAuthenticator,
  registrationBasicBasket: RegistrationBasicBasket
}

export type TypeFormStateCadCestasBasicas = {
  registrationBasicBasket: RegistrationBasicBasket
  userAuthenticator: ControllerUserAuthenticator,
  idConferencia: string
}

export type TypeFormStateListCestasBasicas = {
  registrationBasicBasket: RegistrationBasicBasket
  userAuthenticator: ControllerUserAuthenticator,
}