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

export const SETBALANCE1 = (data) => {
  return {
    type: "balance1",
    data: data,
  };
};

export const SETBALANCE2 = (data) => {
  return {
    type: "balance2",
    data: data,
  };
};

export const SETBALANCE3 = (data) => {
  return {
    type: "balance3",
    data: data,
  };
};

export const FETCHTRANSACTION = (data) => {
  return {
    type: "transactions",
    data: data,
  };
};

export const SETALLUSERS = (data) => {
  return {
    type: "allusers",
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

export const set_allusers = (data) => {
  return store.dispatch(SETALLUSERS(data));
};

export const set_balance1 = (data) => {
  return store.dispatch(SETBALANCE1(data));
};

export const set_balance2 = (data) => {
  return store.dispatch(SETBALANCE2(data));
};

export const set_balance3 = (data) => {
  return store.dispatch(SETBALANCE3(data));
};
