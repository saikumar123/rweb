import axios from "axios";
import config from "../environmentConfig"

const UserService = {
  apiBaseUrl: {
    // url: "http://localhost:8080/",
    url: config.url+"api/",
  },
  account: function async(id) {
    return axios
      .get(this.apiBaseUrl.url + "api/user/fetch-account/" + id)
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  user: function async(text) {
    return axios
      .get(
        this.apiBaseUrl.url + "api/user/fetch-account-email-or-avatar/" + text
      )
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  userByUsername: function async(text) {
    return axios
      .get(this.apiBaseUrl.url + "api/user/fetch-user/" + text)
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  avatar: function async(text) {
    return axios
      .get(this.apiBaseUrl.url, "api/user/fetch-account-by-avatar/" + text)
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchAccount: function async(accountId) {
    return axios
      .get(this.apiBaseUrl.url + "api/user/update-account/" + accountId)
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default UserService;
