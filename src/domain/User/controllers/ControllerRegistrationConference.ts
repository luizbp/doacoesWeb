export interface ControllerRegistrationConference{
  save(param: Record<string, any>):Promise<boolean>;
  get(id:string):Promise<Record<string, any>>
}