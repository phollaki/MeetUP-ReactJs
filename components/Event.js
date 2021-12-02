import React from "react";
import httpService from "./http-service.js"
import {  View , Text, Image, Button} from "react-native";
import useCollapse from 'react-collapsed'

/*import LocationOnIcon from "@material-ui/icons/LocationOn";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useCollapse from "react-collapsed";
import User from "./User";*/

function Event({
  id,
  type,
  city,
  createdAt,
  desc,
  remainingPlayers,
  declined,
  accepted,
  creator,
  notFound = false,
  eventRefreshHandler,
  requests,
}) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    easing: "ease-in",
  });
  //const uid = localStorage.getItem("uid");

  // Join for an event
  const joinEventHandler = async (e) => {
    e.preventDefault();
    try {
      await httpService.joinEvent(id);
    } catch (err) {
      alert("You already joined for this event");
    }
  };

  // Delete created event
  const deleteEvent = async (e) => {
    e.preventDefault();
    await httpService.deleteEvent(id);
    eventRefreshHandler();
  };

  const approveRequestHandler = async (e) => {
    e.preventDefault();
    try {
      await httpService.acceptJoin(requests[0].toString());
      eventRefreshHandler();
    } catch (err) {
      console.log(err);
    }
  };
  const declineRequestHandler = async (e) => {
    e.preventDefault();
    await httpService.declineJoin(requests[0]);
    eventRefreshHandler();
  };
  return (
    <>
      <View className="event">
        <View className="event__top">
          {notFound && (
            <View className="event__notFound">
              <Text>No event found...</Text>
            </View>
          )}
          {!notFound && (
            <>
              <View className="event__text">
                <Text className="event__text-title">
                  {type[0].toUpperCase() + type.substring(1)}
                </Text>

                <View className="event__location">
                  <LocationOnIcon />
                  <p className="event__location-city">{city}</p>
                </View>
                <Text>{desc}</Text>
                <Text>
                  Event is created at:
                  {createdAt.split("T").join(" ").split(".")[0]}
                </Text>
                <View className="event__join">
                  {!creator ? (
                    <Button
                      className="event__btn"
                      onClick={joinEventHandler}
                      disabled={
                        declined?.includes(uid) || accepted?.includes(uid)
                      }
                    >
                      <Text className="event__btn--invisible">Join now</Text>
                      <Text className="event__btn--visible">
                        {`${remainingPlayers} more place`}
                      </Text>
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="event__btn event__btn-requests"
                        {...getToggleProps()}
                      >
                        {requests.length === 0
                          ? "No requests"
                          : isExpanded
                          ? "Close"
                          : "Watch Requests"}
                      </Button>
                      <Button className="event__btn-delete">
                        <DeleteIcon
                          onClick={deleteEvent}
                          className="deleteIcon"
                        />
                      </Button>
                    </>
                  )}
                </View>
              </View>
            </>
          )}
        </View>
        <View className="event__bottom">
          {creator && (
            <View className="event__request" {...getCollapseProps()}>
              {requests?.map((req) => (
                <View key={req} className="event__request-user">
                  <User id={req} />
                  <CheckCircleIcon
                    className="event__request-btn btn-accept"
                    onClick={approveRequestHandler}
                  />
                  <DoNotDisturbAltIcon
                    className="event__request-btn btn-decline"
                    onClick={declineRequestHandler}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </>
  );
}

export default Event;