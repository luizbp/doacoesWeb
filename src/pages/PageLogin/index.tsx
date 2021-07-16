import { useEffect, useState } from 'react';
import {Link, /*useHistory*/} from 'react-router-dom';

import doacaoImg from '../../assets/images/doacao.svg';
import logoImg from '../../assets/images/Logo.svg';

import {Button} from '../../components/Button/index';
import { supabase } from '../../services/supabase';


import './index.scss';


export function PageLogin(){
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  // const history = useHistory();
  useEffect(() => {
    setSession(supabase.auth.session())
    console.log("TCL: PageLogin -> session", session)

    // if(session){
    //   history.push('/inicial',);
    // }

  }, [session])


  const handleLogin = async (email:string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }
  async function handleSingOut() {
    const {erro}:any = await supabase.auth.signOut();
    if(erro){
      throw erro;
    }
  }
  

  return (
    <div id="page-auth">
      <aside>
        <img src={doacaoImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Sistema de controle de Doações Open Source</strong>
        <p>
          Aquele que tem caridade no coração tem sempre qualquer coisa para dar.<br/>
          <b>- Santo Agostinho</b>
        </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Doação Web" />
          <h2>Entrar</h2>
          <form>
            <input 
              type="text" 
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit"
              onClick={(e:any) => {
                e.preventDefault()
                handleLogin(email)
              }}
              disabled={loading}
            >
              {loading ? <span>Aguarde...</span> : <span>Enviar código de acesso</span>}
            </Button>
            <Button
              onClick={handleSingOut}
            >
                
            </Button>
          </form>
          <p>Se ainda não tem uma conta, <Link to="/cadastro">clique aqui</Link> para se cadastrar </p>
        </div>
      </main>
    </div>
  )
}