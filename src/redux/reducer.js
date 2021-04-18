const initialState = {
  page: "",
  isLogin: false,
  account: "",
  balance1: "",
  balance2: "",
  balance3: "",
  avatar: "",
  jsonObj: {},
  txn: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Login":
      console.log(action.data);
      return Object.assign({}, state, { page: "Login", isLogin: action.data });
    case "login_data" :
      return Object.assign({}, state, {
        isLogin: true,
        avatar: action.data.avatar,
        account: action.data.account
      });
    case "SignUp":
      return Object.assign({}, state, {
        jsonObj: action.data,
        avatar: action.data.avatar,
        
      });
    case "Logout":
      return Object.assign({}, state, { page: {}, jsonObj: action.data });
    case "Fetch":
      return state;
    case "account":
      console.log(action.data);
      return Object.assign({}, state, { account: action.data });
    case "balance1":
      console.log(action.data);
      return Object.assign({}, state, { balance1: action.data });
    case "balance2":
      console.log(action.data);
      return Object.assign({}, state, { balance2: action.data });
    case "balance3":
      return Object.assign({}, state, { balance3: action.data });
    case "transactions":
      return Object.assign({}, state, { txn: state.txn.push(action.data) });
    default:
      return state;
  }
};
export default reducer;
