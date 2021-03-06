import { GET_ACTIVITIES_BY_ITINERARY, ACTIVITIES_LOADING } from "./types";

export const getActivitiesByItinerary = itineraryId => dispatch => {
  dispatch(setActivitiesLoading());

  fetch("/api/activities/" + itineraryId)
    .then(response => response.json())
    .then(data => {
      let payload = {
        itineraryId,
        data
      };

      dispatch({
        type: GET_ACTIVITIES_BY_ITINERARY,
        payload
      });
    });
};

export const setActivitiesLoading = () => {
  return {
    type: ACTIVITIES_LOADING
  };
};
