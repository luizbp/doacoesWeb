import { ControllerTabCompany } from "../../domain/User/controllers/ControllerTabCompany";
import { ModelTabCompany } from "../../domain/User/models/ModelTabCompany";
import { supabase } from "../Autenticador/services/SupaBase/supabase";

export class TabCompany implements ControllerTabCompany {
  validations(param: ModelTabCompany): boolean {
    if (!param) return false;
    return true;
  }

  async insert(param: ModelTabCompany): Promise<ModelTabCompany> {
    if (!this.validations(param))
      throw new Error("Ocorreu um problema na inserção dos dados, verifique");

    const { data, error } = await supabase
      .from("tb_company")
      .insert([
        {
          cnpj: param.cnpj,
          ie: param.ie,
          im: param.im,
          dt_foundation: param.dt_foundation,   
        },
      ]);
      
    if(!data)
      throw new Error("Ocorreu um problema na inserção dos dados, verifique");
    
    if(!error)
      throw error

    return {
      id: data[0].id,
      cnpj: data[0].cnpj,
      ie: data[0].ie,
      im: data[0].im,
      dt_foundation: data[0].dt_foundation,
      created_at: data[0].created_at,
      updated_at: data[0].updated_at
    }
  }
  update(param: ModelTabCompany): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  select(param: any): Promise<ModelTabCompany> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
