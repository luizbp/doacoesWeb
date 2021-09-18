import { ModelTabCompany } from "../models/ModelTabCompany";

export interface ControllerTabCompany {
  insert(param: ModelTabCompany): Promise<ModelTabCompany>
  update(param: ModelTabCompany): Promise<ModelTabCompany>
  select(param: any): Promise<Array<ModelTabCompany>>;
  delete(id: string): Promise<boolean>;
}