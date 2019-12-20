import {
  SET_USER_LOADING,
  STORE_USER_FROM_TOKEN,
  CLEAR_USER_DATA,
  LIKE_OR_DISLIKE
} from "../actions/types";

const initState = {
  logged: false,
  user: {},
  userFavs: [],
  currentToken: "",
  loading: false
};

export default function (state = initState, action) {
  switch (action.type) {
    case STORE_USER_FROM_TOKEN:
      let user = {
        userId: action.payload.user._id,
        userName: action.payload.user.userName,
        userEmail: action.payload.user.userEmail
      };

      return {
        ...state,
        logged: true,
        user,
        userFavs: action.payload.user.userFavs,
        currentToken: action.payload.token,
        loading: false
      };

    case CLEAR_USER_DATA:
      return {
        ...state,
        logged: false,
        user: {},
        currentToken: "",
        loading: false
      };

    case LIKE_OR_DISLIKE:
      return {
        ...state,
        userFavs: action.payload,
        loading: false
      };

    case SET_USER_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
