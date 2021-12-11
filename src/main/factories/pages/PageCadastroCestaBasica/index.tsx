import { SupabaseApiAuthenticator } from "../../../../infra/Autenticador/services/SupaBase/supabaseApiAuthenticator";
import { RegistrationBasicBasket } from "../../../../infra/Product/RegistrationBasicBasket";
import { PageCadastroCestaBasica } from "../../../../presentation/pages/PageCadastroCestaBasica";

export function PageCadastroCestaBasicaFactory() {
  const supabaseApiAuthenticator = new SupabaseApiAuthenticator();
  const registrationBasicBasket = new RegistrationBasicBasket();
  return <PageCadastroCestaBasica userAuthenticator={supabaseApiAuthenticator} registrationBasicBasket={registrationBasicBasket}/>
}
