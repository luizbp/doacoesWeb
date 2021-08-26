import { ControllerUserAuthenticator } from "../../../domain/controllers/ControllerUserAuthenticator";
import { ModelUser } from "../../../domain/models/ModelUser";
import { supabase } from "./supabase";

// Função que contém todas as funcionalidades de autenticação do usuário 
export class SupabaseApiAuthenticator implements ControllerUserAuthenticator {
  private defaultUser: ModelUser = {
    name: "",
    email: "",
    birthday: "",
    idUser: "",
  };

  // Retorna os dados do cliente no padrão do type ModelUser buscando
  // da base de dados do Supabase
  // TODO: implementar o local storage
  async getDataUser(user: any) {
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

  // Verifica se o usuário esta conectado e retorna os dados básicos
  // para a exibição na tela
  async checkSession() {
    const session = supabase.auth.session();

    const isLogged = session ? true : false;

    const user: ModelUser = isLogged
      ? await this.getDataUser(session?.user)
      : this.defaultUser;

    return {
      session,
      isLogged,
      user,
    };
  }

  // Responsável por fazer o login do usuário
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
      return this.getDataUser(user);
    }
  }

  // Responsável por fazer o cadastro do novo usuário
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

  // Responsável por desconectar o usuário
  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return true;
  }
}
