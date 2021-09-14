import type { TypeLoginParams } from "./types/TypeLoginParams";

import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import logoImg from "../../assets/images/Logo.svg";

import "./index.scss";
import { IlustracaoInicial } from "../../components/IlustracaoInicial";
import { FormStatesLogin } from "./FormStates/FormStatesLogin";
import { FormStatesRegistration } from "./FormStates/FormStatesRegistration";
import { FormStatesChangePassword } from "./FormStates/FormStatesChangePassword";
import { TypeParams } from "./types/TypeParams";
  
export function PageLogin(
  { userAuthenticator }: TypeLoginParams
) {
  const {pStateForm} = useParams<TypeParams>()

  const history = useHistory();

  useEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = async () => {
    try {
      const requestSession = await userAuthenticator.checkSession();

      if (requestSession.isLogged) history.push("/home");
    } catch (error) {
      toast.error(`Erro na validação de sessão: ${error}`);
      console.log("ERRO: ", error)
    }
  };

  const verifyFormState = () => {
    if (pStateForm === "login" || !pStateForm) {
      return <FormStatesLogin userAuthenticator={userAuthenticator} />;
    } else if (pStateForm === "register") {
      return <FormStatesRegistration userAuthenticator={userAuthenticator}/>;
    } else {
      return <FormStatesChangePassword userAuthenticator={userAuthenticator} />;
    }
  };

  return (
    <div id="page-auth">
      <IlustracaoInicial />
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Doação Web" />
          {verifyFormState()}
        </div>
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
