import doacaoImg from '../../assets/images/doacao.svg';

import './index.scss'

export function IlustracaoInicial() {
  return (
    <aside className="ilustration">
      <img
        src={doacaoImg}
        alt="Ilustração simbolizando perguntas e respostas"
      />
      <strong>Sistema de controle de Doações Open Source</strong>
      <p>
        Aquele que tem caridade no coração tem sempre qualquer coisa para dar.
        <br />
        <b>- Santo Agostinho</b>
      </p>
    </aside>
  );
}
