import axios from "axios";
import config from "../environmentConfig"

const LoginService = {
  apiBaseUrl: {
    url:config.url
  },
  login: function async(payload) {
    return axios
      .post(this.apiBaseUrl.url + "api/auth/login", payload)
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  signup: function async(payload) {
    return axios
      .post(this.apiBaseUrl.url + "api/auth/signup", payload)
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  test: function async() {
    return axios
      .post(
        this.apiBaseUrl.url + "api/auth/test",
        {},
        {
          "Access-Control-Allow-Credentials": true,
          withCredentials: true,
        }
      )
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  logout: function async() {
    return axios
      .get(
        this.apiBaseUrl.url + "api/auth/logout",
        {},
        {
          "Access-Control-Allow-Credentials": true,
          withCredentials: true,
        }
      )
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default LoginService;
