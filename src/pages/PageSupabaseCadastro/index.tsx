import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

import toast, { Toaster } from "react-hot-toast";

import "./index.scss";
import { useHistory } from "react-router-dom";

export function PageSupabaseCadastro() {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [campoNome, setCampoNome] = useState("");
  const [campoEmail, setCampoEmail] = useState("");
  const [campoDataNascimento, setCampoDataNascimento] = useState("");

  useEffect(() => {
    const validLoggerUser = async () => {
      let lUser = await supabase.auth.user();
      console.log("TCL: PageLogin -> session", lUser);
      if (lUser?.id) {
        let { data, error, status } = await supabase
          .from("users")
          .select("name")
          .eq("id_user", lUser?.id)
          .single();

        console.log("TCL: validLoggerUser -> data", data);

        if (error && status !== 406) {
          console.log("TCL: validLoggerUser -> error", error);
          return;
        }

        if (data) {
          history.push("/supabase/home");
        } else {
          setCampoEmail(lUser?.email || "");
        }
      } else {
        history.push("/");
      }
    };
    validLoggerUser();
  }, [history]);

  const insertUser = async () => {
    try {
      setLoading(true);

      if (!validateFields()) {
        toast("Atenção! Preencha todos os campos para prosseguir", {
          duration: 5000,
          icon: "⚠️",
        });
        return;
      }

      const cUser = supabase.auth.user();

      const updates = {
        email: campoEmail,
        name: campoNome,
        dta_nascimento: campoDataNascimento,
        id_user: cUser?.id,
      };

      let { error } = await supabase.from("users").insert(updates, {
        returning: "minimal",
      });

      if (error) {
        toast.error(`Atenção, ocorreu um erro ${error.message}`, {
          duration: 5000,
        });
        console.log("TCL: insertUser -> error", error);
        return;
      }
      toast.success(
        "Cadastro realizado com sucesso, em instantes você será redirecionado para a pagina principal",
        {
          duration: 8000,
        }
      );
      setTimeout(() => {
        history.push("/supabase/home");
      }, 9000);
    } catch (error) {
      toast.error(`Atenção, ocorreu um erro ${error}`, {
        duration: 5000,
      });
      console.log("TCL: insertUser -> error", error);
      return;
    } finally {
      setLoading(false);
    }
  };

  const validateFields = () => {
    if (campoNome === "" || campoEmail === "" || campoDataNascimento === "") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="page-responsive">
      <main>
        <div className="main-content">
          <h3>Finalize seu cadastro preenchendo os dados abaixo</h3>
          <form>
            <input
              type="text"
              placeholder="Nome"
              value={campoNome}
              onChange={(e) => {
                setCampoNome(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={campoEmail}
              onChange={(e) => setCampoEmail(e.target.value)}
              disabled={campoEmail !== ""}
            />
            <input
              type="date"
              placeholder="Data de Nascimento"
              value={campoDataNascimento}
              onChange={(e) => setCampoDataNascimento(e.target.value)}
            />
            <div className="list-buttons">
              <button
                className="gravar"
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  insertUser();
                }}
              >
                {loading ? "Aguarde..." : "Concluir"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
