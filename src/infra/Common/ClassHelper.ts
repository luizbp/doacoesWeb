import { supabase } from "../Autenticador/services/SupaBase/supabase";

import UUID from "uuidjs";
import { ModelClassHelper } from "../../domain/Common/models/ModelClassHelper";
import { ControllerClassHelper } from "../../domain/Common/controllers/ControllerClassHelper";

export class ClassHelper implements ControllerClassHelper {
  private pNameTable: string;
  constructor(pNameTable: string) {
    this.pNameTable = pNameTable;
  }
  validations(
    type: string,
    param: ModelClassHelper | null,
    id?: Record<string, any>
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

  async insert(param: ModelClassHelper): Promise<ModelClassHelper> {
    this.validations("insert", param);

    let uuid = UUID.generate();

    let dataInsert = {
      id: uuid,
      ...param,
    };

    const { data, error } = await supabase
      .from(this.pNameTable)
      .insert([dataInsert]);

    if (error) {
      console.error({
        message: `Erro => ${error.message}`,
        origin: "ClassHelper => insert",
      });
      throw new Error(
        "Ocorreu um erro desconhecido, por favor contacte o suporte"
      );
    }

    if (!data)
      throw new Error(
        "Ocorreu um problema na inserção dos dados, contacte o suporte"
      );

    return {
      ...data[0],
    };
  }

  async insertInBulk(param: Array<Record<string, any>>): Promise<ModelClassHelper> {
    this.validations("insert", param);

    const { data, error } = await supabase
      .from(this.pNameTable)
      .upsert(param);

    if (error) {
      console.error({
        message: `Erro => ${error.message}`,
        origin: "ClassHelper => insertInBulk",
      });
      throw new Error(
        "Ocorreu um erro desconhecido, por favor contacte o suporte"
      );
    }

    if (!data)
      throw new Error(
        "Ocorreu um problema na inserção em massa dos dados, contacte o suporte"
      );

    return {
      ...data[0],
    };
  }

  async update(param: ModelClassHelper): Promise<ModelClassHelper> {
    // Faz todas as validações de UPDATE
    this.validations("update", param);

    let dataInsert = {
      ...param,
    };

    const { data, error } = await supabase
      .from(this.pNameTable)
      .update([dataInsert])
      .match({ id: param.id });

    if (error) {
      console.error({
        message: `Erro => ${error.message}`,
        origin: "ClassHelper => update",
      });
      throw new Error(
        "Ocorreu um erro desconhecido, por favor contacte o suporte"
      );
    }

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
  ): Promise<ModelClassHelper | any> {
    const { data, error } = await supabase
      .from(this.pNameTable)
      .select()
      .match(param ? param : {});

    if (error) {
      console.error({
        message: `Erro => ${error.message}`,
        origin: "ClassHelper => select",
      });
      throw new Error(
        "Ocorreu um erro desconhecido, por favor contacte o suporte"
      );
    }

    if (!data)
      throw new Error(
        "Ocorreu um problema na busca dos dados, contacte o suporte"
      );

    return data;
  }

  async selectGraphQL(
    param?: Record<string, unknown>,
    query?: string
  ): Promise<ModelClassHelper | any> {
    const { data, error } = await supabase
      .from(this.pNameTable)
      .select(query ? query : '')
      .match(param ? param : {});

    if (error) {
      console.error({
        message: `Erro => ${error.message}`,
        origin: "ClassHelper => select",
      });
      throw new Error(
        "Ocorreu um erro desconhecido, por favor contacte o suporte"
      );
    }

    if (!data)
      throw new Error(
        "Ocorreu um problema na busca dos dados, contacte o suporte"
      );

    return data;
  }

  async search(
    where: Record<string, any>,
    param: {
      name: string;
      value: any;
    }
  ): Promise<ModelClassHelper | any> {
    console.log('param.value =>', param.value)
    where = where ? where : {};
    const { data, error } =
      param.value
        ? await supabase
            .from(this.pNameTable)
            .select()
            .ilike(param.name, `%${param.value}%`)
            .match(where)
        : await supabase.from(this.pNameTable).select().match(where);

    if (error) {
      console.error({
        message: `Erro => ${error.message}`,
        origin: "ClassHelper => search",
      });
      throw new Error(
        "Ocorreu um erro desconhecido, por favor contacte o suporte"
      );
    }

    if (!data)
      throw new Error(
        "Ocorreu um problema na busca dos dados, contacte o suporte"
      );

    return data;
  }

  async delete(id: Record<string, any>): Promise<boolean> {
    // Faz todas as validações de UPDATE
    this.validations("delete", null, id);

    const { data, error } = await supabase
      .from(this.pNameTable)
      .delete()
      .match(id);

    if (error) {
      console.error({
        message: `Erro => ${error.message}`,
        origin: "ClassHelper => delete",
      });
      throw new Error(
        "Ocorreu um erro desconhecido, por favor contacte o suporte"
      );
    }

    if (!data)
      throw new Error("Ocorreu um problema na exclusão dos dados, verifique");

    return true;
  }

  async upsert(param: ModelClassHelper): Promise<ModelClassHelper> {
    // Faz todas as validações de UPDATE
    this.validations("upsert", param);

    const { data, error } = await supabase
      .from(this.pNameTable)
      .upsert([param]);

    if (error) {
      console.error({
        message: `Erro => ${error.message}`,
        origin: "ClassHelper => upsert",
      });
      throw new Error(
        "Ocorreu um erro desconhecido, por favor contacte o suporte"
      );
    }

    if (!data)
      throw new Error(
        "Ocorreu um problema na atualização/inserção dos dados, contacte o suporte"
      );

    return {
      ...data[0],
    };
  }
}
