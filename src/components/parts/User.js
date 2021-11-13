import { Avatar } from "@material-ui/core";
import React from "react";
import "./User.css";
function User({ avatar, name, id }) {
  return (
    <div className="user">
      <Avatar src={avatar ? avatar : ""} />
      {id && <p className="user__id">{id}</p>}
    </div>
  );
}

export default User;
