import { SupabaseApiAuthenticator } from "../../../../infra/services/SupaBase/supabaseApiAuthenticator";
import { PageLogin } from "../../../../presentation/pages/PageLogin";

export function PageLoginFactory() {
  const supabaseApiAuthenticator = new SupabaseApiAuthenticator();
  return <PageLogin userAuthenticator={supabaseApiAuthenticator} />
}
