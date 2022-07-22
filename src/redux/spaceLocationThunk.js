const BASE_URL = 'https://www.admin.poolbar.at/';

function setSpaceLocations(spaceLocations) {
  return {
    type: 'SET_SPACELOCATIONS',
    payload: spaceLocations,
  };
}

function setIsFetchingData(isFetching) {
  return {
    type: 'SET_IS_FETCHING_SPACELOCATIONS',
    payload: isFetching,
  };
}

function setHasFetchingDataError(hasError) {
  return {
    type: 'SET_HAS_FETCHING_SPACELOCATIONS_ERROR',
    payload: hasError,
  };
}
export function fetchSpaceLocations() {
  return (dispatch, getState) => {
    const isFetchingData = getState().spaceLocations.isFetchingData;
    if (isFetchingData) {
      return;
    } else {
      dispatch(setIsFetchingData(true));
      fetch(BASE_URL + 'items/raumfahrtprogramme?limit=9999')
        .then(async (response) => {
          // check for error response
          console.log(response.ok);

          if (response.ok) {
            const data = await response.json();
            dispatch(setSpaceLocations(data.data));
          } else {
            const error = (data && data.message) || response.status;
            console.log('Fetching Space Locations Error: ', error);
            dispatch(setHasFetchingDataError(true));
          }
        })
        .catch((error) => {
          console.error('Error loading Space Locations: ', error);
          dispatch(setHasFetchingDataError(true));
        })
        .finally(() => {
          console.log('Finished loading Space Locations');
          dispatch(setIsFetchingData(false));
        });
    }
  };
}
