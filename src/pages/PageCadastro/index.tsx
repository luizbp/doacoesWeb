// import {Link} from 'react-router-dom';

import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/Logo.svg";

import { Button } from "../../components/Button/index";
import { IlustracaoInicial } from "../../components/IlustracaoInicial";

import toast, { Toaster } from "react-hot-toast";

import "./index.scss";
import { supabase } from "../../services/supabase";

export function PageCadastro() {
  const [txtEmail, setTxtEmail] = useState("");
  // const [txtUser, setTxtUser] = useState("");
  const [txtPassword, setTxtPassword] = useState("");
  const [txtConfirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    // LCBP: Verifica se as senhas estão idênticas antes de continuar
    if (!(txtPassword === txtConfirmPassword)) {
      toast("A senhas não coincidem, por favor, verificar", {
        icon: "⚠️",
      });
    }

    const { user, session, error } = await supabase.auth.signUp({
      email: txtEmail,
      password: txtPassword,
    });

    if (error){
      toast.error(
        error.message,
        {
          duration: 8000
        }
      )
      return
    }

    toast.success(
      'Pronto, agora te enviamos um link de confirmação por e-mail, por favor verifique',
      {
        duration: 8000
      }
    )
  };

  return (
    <div id="page-auth">
      <Toaster />
      <IlustracaoInicial />
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Doação Web" />
          <h2>Cadastrar-se</h2>
          <form>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setTxtEmail(e.target.value)}
              value={txtEmail}
            />
            {/* <input
              type="text"
              placeholder="Usuário"
              onChange={(e) => setTxtUser(e.target.value)}
              value={txtUser}
            /> */}
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => setTxtPassword(e.target.value)}
              value={txtPassword}
            />
            <input
              type="password"
              placeholder="Confirme a sua senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={txtConfirmPassword}
            />
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
            >
              Entrar
            </Button>
          </form>
          <p>
            Se ja tem uma conta, <Link to="/">clique aqui</Link> para entrar
          </p>
        </div>
      </main>
    </div>
  );
}
