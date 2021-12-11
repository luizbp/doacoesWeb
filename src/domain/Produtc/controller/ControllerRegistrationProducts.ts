import { ModelTabCategory } from "../models/ModelTabCategory";
import { ModelTabMeasure } from "../models/ModelTabMeasure";
import { ModelTabProduct } from "../models/ModelTabProduct";


export interface ControllerRegistrationProducts{
  save(id_user: string, id_product: string, param: Record<string, any>):Promise<boolean>;
  get(id_user: string, id_product: string):Promise<Record<string, any>>
  delete(id_user: string, id_product: string):Promise<boolean>
  getCategory(id?: string, id_user?: string):Promise<Array<ModelTabCategory>>
  getMeadures(id?: string, id_user?: string):Promise<Array<ModelTabMeasure>>
  getList(id_user: string): Promise<Array<ModelTabProduct>>
}