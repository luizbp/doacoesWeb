import { SupabaseApiAuthenticator } from "../infra/Autenticador/services/SupaBase/supabaseApiAuthenticator";

export const isAuthenticated = () => {
  const supabaseApiAuthenticator = new SupabaseApiAuthenticator();
  try {
    const requestSession = supabaseApiAuthenticator.checkSession();
    if (requestSession.isLogged) return true;
    else return false;
  } catch (error) {
    return false;
  }
};
