import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import CreateEvent from "./components/pages/CreateEvent";
import { useSelector } from "react-redux";
import { selectUser } from "./components/store/user-slice";
import Homescreen from "./components/pages/Homescreen";
import Profile from "./components/pages/Profile";
import CreatedEvents from "./components/pages/CreatedEvents";
import JoinedEvents from "./components/pages/JoinedEvents";
function App() {
  const user = useSelector(selectUser);
  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <Switch>
            <Route path="/joined-events">
              <JoinedEvents />
            </Route>
            <Route path="/create-event">
              <CreateEvent />
            </Route>
            <Route path="/created-events">
              <CreatedEvents />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Homescreen />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route className="login" path="/login">
              <Login />
            </Route>
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        )}
      </header>
    </div>
  );
}

export default App;
