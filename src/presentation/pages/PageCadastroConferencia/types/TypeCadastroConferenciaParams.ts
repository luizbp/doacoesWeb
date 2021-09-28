import { ControllerUserAuthenticator } from "../../../../domain/Authenticator/controllers/ControllerUserAuthenticator";
import { RegistrationConference } from "../../../../infra/User/RegistrationConference";


export type TypeCadastroConferenciaParams = {
  userAuthenticator: ControllerUserAuthenticator,
  registrationConference: RegistrationConference
}

export type TypeFormStateCadConferences = {
  registrationConference: RegistrationConference
  userAuthenticator: ControllerUserAuthenticator,
}

export type TypeFormStateListConferences = {
  registrationConference: RegistrationConference
  userAuthenticator: ControllerUserAuthenticator,
}