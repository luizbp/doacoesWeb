import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PageLoginFactory } from "./main/factories/pages/PageLogin";
import { PageHome } from "./presentation/pages/PageHome";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PageLoginFactory}/>
        <Route path="/home" component={PageHome}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
