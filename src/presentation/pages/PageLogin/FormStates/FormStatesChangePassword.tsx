import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { TypeLoginParams } from "../types/TypeLoginParams";
import toast, { Toaster } from "react-hot-toast";
import {CustomButton} from '../../../camponents/CustomButton'


import "../index.scss";

export const FormStatesChangePassword = ({ userAuthenticator }: TypeLoginParams) => {
  const [campoEmail, setCampoEmail] = useState("");
  const [campoPassword, setCampoPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const history = useHistory();

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
    }finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Entrar</h2>
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
        <CustomButton
          type="submit"
          onClick={(e: any) => {
            e.preventDefault();
            handleLogin();
          }}
          disabled={loading}
        >
          {loading ? <span>Aguarde...</span> : <span>Entrar</span>}
        </CustomButton>
      </form>
      <p>
        Se ainda não tem uma conta, <Link to="/cadastro">clique aqui</Link> para
        se cadastrar{" "}
      </p>
      <Toaster/>
    </div>
  );
};
