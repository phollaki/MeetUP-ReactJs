import React,{ useState, useEffect } from 'react';
import httpService from "../components/http-service.js";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Events = function () {
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
    <View style={styles.container}>
      <View >
        <TouchableOpacity
          className={`btn__filter btn-all ${displayAll ? `btn-active` : ""}`}
          onClick={() => setDisplayAll(true)}
        >
          <Text style={styles.button}>All event</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`btn__filter btn-recommend ${
            !displayAll ? `btn-active` : ""
          }`}
          onClick={displayRecommendedHandler}
        >
          <Text style={styles.button}>Recommended events</Text>
        </TouchableOpacity>
      </View>
      <View className="homescreen__event">
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "green",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});
export default Events;
