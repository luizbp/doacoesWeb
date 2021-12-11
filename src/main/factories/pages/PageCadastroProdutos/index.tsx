import { SupabaseApiAuthenticator } from "../../../../infra/Autenticador/services/SupaBase/supabaseApiAuthenticator";
import { RegistrationProducts } from "../../../../infra/Product/RegistrationProducts";

import { PageCadastroProdutos } from "../../../../presentation/pages/PageCadastroProdutos";

export function PageCadastroProdutosFactory() {
  const supabaseApiAuthenticator = new SupabaseApiAuthenticator();
  const registrationProducts = new RegistrationProducts();
  return <PageCadastroProdutos userAuthenticator={supabaseApiAuthenticator} registrationProducts={registrationProducts} />
}
