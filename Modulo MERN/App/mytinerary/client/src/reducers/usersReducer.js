import {
  STORE_USER_FROM_TOKEN,
  CLEAR_USER_DATA,
  SET_USER_LOADING
} from "../actions/types";

const initState = {
  logged: false,
  user: {},
  currentToken: "",
  loading: false
};

export default function (state = initState, action) {
  switch (action.type) {

    case STORE_USER_FROM_TOKEN:
      return {
        ...state,
        logged: true,
        user: action.payload.user,
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

    case SET_USER_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
