import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux"


import "./main.scss";
import Home from "./components/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard"
import Store from "./store";
import PrivateRoute from "./private/PrivateRoute"
import RouteLinks from "./private/RouteLinks";
import NotFound from "./components/auth/NotFound";
import Create from "./components/Create";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <RouteLinks path="/register" exact component={Register} />
          <RouteLinks path="/login" exact component={Login} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/create" exact component={Create} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
