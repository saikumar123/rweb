const initialState = {
  page: "",
  isLogin: false,
  account: "",
  MCTBalance: "",
  MGTBalance: "",
  MYTBalance: "",
  avatar: "",
  jsonObj: {},
  txn: [],
  transactionLoader: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Login":
      return Object.assign({}, state, { page: "Login", isLogin: action.data });
    case "login_data":
      return Object.assign({}, state, {
        isLogin: true,
        avatar: action.data.avatar,
        account: action.data.account,
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
      return Object.assign({}, state, { account: action.data });
    case "MCTBalance":
      return Object.assign({}, state, { MCTBalance: action.data });
    case "MGTBalance":
      return Object.assign({}, state, { MGTBalance: action.data });
    case "MYTBalance":
      return Object.assign({}, state, { MYTBalance: action.data });
    case "transactions":
      return Object.assign({}, state, { txn: state.txn.push(action.data) });
    case "TransactionLoader":
      return Object.assign({}, state, { transactionLoader: action.data });
    default:
      return state;
  }
};
export default reducer;
