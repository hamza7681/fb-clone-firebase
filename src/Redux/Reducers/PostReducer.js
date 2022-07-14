const initialState = {
  posts: [],
  userPost:[]
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_POST":
      return {
        ...state,
        posts: action.payload,
      };
    case "GET_USER_POSTS":
      return {
        ...state,
        userPost:action.payload
      }
    default:
      return state;
  }
};

export default PostReducer;
