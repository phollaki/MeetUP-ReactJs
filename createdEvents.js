import React, { useEffect, useState } from "react";
import httpService from "./components/http-service";
import Event from "./components/Event";
import { View } from "react-native";

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
    <View>
      <View>
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
      </View>
    </View>
  );
}

export default CreatedEvents;