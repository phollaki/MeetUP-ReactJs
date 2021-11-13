import React, { useEffect, useState } from "react";
import "./CreatedEvents.css";
import httpService from "../service/http-service";
import Event from "../parts/Event";
import Header from "../layouts/Header";
function CreatedEvents() {
  const [events, setEvents] = useState([]);

  async function getCreatedEvents() {
    const res = await httpService.getCreatedEvents();
    setEvents(res.data);
  }
  const eventRefreshHandler = () => {
    getCreatedEvents();
  };

  useEffect(() => {
    getCreatedEvents();
    return getCreatedEvents();
  }, []);

  return (
    <div className="createdEvents">
      <Header />
      <div className="createdEvents__events">
        {events.map((event) => (
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
            creator={true}
            eventRefreshHandler={eventRefreshHandler}
            requests={event.request}
          />
        ))}
        {events.length < 1 && <Event notFound="true" />}
      </div>
    </div>
  );
}

export default CreatedEvents;
