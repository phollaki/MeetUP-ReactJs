import React, { useState } from "react";
import EventCard from "../parts/EventCard";
import "./Homepage.css";

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
function Homepage() {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const recommendHandler = function (e) {
    //ASYNC POST REQUEST
    setData(DATASET);
    setClicked(true);
  };
  if (clicked) {
    return (
      <div className="container mt-5">
        {data.map((d) => (
          <EventCard
            id={d.id}
            key={d.id}
            type={d.type}
            descr={d.description}
            owner={d.owner}
            time={d.time}
            date={d.date}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="d-flex align-items-center justify-content-center homepage">
      <button onClick={recommendHandler} className="btn btn-recommendEvents">
        Recommend
      </button>
    </div>
  );
}

export default Homepage;
