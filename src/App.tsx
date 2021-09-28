import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { PageLoginFactory } from "./main/factories/pages/PageLogin";
import { PageHomeFactory } from "./main/factories/pages/PageHome";
import { PageConfiguracaoContaFactory } from "./main/factories/pages/PageConfiguracaoConta";
import { PageCadastroConferenciaFactory } from "./main/factories/pages/PageCadastroConferencia";
import { PrivateRoute } from "./utils/PrivateRoute"


import "antd/dist/antd.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PageLoginFactory} />
        <PrivateRoute path="/home" component={PageHomeFactory} />
        <PrivateRoute
          path="/configuracao_de_conta"
          component={PageConfiguracaoContaFactory}
        />
        <PrivateRoute
          path="/cadastro_conferencia" exact
          component={PageCadastroConferenciaFactory}
        />
        <PrivateRoute
          path="/cadastro_conferencia/:idRegistry"
          component={PageCadastroConferenciaFactory}
        />
        <Route path="/:pStateForm" component={PageLoginFactory} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
