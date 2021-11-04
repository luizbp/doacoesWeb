import { SupabaseApiAuthenticator } from "../../../../infra/Autenticador/services/SupaBase/supabaseApiAuthenticator";
import { RegistrationConference } from "../../../../infra/User/RegistrationConference";
import { PageCadastroConferencia } from "../../../../presentation/pages/PageCadastroConferencia";

export function PageCadastroConferenciaFactory() {
  const supabaseApiAuthenticator = new SupabaseApiAuthenticator();
  const registrationConference = new RegistrationConference();
  return <PageCadastroConferencia userAuthenticator={supabaseApiAuthenticator} registrationConference={registrationConference} />
}
