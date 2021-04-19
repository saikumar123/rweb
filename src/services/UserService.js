import axios from "axios";

const UserService = {
  apiBaseUrl: {
    url: "http://localhost:8080/",
    // url: "http://104.42.113.67/",
  },
  account: function async(id) {
    return axios
      .get(this.apiBaseUrl.url+"api/user/fetch-account/" + id)
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  user: function async(text) {
    return axios
      .get(this.apiBaseUrl.url + "api/user/fetch-account-email-or-avatar/" + text)
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  allUsers: function async(){
    return axios
      .get(this.apiBaseUrl.url + "api/user/fetch-all-user/")
      .then((resolve) => {
        console.log("resolve = ",resolve)
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  userByUsername: function async(text) {
    console.log("text====",text)
    return axios
      .get(this.apiBaseUrl.url + "api/user/fetch-user/" + text)
      .then((resolve) => {
        console.log("resolve = ",resolve)
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  avatar: function async(text) {
    return axios
    .get(this.apiBaseUrl.url,"api/user/fetch-account-by-avatar/"+text)
    .then((resolve) => {
      return resolve;
    })
    .catch((error) => {
      console.log(error);
    })
  },
  fetchAccount: function async(accountId) {
    return axios.get(this.apiBaseUrl.url+"api/user/update-account/" + accountId)    
    .then((resolve) => {
      return resolve;
    })
    .catch((error) => {
      console.log(error);
    });
  },
}

export default UserService;