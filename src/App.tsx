import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PageLoginFactory } from "./main/factories/pages/PageLogin";
import { PageHomeFactory } from "./main/factories/pages/PageHome";

import 'antd/dist/antd.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PageLoginFactory}/>
        <Route path="/home" component={PageHomeFactory}/>
        <Route path="/:pStateForm" component={PageLoginFactory}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
