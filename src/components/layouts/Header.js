import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout, selectUser } from "../store/user-slice";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function Header() {
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const signOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/login");
  };
  return (
    <nav className="header">
      <div className="header__left">
        <Link to="/" className="header__link">
          <h1>
            Meet <span className="header__up">UP</span>
          </h1>
        </Link>
      </div>
      <div className="header__right">
        {user && (
          <Link to="create-event" className="btn btn-header">
            <AddBoxIcon className="header__icon" />
            <p className="header__link-text">Create event</p>
          </Link>
        )}
        <Link
          to={user ? "/profile" : "/login"}
          className="btn btn-header"
          type="submit"
        >
          <PersonIcon className="header__icon" />
          <p className="header__link-text">Login</p>
        </Link>
        <button onClick={signOut} className="btn btn-header" type="submit">
          <ExitToAppIcon className="header__icon" />
          <p className="header__link-text">Sign out</p>
        </button>
      </div>
    </nav>
  );
}

export default Header;
