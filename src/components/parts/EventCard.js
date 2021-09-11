import React, { useState } from "react";
import "./EventCard.css";
function EventCard(props) {
  const [user, setUser] = useState(true);

  return (
    <div className="card mb-5">
      <img
        className="card-img-top img-fluid"
        src={`/images/${props.type}.jpeg`}
        alt={props.type}
      />

      <div className="card-body">
        <h5 className="card-title">{props.type}</h5>
        <p className={user ? "card-body" : "card-body blurred"}>
          {props.descr}
        </p>
      </div>
      <div className="d-flex align-center">
        <button className="btn-join">Join</button>
      </div>
    </div>
  );
}

export default EventCard;
