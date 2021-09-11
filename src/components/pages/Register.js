import React from "react";
import { useState } from "react";
import "./Register.css";
import EventCard from "../parts/EventCard";
const DATASET = [
  {
    id: 1,
    time: "Friday 8:00 pm",
    type: "football",
    description:
      "It is an event to play football at friday night with some young talented guy. If you are interested, click to Join!",
    owner: "Johnathan David",
    date: "2021.09.05",
  },
  {
    id: 2,
    time: "Tuesday 11:00 am",
    type: "tennis",
    description:
      "Senior level tennis player wants to play with someone who is available at Tuesday in the morning hours.",
    owner: "Dior Thomas",
    date: "2021.09.05",
  },
  {
    id: 3,
    time: "Friday 8:00",
    type: "football",
    description:
      "It is an event to play football at friday night with some young talented guy. If you are interested, click to Join!",
    owner: "Johnathan David",
    date: "2021.09.05",
  },
  {
    id: 4,
    time: "Friday 8:00",
    type: "pingpong",
    description:
      "20 yo girl wants to play table tennis at Sopron, if you are interested, Join to me!",
    owner: "Elizabeth",
    date: "2021.09.05",
  },
];
function Register() {
  const [registerData, setRegisterData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fromTime, setFromTime] = useState("07:00");
  const [toTime, setToTime] = useState("22:00");
  const [eventType, setEventType] = useState("football");
  const [day, setDay] = useState("Monday");
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const registerHandler = function (e) {
    e.preventDefault();
    console.log(
      `Email: ${email} lives in ${city} at Address:${address} wants to play ${eventType} on ${day} from ${fromTime} to ${toTime}`
    );
    // ASYNC POST REQUEST TO BACKEND
    // const data = Get back filtered events from backend
    // setData(data)
    setData(DATASET.filter((d) => d.type === eventType));
    setEmail("");
    setAddress("");
    setCity("");
    setDay("Monday");
    setEventType("football");
    setFromTime("07:00");
    setToTime("22:00");
    setPassword("");
  };
  console.log(data);

  const passwordHandler = function (e) {
    setPassword(e.target.value);
  };
  const emailHandler = function (e) {
    setEmail(e.target.value);
  };
  const addressHandler = function (e) {
    setAddress(e.target.value);
  };
  const fromTimeHandler = function (e) {
    setFromTime(e.target.value);
  };
  const toTimeHandler = function (e) {
    setToTime(e.target.value);
  };
  const cityHandler = function (e) {
    setCity(e.target.value);
  };
  const dayHandler = function (e) {
    setDay(e.target.value);
  };
  const eventTypeHandler = function (e) {
    setEventType(e.target.value);
  };
  if (data.length > 0) {
    return (
      <div className="container">
        <h2 className="text-center mt-5">Events found!</h2>
        {data.map((d) => (
          <EventCard
            key={d.id}
            id={d.id}
            type={d.type}
            descr={d.description}
            owner={d.owner}
          />
        ))}
      </div>
    );
  }
  return (
    <form
      className="container mt-5 shadow-lg p-4 register__form"
      onSubmit={registerHandler}
    >
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Email"
            value={email}
            onChange={emailHandler}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder="Password"
            value={password}
            onChange={passwordHandler}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputAddress">Address</label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="1234 Main St"
          value={address}
          onChange={addressHandler}
        />
      </div>
      <div className="form-group">
        <label htmlFor="sport-types">Interested Event</label>
        <select
          className="form-control"
          id="sport-types"
          value={eventType}
          onChange={eventTypeHandler}
        >
          <option value="football">Football</option>
          <option value="tennis">Tennis</option>
          <option value="pingpong">Table Tennis</option>
          <option value="squash">Squash</option>
          <option value="swimming">Swimming</option>
          <option value="running">Running</option>
        </select>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputCity">City</label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            value={city}
            onChange={cityHandler}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Day of the week</label>
        <select
          className="form-control"
          id="weekdays"
          value={day}
          onChange={dayHandler}
        >
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
      </div>
      <div className="row">
        <label>Available</label>
        <div className="col">
          <label htmlFor="time1">From</label>
          <input
            className="form-control"
            id="time1"
            type="time"
            name="appt-time"
            value={fromTime}
            onChange={fromTimeHandler}
          />
        </div>
        <div className="col">
          <label htmlFor="time2">To</label>
          <input
            className="form-control"
            id="time2"
            type="time"
            name="appt-time"
            value={toTime}
            onChange={toTimeHandler}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <button type="submit" className="btn btn-join">
          Sign in
        </button>
      </div>
    </form>
  );
}

export default Register;
