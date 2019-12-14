import { combineReducers } from "redux";

import citiesReducer from "./citiesReducer";

import itinerariesReducer from "./itinerariesReducer";

import activitiesReducer from "./activitiesReducer";

import usersReducer from "./usersReducer";

export default combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  activities: activitiesReducer,
  user: usersReducer
});
