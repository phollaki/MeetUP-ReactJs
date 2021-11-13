import React, { useEffect, useState } from "react";
import "./JoinedEvents.css";
import httpService from "../service/http-service";
import Event from "../parts/Event";
import Header from "../layouts/Header";
function JoinedEvents() {
  const [declinedEvents, setDeclinedEvents] = useState([]);
  const [acceptedEvents, setAcceptedEvents] = useState([]);

  useEffect(() => {
    async function getRequestedEvents() {
      const res = await httpService.getAcceptedEvents();
      const res2 = await httpService.getDeclinedEvents();
      console.log(res);
      setAcceptedEvents(res.data);
      setDeclinedEvents(res2.data);
    }
    getRequestedEvents();
  }, []);
  return (
    <div className="joinedEvents">
      <Header />
      <div className="joinedEvents__event">
        {acceptedEvents.map((event) => (
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
        {declinedEvents.map((event) => (
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

export default JoinedEvents;
