import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useHistory /*useHistory*/ } from "react-router-dom";

import doacaoImg from "../../assets/images/doacao.svg";
import logoImg from "../../assets/images/Logo.svg";

import { Button } from "../../components/Button/index";
import { IlustracaoInicial } from "../../components/IlustracaoInicial";
import { supabase } from "../../services/supabase";

import "./index.scss";

export function PageLogin() {
  const [campoEmail, setCampoEmail] = useState("");
  const [campoPassword, setCampoPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    validLoggerUser().then(() => {
      // setUser(pUser)
    });
  }, []);

  const validLoggerUser = async () => {
    try {
      let lUser = await supabase.auth.user();
      if (lUser?.id) {
        let { data, error, status } = await supabase
          .from("users")
          .select("name")
          .eq("id_user", lUser?.id)
          .single();

        if (error && status !== 406) throw error;
      }
    } catch (error) {
      toast.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        email: campoEmail,
        password: campoPassword,
      });
      if (error) {
        toast.error(error.message, {
          duration: 8000,
        });
        return;
      }

      toast.success(
        "Pronto, agora te enviamos um link de confirmação por e-mail, por favor verifique",
        {
          duration: 8000,
        }
      );
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="page-auth">
      <IlustracaoInicial />
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Doação Web" />
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
            <Button
              type="submit"
              onClick={(e: any) => {
                e.preventDefault();
                handleLogin();
              }}
              disabled={loading}
            >
              {loading ? <span>Aguarde...</span> : <span>Entrar</span>}
            </Button>
          </form>
          <p>
            Se ainda não tem uma conta, <Link to="/cadastro">clique aqui</Link>{" "}
            para se cadastrar{" "}
          </p>
        </div>
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
