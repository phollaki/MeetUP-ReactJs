import React, { useState } from "react";
import Header from "../layouts/Header";
import "./CreateEvent.css";
import httpService from "../service/http-service";
import events from "../helpers/events.json";
import { useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
function CreateEvent() {
  const [description, setDescription] = useState(null);
  const [numOfPeople, setNumOfPeople] = useState(null);
  const [typeOfEvent, setTypeOfEvent] = useState("Football");
  const [city, setCity] = useState(null);
  const [setStartingTime] = useState(null);
  const history = useHistory();
  const onTypeHandler = (e) => {
    setTypeOfEvent(e.target.value);
  };
  const cityEventChangeHandler = (e) => {
    setCity(e.target.value);
  };
  const startingTimeEventChangeHandler = (e) => {
    setStartingTime(e.target.value);
  };
  const descriptionEventHandler = (e) => {
    setDescription(e.target.value);
  };
  const numOfPeopleEventHandler = (e) => {
    setNumOfPeople(e.target.value);
  };

  const eventCreateHandler = async (e) => {
    e.preventDefault();
    const res = await httpService.createEvent(
      typeOfEvent,
      city,
      numOfPeople,
      description
    );
    if (res.success === true) {
      history.push("/");
      return res;
    }
    setCity(null);
    setStartingTime(null);
    setTypeOfEvent(null);
    setNumOfPeople(null);
    setDescription(null);
  };
  return (
    <div className="createEvent">
      <Header />
      <form onSubmit={eventCreateHandler} className="createEvent__form ">
        <div className="eventCards">
          <div className="event__card">
            <div className="event__card-body">
              <label className="event__card-label">Type of event</label>
              <select
                name="eventType"
                id="eventType"
                onChange={onTypeHandler}
                className="type__select"
                defaultValue="Football"
              >
                {events.events.map((event) => (
                  <option key={event} id={event}>
                    {event}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="card event__card">
            <div className="event__card-body">
              <label className="event__card-label">
                Number of person I need
              </label>
              <input
                type="number"
                placeholder="5"
                className="event__input"
                required
                onChange={numOfPeopleEventHandler}
              ></input>
            </div>
          </div>
          <div className="card event__card">
            <div className="event__card-body">
              <label className="event__card-label">Description</label>
              <textarea
                placeholder="write some word about people you would like to recruit"
                row="10"
                className="event_textarea"
                required
                onChange={descriptionEventHandler}
              ></textarea>
            </div>
          </div>
          <div className="card event__card">
            <div className="event__card-body">
              <label className="event__card-label">City</label>
              <input
                placeholder="New York"
                className="event__cityInput"
                required
                onChange={cityEventChangeHandler}
              ></input>
            </div>
          </div>
          <div className="card event__card">
            <div className="event__card-body">
              <label className="event__card-label">
                Date and starting time
              </label>
              <input
                type="date"
                placeholder=""
                className="event__cityInput"
                onChange={startingTimeEventChangeHandler}
              ></input>
              <input
                type="time"
                placeholder="hh-mm"
                className="event__cityInput"
                onChange={startingTimeEventChangeHandler}
              ></input>
            </div>
          </div>
        </div>
        <div className="create__event-btn" onClick={eventCreateHandler}>
          <span className="create__event-text">Create my event</span>
          <KeyboardArrowDownIcon style={{ fontSize: "8rem" }} />
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
