import { ModelTabCompany } from "../models/ModelTabCompany";

export interface ControllerRegistrationUser{
  save(param: ModelTabCompany):Promise<ModelTabCompany>;
}