import { ControllerUserAuthenticator } from "../../../domain/controllers/ControllerUserAuthenticator";
import { ModelUser } from "../../../domain/models/ModelUser";
import { supabase } from "./supabase";

export class SupabaseApiAuthenticator implements ControllerUserAuthenticator {
  async checkSession() {
    const session = supabase.auth.session();

    const isLogged = session ? true : false;

    return {
      session,
      isLogged,
    };
  }
  async signIn({ email, password }: ControllerUserAuthenticator.params): Promise<ModelUser> {
    let { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      throw error;
    } else {
      let { data, error, status } = await supabase
        .from("users")
        .select("name")
        .eq("id_user", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (!user) {
        throw "Usuário inválido";
      }

      if (!data) throw 'Nenhum dado encontrado';

      return {
        name: data.name,
        email: data.email,
        birthday: data.dta_nascimento,
        idUser: user.id,
      };
    }
  }
  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return false;
    }

    return true;
  }
}
