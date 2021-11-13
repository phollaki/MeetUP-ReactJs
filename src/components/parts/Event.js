import React from "react";
import "./Event.css";
import httpService from "../service/http-service";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useCollapse from "react-collapsed";
import User from "./User";
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
  const uid = localStorage.getItem("uid");

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
      <div className="event">
        <div className="event__top">
          {notFound && (
            <div className="event__notFound">
              <div className="event__img">
                <ImageNotSupportedIcon className="event__image" />
              </div>
              <div className="event__text-notFound">No event found...</div>
            </div>
          )}
          {!notFound && (
            <>
              <div className="event__img">
                <img
                  src={`../../images/${type
                    ?.toLowerCase()
                    .replace(" ", "")}.jpg`}
                  className="event__image"
                  alt=""
                />
              </div>
              <div className="event__text">
                <h2 className="event__text-title">
                  {type[0].toUpperCase() + type.substring(1)}
                </h2>

                <div className="event__location">
                  <LocationOnIcon />
                  <p className="event__location-city">{city}</p>
                </div>
                <p>{desc}</p>
                <p>
                  Event is created at:
                  {createdAt.split("T").join(" ").split(".")[0]}
                </p>
                <div className="event__join">
                  {!creator ? (
                    <button
                      className="event__btn"
                      onClick={joinEventHandler}
                      disabled={
                        declined?.includes(uid) || accepted?.includes(uid)
                      }
                    >
                      <span className="event__btn--invisible">Join now</span>
                      <span className="event__btn--visible">
                        {`${remainingPlayers} more place`}
                      </span>
                    </button>
                  ) : (
                    <>
                      <button
                        className="event__btn event__btn-requests"
                        {...getToggleProps()}
                      >
                        {requests.length === 0
                          ? "No requests"
                          : isExpanded
                          ? "Close"
                          : "Watch Requests"}
                      </button>
                      <button className="event__btn-delete">
                        <DeleteIcon
                          onClick={deleteEvent}
                          className="deleteIcon"
                        />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="event__bottom">
          {creator && (
            <section className="event__request" {...getCollapseProps()}>
              {requests?.map((req) => (
                <div key={req} className="event__request-user">
                  <User id={req} />
                  <CheckCircleIcon
                    className="event__request-btn btn-accept"
                    onClick={approveRequestHandler}
                  />
                  <DoNotDisturbAltIcon
                    className="event__request-btn btn-decline"
                    onClick={declineRequestHandler}
                  />
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default Event;
