import {
  GET_ACTIVITIES_BY_ITINERARY,
  ACTIVITIES_LOADING
} from "../actions/types";

const initState = { activities: [], loading: false };

export default function(state = initState, action) {
  switch (action.type) {
    case GET_ACTIVITIES_BY_ITINERARY:
      return {
        ...state,
        activities: [...state.activities, ...action.payload],
        loading: false
      };

    case ACTIVITIES_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return { ...state };
  }
}
