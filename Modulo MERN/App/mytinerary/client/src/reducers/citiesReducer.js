import { GET_CITIES, CITIES_LOADING, GET_CITY_BY_ID } from "../actions/types";

const initState = { cities: [], loading: false };

export default function(state = initState, action) {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
        loading: false
      };

    case GET_CITY_BY_ID:
      return {
        ...state,
        cities: action.payload,
        loading: false
      };

    case CITIES_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return { ...state };
  }
}
