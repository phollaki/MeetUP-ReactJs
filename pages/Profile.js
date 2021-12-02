import React from "react";
import { selectUser } from "../components/store/user-slice";
import { StyleSheet, Text, TouchableOpacity, View, Button, Link} from "react-native"
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector(selectUser);
  const convertDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    );
  };
  return (
    <View className="profile">
      <View className="profile__form">
        <View className="profile__form-left">
          <Button className="profile__btn btn-upload">Upload avatar</Button>
          <Link to="/created-events" className="profile__btn btn-createdEvents">
            Created Events
          </Link>
          <Link
            to="/joined-events"
            className="profile__btn btn-sentEventRequests"
          >
            Joined Events
          </Link>
        </View>
        <View className="profile__form-right">
          <View className="profile__form-field">
            <Text className="profile__form-label">Name</Text>
            <input
              className="profile__form-input"
              id="name"
              name="name"
              placeholder={user.name}
              readOnly
            ></input>
          </View>
          <View className="profile__form-field">
            <Text className="profile__form-label">Email</Text>
            <input
              className="profile__form-input"
              id="email"
              name="email"
              placeholder={user.email}
              readOnly
            ></input>
          </View>
          <View className="profile__form-field">
            <Text className="profile__form-label">Password</Text>
            <input
              type="password"
              className="profile__form-input"
              id="password"
              name="password"
              placeholder="*********"
              readOnly
            ></input>
          </View>
          <View className="">
            <Text className="profile__form-label label-event">
              Interested Events:
            </Text>
            <ul className="profile__form-events">
              {user.eventType.map((event) => (
                <li className="profile__form-event" key={event}>
                  {event.charAt(0).toUpperCase() + event.slice(1)}
                </li>
              ))}
            </ul>
          </View>
          <View className="profile__form-field">
            <label className="profile__form-register" htmlFor="registeredAt">
              Registered At:
            </label>
            <span className="profile__form-date">
              {convertDate(user.registeredAt)}
            </span>
          </View>
          <Button className="profile__btn btn-edit">Edit</Button>
        </View>
      </View>
    </View>
  );
}

export default Profile;
