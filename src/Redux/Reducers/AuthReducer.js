const initialState = {
  token: null,
  user: null,
  fullUser: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload,
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "GET_FULL_USER":
      return {
        ...state,
        fullUser: action.payload,
      };
    case "LOGOUT":
      return {
        token: null,
        user: null,
      };
    default:
      return {
        ...state,
        token: localStorage.getItem("token")
          ? localStorage.getItem("token")
          : null,
      };
  }
};

export default AuthReducer;
