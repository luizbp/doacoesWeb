import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "../../services/supabase";

import toast, { Toaster } from 'react-hot-toast';

import "./index.scss";

export function PageSupabaseLogin() {
  const [campoEmail, setcampoEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  useEffect(() => {
    validLoggerUser().then(() =>{
      // setUser(pUser)
      
    })
  }, [])


  const validLoggerUser = async () => {
    let lUser = await supabase.auth.user()
    console.log("TCL: PageLogin -> session", lUser)
    if(lUser?.id){
      
      let {data, error, status} = await supabase
        .from('users')
        .select('name')
        .eq('id_user', lUser?.id)
        .single();

      console.log("TCL: validLoggerUser -> data", data)

      
      
      if(error && status !== 406){
        console.log("TCL: validLoggerUser -> error", error)
        return
      }
      
      if(data){
        history.push('/supabase/home');
      }else{
        history.push('/supabase/cadastro',);
      }
    }
  }


  const handleLogin = async (email:string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      toast.success(
        'Pronto, agora te enviamos um link de confirmação por e-mail, por favor verifique',
        {
          duration: 8000
        }
      )
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
      <Toaster
        position="top-center"
      />
    </div>
  );
}
