import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "../../services/supabase";
import "./index.scss";

export function PageSupabaseHome() {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [nomeUsuario, setNomeUsuario] = useState('');

  const [campoNome, setCampoNome] = useState("");
  const [campoEmail, setCampoEmail] = useState("");
  const [campoDataNascimento, setCampoDataNascimento] = useState('');


  useEffect(() => {
    const validLoggerUser = async () => {
      let lUser = await supabase.auth.user();
      console.log("TCL: PageLogin -> session", lUser);
      if (lUser?.id) {
        setCampoEmail(lUser?.email || "");
        return true
      } else {
        history.push("/");
        return false
      }
    };
    validLoggerUser().then((pRetorno) => {
      if(pRetorno){
        getProfile()
      }
    })
  }, [history]);

  async function getProfile(){
    try{
      setLoading(true);
      const user = supabase.auth.user();

      let {data, error, status} = await supabase
        .from('users')
        .select('name')
        .eq('id_user', user?.id)
        .single();
      
      if(error && status !== 406){
        throw error;
      }
      
      if(data){
        setNomeUsuario((data.name !== null) ? data.name : 'Não Encontrado');
      }
    }catch(error){
      alert(error.message);
    } finally{
      setLoading(false);
    }
  }

  

  async function updateProfile(username:string){
  console.log("TCL: updateProfile -> username", username)
    
    try{
      setLoading(true);
      const user = supabase.auth.user();

      const updates ={
        id: user?.id,
        username,
        website: 'teste', 
        avatar_url: 'teste',
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

  async function insertUser(pName:string, pEmail:string, pDtaNascimento:string,){
  console.log("TCL: insertUser -> pDtaNascimento", pDtaNascimento)
  console.log("TCL: insertUser -> pEmail", pEmail)
  console.log("TCL: insertUser -> pName", pName)
      
      try{
        setLoading(true);
        const updates ={
          email: pEmail,
          name: pName, 
          dta_nascimento: pDtaNascimento,
          updated_at: new Date()
        };
  
        let {error} = await supabase.from('users').insert(updates,{
          returning: 'minimal'
        });
  
        if(error){
          console.log(error)
        }
      }catch(error){
        alert(error.message);
      }finally{
        setLoading(false);
      }
    }

  return (
    <div className="page-responsive">
      <main>
        <div className="main-content">
          <h2>Olá - Usuário: {nomeUsuario}</h2>
          <form>
            <input
              type="text"
              placeholder="Nome"
              value={campoNome}
              onChange={(e) => {setCampoNome(e.target.value)}}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={campoEmail}
              onChange={(e) => setCampoEmail(e.target.value)}
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
                onChange={(e) =>{
                  e.preventDefault();
                  insertUser(campoNome, campoEmail, campoDataNascimento)
                }}
              >
                Inserir
              </button>
              <button className="excluir">Excluir</button>
              <button className="buscar">Buscar</button>
              <button 
                className="atualizar"
                onClick={(e)=>{
                  e.preventDefault()
                  updateProfile(campoNome)
                }}
              >
                Atualizar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
