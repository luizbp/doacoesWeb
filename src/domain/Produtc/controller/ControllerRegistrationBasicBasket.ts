export interface ControllerRegistrationBasicBasket{
    save(id_user: string, id_conferece: string, param: Record<string, any>):Promise<boolean>;
    get(id_user: string, id_conferece: string):Promise<Record<string, any>>
  }