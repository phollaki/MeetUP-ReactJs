import axios from "axios";
const DEFAULT_URL = "http://localhost:5001/api/v1/";
class HttpService {
  registration = (name, email, password, eventType, latitude, longitude) => {
    return axios
      .post(`${DEFAULT_URL}auth/register`, {
        name: name,
        email: email,
        password: password,
        eventType: eventType,
        latitude,
        longitude,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  login = (email, password) => {
    return axios
      .post(`${DEFAULT_URL}auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("uid", response.data.data._id);
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  getMyData = () => {
    return axios
      .get(`${DEFAULT_URL}auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  createEvent = (typeOfEvent, city, numOfPeople, description) => {
    return axios
      .post(
        `${DEFAULT_URL}event/CreateEvent`,
        {
          type: typeOfEvent,
          city: city,
          remainingPlayers: numOfPeople,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  getAllEvent() {
    return axios
      .get(`${DEFAULT_URL}event/Events`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  getCreatedEvents() {
    return axios
      .get(`${DEFAULT_URL}event/Createdevents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  getAcceptedEvents() {
    return axios
      .get(`${DEFAULT_URL}event/Joinedevents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  getDeclinedEvents() {
    return axios
      .get(`${DEFAULT_URL}event/Declinedevents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  joinEvent(id) {
    return axios.post(
      `${DEFAULT_URL}onhold/Join`,
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }
  deleteEvent(id) {
    return axios
      .delete(`${DEFAULT_URL}event/Delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  acceptJoin(id) {
    return axios
      .put(`${DEFAULT_URL}onhold/Acceptjoin/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  declineJoin(id) {
    return axios
      .put(`${DEFAULT_URL}onhold/Declinejoin/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
export default new HttpService();
