import { combineReducers } from "redux";

import citiesReducer from "./citiesReducer";

import itinerariesReducer from "./itinerariesReducer";

import activitiesReducer from "./activitiesReducer";

export default combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  activities: activitiesReducer
});
