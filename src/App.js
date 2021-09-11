import "./App.css";
import Header from "./components/layouts/Header";
import Homepage from "./components/pages/Homepage";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./components/pages/Register";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="*">
            <Redirect to="/" />
            <Homepage />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
