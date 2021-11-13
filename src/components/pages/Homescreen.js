import React, { useEffect, useState } from "react";
import "./Homescreen.css";
import Header from "../layouts/Header";
import httpService from "../service/http-service";
import Event from "../parts/Event";
function Homescreen() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [displayAll, setDisplayAll] = useState(true);
  useEffect(() => {
    let isMounted = true;
    async function getAllEvent() {
      const res = await httpService.getAllEvent();
      if (res.success === true && isMounted) {
        setEvents(res.data);
      } else {
        alert("Error happened", res.data);
      }
    }
    getAllEvent();
    return () => {
      isMounted = false;
    };
  }, []);
  const displayRecommendedHandler = async () => {
    setDisplayAll(false);
    const res = await httpService.getMyData();
    const userEvents = res.data.eventType.map((event) => event.toLowerCase());
    setFilteredEvents(
      events.filter((event) => userEvents.includes(event.type.toLowerCase()))
    );
  };
  return (
    <div className="homescreen">
      <Header />
      <div className="homescreen__filter">
        <button
          className={`btn__filter btn-all ${displayAll ? `btn-active` : ""}`}
          onClick={() => setDisplayAll(true)}
        >
          All event
        </button>
        <button
          className={`btn__filter btn-recommend ${
            !displayAll ? `btn-active` : ""
          }`}
          onClick={displayRecommendedHandler}
        >
          Recommended events
        </button>
      </div>
      <div className="homescreen__event">
        {displayAll
          ? events.map((event) => (
              <Event
                key={event._id}
                id={event._id}
                type={event.type}
                city={event.city}
                desc={event.description}
                remainingPlayers={event.remainingPlayers}
                createdAt={event.createdAt}
                declined={event.declined}
                accepted={event.members}
              />
            ))
          : filteredEvents.map((event) => (
              <Event
                key={event._id}
                id={event._id}
                type={event.type}
                city={event.city}
                desc={event.description}
                remainingPlayers={event.remainingPlayers}
                createdAt={event.createdAt}
                declined={event.declined}
                accepted={event.members}
              />
            ))}
      </div>
    </div>
  );
}

export default Homescreen;
