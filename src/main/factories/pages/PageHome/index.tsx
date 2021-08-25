import { SupabaseApiAuthenticator } from "../../../../infra/services/SupaBase/supabaseApiAuthenticator";
import { PageHome } from "../../../../presentation/pages/PageHome";

export function PageHomeFactory() {
  const supabaseApiAuthenticator = new SupabaseApiAuthenticator();
  return <PageHome userAuthenticator={supabaseApiAuthenticator}/>
}
