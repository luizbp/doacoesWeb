import { ModelTabCompany } from "../models/ModelTabCompany";

export interface ControllerTabCompany {
  insert(param: ModelTabCompany): Promise<ModelTabCompany>
  update(param: ModelTabCompany): Promise<boolean>
  select(param: any): Promise<ModelTabCompany>;
  delete(id: string): Promise<boolean>;
}