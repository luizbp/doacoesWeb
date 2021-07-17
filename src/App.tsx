import {BrowserRouter, Route, Switch} from 'react-router-dom';

// import {PageLogin} from './pages/PageLogin/index';
// import {PageCadastro} from './pages/PageCadastro/index';
// import {PageInicial} from './pages/PageInicial/index';
import { PageSupabaseHome } from './pages/PageSupabaseHome';
import { PageSupabaseLogin } from './pages/PageSupabaseLogin';
import { PageSupabaseCadastro } from './pages/PageSupabaseCadastro';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={PageLogin}/>
        <Route path="/cadastro" component={PageCadastro}/>
        <Route path="/inicial" component={PageInicial}/> */}
        <Route path="/" exact component={PageSupabaseLogin}/>
        <Route path="/supabase/cadastro" component={PageSupabaseCadastro}/>
        <Route path="/supabase/home" component={PageSupabaseHome}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
