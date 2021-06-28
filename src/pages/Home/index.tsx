import {Link} from 'react-router-dom';

import doacaoImg from '../../assets/images/doacao.svg';
import logoImg from '../../assets/images/Logo.svg';

import {Button} from '../../components/Button/index';


import './index.scss';


export function Home(){

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
          <form>
            <input 
              type="text" 
              placeholder="Usuário"
            />
            <input 
              type="text" 
              placeholder="Senha"
            />
            <Button type="submit">
              Entrar
            </Button>
          </form>
          <p>Se ainda não tem uma conta, clique aqui para se cadastrar </p>
        </div>
      </main>
    </div>
  )
}