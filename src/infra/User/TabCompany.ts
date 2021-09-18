import { ControllerTabCompany } from "../../domain/User/controllers/ControllerTabCompany";
import { ModelTabCompany } from "../../domain/User/models/ModelTabCompany";
import { supabase } from "../Autenticador/services/SupaBase/supabase";

import UUID from "uuidjs";

export class TabCompany implements ControllerTabCompany {
  validations(
    type: string,
    param: ModelTabCompany | null,
    id?: string
  ): boolean {
    // if (!param)
    //   throw new Error("Atenção, algum campo não foi informado, verifique");

    // Validações do update
    if (type === "update") {
      if (!param?.id) throw new Error("Atenção! o Campo ID não foi informado");
    }
    // Validações do DELETE
    if (type === "delete") {
      if (!id) throw new Error("Atenção! o Campo ID não foi informado");
    }
    return true;
  }

  async insert(param: ModelTabCompany): Promise<ModelTabCompany> {
    this.validations("insert", param);

    let uuid = UUID.generate();

    let dataInsert = {
      id: uuid,
      ...param,
    };

    const { data, error } = await supabase
      .from("tb_company")
      .insert([dataInsert]);

    if (error) throw new Error(error.message);

    if (!data)
      throw new Error(
        "Ocorreu um problema na inserção dos dados, contacte o suporte"
      );

    return {
      ...data[0],
    };
  }
  async update(param: ModelTabCompany): Promise<ModelTabCompany> {
    // Faz todas as validações de UPDATE
    this.validations("update", param);

    let dataInsert = {
      ...param,
    };

    const { data, error } = await supabase
      .from("tb_company")
      .update([dataInsert])
      .match({ id: param.id });

    if (error) throw new Error(error.message);

    if (!data)
      throw new Error(
        "Ocorreu um problema na atualização dos dados, contacte o suporte"
      );

    return {
      ...data[0],
    };
  }
  async select(
    param?: Record<string, unknown>
  ): Promise<ModelTabCompany | any> {
    const { data, error } = await supabase
      .from("tb_company")
      .select()
      .match(param ? param : {});

    if (error) throw new Error(error.message);

    if (!data)
      throw new Error(
        "Ocorreu um problema na busca dos dados, contacte o suporte"
      );

    return data;
  }
  async delete(id: string): Promise<boolean> {
    // Faz todas as validações de UPDATE
    this.validations("delete", null, id);

    const { data, error } = await supabase
      .from("tb_company")
      .delete()
      .match({ id });

    if (error) throw new Error(error.message);

    if (!data)
      throw new Error("Ocorreu um problema na exclusão dos dados, verifique");

    return true;
  }
}
