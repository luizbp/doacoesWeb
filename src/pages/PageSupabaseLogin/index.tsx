import { useState } from "react";
import { supabase } from "../../services/supabase";
import "./index.scss";

export function PageSupabaseLogin() {
  const [campoEmail, setcampoEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email:string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Verifique seu e-mail')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

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
              onChange={(e) => setcampoEmail(e.target.value)}
            />
            <div className="list-buttons">
              <button 
                className="atualizar"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin(campoEmail)
                }
              }
              disabled={loading}
              >
                {loading ? 'Aguarde...' : 'Logar'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
