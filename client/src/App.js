import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Register from "./components/auth/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
