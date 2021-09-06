import { ModelUser } from "../models/ModelUser";

export type InfoSessionType ={
  session: any | null
  isLogged: boolean
  user: ModelUser
}