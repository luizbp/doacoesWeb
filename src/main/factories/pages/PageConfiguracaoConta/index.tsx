import { SupabaseApiAuthenticator } from "../../../../infra/Autenticador/services/SupaBase/supabaseApiAuthenticator";
import { RegistrationUser } from "../../../../infra/User/RegistrationUser";
import { PageConfiguracaoConta } from "../../../../presentation/pages/PageConfiguracaoConta";

export function PageConfiguracaoContaFactory() {
  const supabaseApiAuthenticator = new SupabaseApiAuthenticator();
  const registrationUser = new RegistrationUser();
  return <PageConfiguracaoConta userAuthenticator={supabaseApiAuthenticator} registrationUser={registrationUser}/>
}
