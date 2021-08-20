import store from "./store";

export const LOGIN = (data) => {
  return {
    type: "Login",
    data: data,
  };
};

export const LOGIN_DATA = (data) => {
  return {
    type: "login_data",
    data: data,
  };
};

export const SIGNUP = (data) => {
  return {
    type: "SignUp",
    data: data,
  };
};

export const FETCH = () => {
  return {
    type: "Fetch",
  };
};

export const LOGOUT = (data) => {
  return {
    type: "Logout",
    data: data,
  };
};

export const SETACCOUNT = (data) => {
  return {
    type: "account",
    data: data,
  };
};

export const SETMCTBALANCE = (data) => {
  return {
    type: "MCTBalance",
    data: data,
  };
};

export const SETMGTBALANCE = (data) => {
  return {
    type: "MGTBalance",
    data: data,
  };
};

export const SETMYTBALANCE = (data) => {
  return {
    type: "MYTBalance",
    data: data,
  };
};
export const setTransactionLoader = (data) => {
  return {
    type: "TransactionLoader",
    data: data,
  };
};

export const FETCHTRANSACTION = (data) => {
  return {
    type: "transactions",
    data: data,
  };
};

export const logout_user = (data) => {
  return store.dispatch(LOGOUT(data));
};

export const signup_user = (data) => {
  return store.dispatch(SIGNUP(data));
};

export const create_user = (data) => {
  return store.dispatch(LOGIN(data));
};

export const login_data = (data) => {
  return store.dispatch(LOGIN_DATA(data));
};

export const fetch_user = () => {
  return store.dispatch(FETCH());
};

export const set_account = (data) => {
  return store.dispatch(SETACCOUNT(data));
};

export const set_MCT_balance = (data) => {
  return store.dispatch(SETMCTBALANCE(data));
};

export const set_MGT_balance = (data) => {
  return store.dispatch(SETMGTBALANCE(data));
};

export const set_MYT_balance = (data) => {
  return store.dispatch(SETMYTBALANCE(data));
};

export const set_Transaction_Loader = (data) => {
  console.log(data);
  return store.dispatch(setTransactionLoader(data));
};
