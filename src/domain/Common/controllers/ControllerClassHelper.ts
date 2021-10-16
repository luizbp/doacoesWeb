import { ModelClassHelper } from "../models/ModelClassHelper";


export interface ControllerClassHelper {
  insert(param: ModelClassHelper): Promise<ModelClassHelper>
  update(param: ModelClassHelper): Promise<ModelClassHelper>
  upsert(param: ModelClassHelper): Promise<ModelClassHelper>
  select(param: any): Promise<Array<ModelClassHelper>>;
  delete(id: string): Promise<boolean>;
}