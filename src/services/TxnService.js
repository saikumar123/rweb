import axios from "axios";

const TxnService = {
  apiBaseUrl: {
    url: "http://localhost:8080/",
    // url: "http://104.42.113.67/api/",
  },
  fetchTransaction: function async(text) {
    return axios
      .get(this.apiBaseUrl.url + "api/txn/fetch-transactions-by-avatar/" + text)
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  updateTransaction: function async(senderId, receiverId, hash, lockStatus) {
    return axios
      .get(
        this.apiBaseUrl.url +
          "api/txn/update-transactions/sender/" +
          senderId +
          "/receiver/" +
          receiverId +
          "/hash/" +
          hash +
          "/lockStatus/" +
          lockStatus
      )
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  createTransaction: function async(text, payload) {
    return axios
      .post(this.apiBaseUrl.url + "api/txn/create-transaction/" + text, payload)
      .then((resolve) => {
        return resolve;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default TxnService;
