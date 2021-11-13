import React, { useEffect } from "react";
import { useState } from "react";
import "./Register.css";
import HttpService from "../service/http-service";
import Header from "../layouts/Header";
const EVENT_TYPES = [
  "Football",
  "Tennis",
  "Running",
  "Video games",
  "Talking",
  "Dance",
  "Squash",
  "Board Game",
  "Table Tennis",
  "Volleyball",
  "Basketball",
  "Costume Party",
  "Paint",
  "Drawing",
  "Camping",
  "Fishing",
  "Cycling",
];
function Register() {
  const [eventType, setEventType] = useState([]);
  const [name, setName] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [cityError] = useState(false);
  const [eventTypeError, setEventTypeError] = useState(false);
  const [location, setLocation] = useState([null]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const error = pwdError || emailErr || cityError || eventTypeError;
  const handleCheck1 = () => {
    setChecked1(!checked1);
  };
  const registerHandler = async function (e) {
    e.preventDefault();
    if (location[0] === null || location[1] === null) {
      alert("Please allow to get your location if you want to register!");
    } else {
      const data = await HttpService.registration(
        name,
        email,
        password,
        eventType,
        location[0],
        location[1]
      );
      if (data.success === true) {
        localStorage.setItem("token", JSON.stringify(data.token));
        alert("Successfully registered!");
      } else {
        alert("Something went wrong with registration");
      }
      setEmail("");
      setName("");
      setEventType([]);
      setPassword("");
      setChecked1(false);
    }
  };

  // Email change handler
  const emailHandler = function (e) {
    setEmail(e.target.value);
    setEmailErr(false);
  };

  // Password change handler
  const passwordHandler = function (e) {
    setPassword(e.target.value);
    setPwdError(false);
  };

  // Name change handler
  const nameHandler = function (e) {
    setName(e.target.value);
    //setNameError(false);
  };

  // Event type handler
  const eventTypeHandler = function (e) {
    if (!eventType.includes(e.target.value)) {
      setEventType((prevState) => [...prevState, e.target.value]);
    } else {
      const index = eventType.indexOf(e.target.value);
      if (index > -1) {
        eventType.splice(index, 1);
      }
    }
    setEventTypeError(false);
  };

  // Render register form
  return (
    <div className="register">
      <Header />
      <form className="register__form" onSubmit={registerHandler}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="register__labelName">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              placeholder="Your name"
              value={name}
              onChange={nameHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail4" className="register__labelName">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              required
              placeholder="example@gmail.com"
              value={email}
              onChange={emailHandler}
            />
          </div>
          {emailErr && <p style={{ color: "red" }}>Your email is invalid</p>}
          <div className="form-group ">
            <label htmlFor="inputPassword4" className="register__labelName">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              minLength="6"
              required
              id="inputPassword4"
              placeholder="asd123"
              value={password}
              onChange={passwordHandler}
            />
          </div>
          {pwdError && (
            <p style={{ color: "red" }}>
              Your password is invalid (have to contains letters and numbers)
            </p>
          )}
        </div>
        <div className="register__labelName">Interests</div>
        <div className="register__interests">
          {EVENT_TYPES.map((event, i) => (
            <div key={event} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`inlineCheckbox${event}`}
                onClick={handleCheck1}
                value={event.toLowerCase()}
                onChange={eventTypeHandler}
              />
              <label
                className="form-check-label"
                htmlFor={`inlineCheckbox${event}`}
              >
                {event}
              </label>
            </div>
          ))}
        </div>
        {eventTypeError && (
          <p style={{ color: "red" }}>
            You have to select minimum 1 event for submit your registration
          </p>
        )}
        <div className="d-flex justify-content-center mt-2 ">
          <button disabled={error} type="submit" className="register__btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
