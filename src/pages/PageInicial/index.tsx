 import {useState, useEffect} from 'react';
 import {supabase} from '../../services/supabase';

import { Link, useHistory } from 'react-router-dom';
import doacaoImg from '../../assets/images/doacao.svg';
import logoImg from '../../assets/images/Logo.svg';

import {Button} from '../../components/Button/index';


import './index.scss';



export function PageInicial({session} :any){

  const history = useHistory();

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  

  useEffect(() => {
    if(!session){
      history.push('/');
    }
    getProfile();
  }, [session, history])

  async function getProfile(){
    try{
      setLoading(true);
      const user = supabase.auth.user();

      let {data, error, status} = await supabase
        .from('profiles')
        .select('username, website, avatar_url')
        .eq('id', user?.id)
        .single();
      
      if(error && status !== 406){
        throw error;
      }
      
      
      if(data){
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    }catch(error){
      alert(error.message);
    } finally{
      setLoading(false);
    }
  }

  async function updateProfile({username, website, avatar_url}:any){
    try{
      setLoading(true);
      const user = supabase.auth.user();

      const updates ={
        id: user?.id,
        username, 
        website, 
        avatar_url,
        updated_at: new Date()
      };

      let {error} = await supabase.from('profiles').upsert(updates,{
        returning: 'minimal'
      });

      if(error){
        throw error;
      }
    }catch(error){
      alert(error.message);
    }finally{
      setLoading(false);
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
          <h2>Editar Cadastro</h2>
          <form>
            <input 
              type="text" 
              placeholder="E-mail"
              value={(session) ? session.user.email : ''} 
              disabled
            />
            <input 
              type="text" 
              placeholder="Usuário"
              value={username || ''}
              onChange={(e:any) => setUsername(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Website"
              value={website || ''}
              onChange={(e:any) => setWebsite(e.target.value)}
            />
            <Button 
              onClick={() => updateProfile({username, website, avatar_url})}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Atualizar infos'}
            </Button>
          </form>
          <p>Se ja tem uma conta, <Link to="/">clique aqui</Link> para entrar</p>
        </div>
      </main>
    </div>
  )
}