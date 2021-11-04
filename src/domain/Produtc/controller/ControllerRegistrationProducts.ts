export interface ControllerRegistrationProducts{
  save(id_user: string, id_product: string, param: Record<string, any>):Promise<boolean>;
  get(id_user: string, id_product: string):Promise<Record<string, any>>
  delete(id_user: string, id_product: string):Promise<boolean>
}