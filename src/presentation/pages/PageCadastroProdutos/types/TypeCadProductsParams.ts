import { ControllerUserAuthenticator } from "../../../../domain/Authenticator/controllers/ControllerUserAuthenticator";
import { RegistrationProducts } from "../../../../infra/Product/RegistrationProducts";


export type TypeCadProductsParams = {
  userAuthenticator: ControllerUserAuthenticator,
  registrationProducts: RegistrationProducts
}

export type TypeFormStateCadProducts = {
  registrationProducts: RegistrationProducts
  userAuthenticator: ControllerUserAuthenticator,
  idConferencia: string
}

export type TypeFormStateListProducts = {
  registrationProducts: RegistrationProducts
  userAuthenticator: ControllerUserAuthenticator,
}