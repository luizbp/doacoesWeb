import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {PageHome} from './pages/PageHome/index';
import {PageCadastro} from './pages/PageCadastro/index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PageHome}/>
        <Route path="/cadastro" component={PageCadastro}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
