import type { PageLoginParams } from "../../types/PageLoginParams";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import "./index.scss";
// import { InfoSessionType } from "../../../domain/types/InfoSessionType";

export function PageLogin({ userAuthenticator }: PageLoginParams) {
  // const [infoSession, setInfoSession] = useState<InfoSessionType>({
  //   isLogged: false,
  //   session: null,
  // });
  const [campoEmail, setCampoEmail] = useState("");
  const [campoPassword, setCampoPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = async () => {
    try {
      const requestSession = await userAuthenticator.checkSession();

      if (requestSession.isLogged) history.push("/home");
      // if (requestSession.isLogged) console.log("requestSession ==> ", requestSession)
    } catch (error) {
      toast.error(`Erro na validação de sessão: ${error}`);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = await userAuthenticator.signIn({
        email: campoEmail,
        password: campoPassword,
      });
      setLoading(false);
      if (user) {
        history.push("/home");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="page-responsive">
      <main>
        <div className="main-content">
          <h2>Supabase Login</h2>
          <form>
            <input
              type="email"
              placeholder="E-mail"
              value={campoEmail}
              onChange={(e) => setCampoEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={campoPassword}
              onChange={(e) => setCampoPassword(e.target.value)}
            />
            <div className="list-buttons">
              <button
                className="atualizar"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                disabled={loading}
              >
                {loading ? "Aguarde..." : "Logar"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
