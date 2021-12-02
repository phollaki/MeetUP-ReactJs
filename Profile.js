import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user-slice";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

function Profile() {
  const user = useSelector(selectUser);
  const convertDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    );
  };
  return (
    <div className="profile">
      <Header />
      <div className="profile__form">
        <div className="profile__form-left">
          <Avatar className="profile__avatar" />
          <button className="profile__btn btn-upload">Upload avatar</button>
          <Link to="/created-events" className="profile__btn btn-createdEvents">
            Created Events
          </Link>
          <Link
            to="/joined-events"
            className="profile__btn btn-sentEventRequests"
          >
            Joined Events
          </Link>
        </div>
        <div className="profile__form-right">
          <div className="profile__form-field">
            <label className="profile__form-label">Name</label>
            <input
              className="profile__form-input"
              id="name"
              name="name"
              placeholder={user.name}
              readOnly
            ></input>
          </div>
          <div className="profile__form-field">
            <label className="profile__form-label">Email</label>
            <input
              className="profile__form-input"
              id="email"
              name="email"
              placeholder={user.email}
              readOnly
            ></input>
          </div>
          <div className="profile__form-field">
            <label className="profile__form-label">Password</label>
            <input
              type="password"
              className="profile__form-input"
              id="password"
              name="password"
              placeholder="*********"
              readOnly
            ></input>
          </div>
          <div className="">
            <label className="profile__form-label label-event">
              Interested Events:
            </label>
            <ul className="profile__form-events">
              {user.eventType.map((event) => (
                <li className="profile__form-event" key={event}>
                  {event.charAt(0).toUpperCase() + event.slice(1)}
                </li>
              ))}
            </ul>
          </div>
          <div className="profile__form-field">
            <label className="profile__form-register" htmlFor="registeredAt">
              Registered At:
            </label>
            <span className="profile__form-date">
              {convertDate(user.registeredAt)}
            </span>
          </div>
          <button className="profile__btn btn-edit">Edit</button>
        </div>
      </div>
    </div>
  );
}
