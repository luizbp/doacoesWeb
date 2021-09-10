import { SupabaseApiAuthenticator } from "../../../../infra/Autenticador/services/SupaBase/supabaseApiAuthenticator";
import { PageConfiguracaoConta } from "../../../../presentation/pages/PageConfiguracaoConta";

export function PageConfiguracaoContaFactory() {
  const supabaseApiAuthenticator = new SupabaseApiAuthenticator();
  return <PageConfiguracaoConta userAuthenticator={supabaseApiAuthenticator}/>
}
