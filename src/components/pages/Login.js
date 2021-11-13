import React, { useState, useRef } from "react";
import "./Login.css";
import HttpService from "../service/http-service";
import { Link, useHistory } from "react-router-dom";
import Header from "../layouts/Header";
import { useDispatch } from "react-redux";
import { login } from "../store/user-slice";
function Login() {
  const history = useHistory();
  const form = useRef();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError] = useState(false);
  const onChangeUsername = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    let isMounted = true;
    e.preventDefault();
    setEmailError(false);
    setPassword(false);
    const data = await HttpService.login(email, password);
    dispatch(login(data.data));
    if (data.success === true && isMounted) {
      history.push("/");
    }
    setPassword("");
    setEmail("");
    return () => {
      isMounted = false;
    };
  };
  return (
    <div className="login">
      <Header />
      <div className={`login__form active`}>
        <div className="row justify-content-md-center">
          <div className="col-md-col-6">
            <form onSubmit={handleLogin} ref={form}>
              <div className="form-group login__input">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control "
                  name="email"
                  value={email}
                  onChange={onChangeUsername}
                />
                {emailError && <p style={{ color: "red" }}>Wrong email!</p>}
              </div>

              <div className="form-group login__input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control "
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                />
                {passwordError && (
                  <p style={{ color: "red" }}>Wrong password!</p>
                )}
              </div>
              <div className="loginBtns">
                <button type="submit" className="btn login__btn ">
                  Login
                </button>
                <Link to="/register" className="btn login__btn ">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
