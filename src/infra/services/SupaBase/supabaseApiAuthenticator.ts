import { AnyPtrRecord } from "dns";
import { ControllerUserAuthenticator } from "../../../domain/controllers/ControllerUserAuthenticator";
import { ModelUser } from "../../../domain/models/ModelUser";
import { supabase } from "./supabase";

export class SupabaseApiAuthenticator implements ControllerUserAuthenticator {
  private defaultUser: ModelUser = {
    name: "",
    email: "",
    birthday: "",
    idUser: "",
  };
  async findDataUser(user: any) {
    let { data, error, status } = await supabase
      .from("tb_entity")
      .select("name_company,aniversary")
      .eq("id", user?.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (!data) throw "Nenhum dado encontrado";

    let email = user.email ? user.email : "";

    return {
      name: data.name_company,
      email: email,
      birthday: data.aniversary,
      idUser: user.id,
    };
  }

  async checkSession() {
    const session = supabase.auth.session();

    const isLogged = session ? true : false;

    const user: ModelUser = isLogged
      ? await this.findDataUser(session?.user)
      : this.defaultUser;

    return {
      session,
      isLogged,
      user,
    };
  }
  async signIn({
    email,
    password,
  }: ControllerUserAuthenticator.params): Promise<ModelUser> {
    let { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      throw error;
    } else if (!user) {
      throw "Usuário inválido";
    } else {
      return this.findDataUser(user);
    }
  }

  async signUp({
    email,
    password,
  }: ControllerUserAuthenticator.params): Promise<boolean> {
    let { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    console.log("TCL: user", user);

    return true;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return false;
    }

    return true;
  }
}
