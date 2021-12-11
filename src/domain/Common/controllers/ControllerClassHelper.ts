import { ModelClassHelper } from "../models/ModelClassHelper";


export interface ControllerClassHelper {
  insert(param: ModelClassHelper): Promise<ModelClassHelper>
  insertInBulk(param: Array<Record<string, any>>): Promise<ModelClassHelper>
  update(param: ModelClassHelper): Promise<ModelClassHelper>
  upsert(param: ModelClassHelper): Promise<ModelClassHelper>
  select(param: any): Promise<Array<ModelClassHelper>>;
  selectGraphQL(param: any): Promise<Array<ModelClassHelper>>;
  delete(id: Record<string, any>): Promise<boolean>;
}