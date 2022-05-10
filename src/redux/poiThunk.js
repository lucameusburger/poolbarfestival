const BASE_URL = 'https://www.admin.poolbar.at/';

function setPOI(poi) {
  return {
    type: 'SET_POI',
    payload: poi,
  };
}

function setIsFetchingData(isFetching) {
  return {
    type: 'SET_IS_FETCHING_POI',
    payload: isFetching,
  };
}

function setHasFetchingDataError(hasError) {
  return {
    type: 'SET_HAS_FETCHING_POI_ERROR',
    payload: hasError,
  };
}
export function fetchPOI() {
  return (dispatch, getState) => {
    const isFetchingData = getState().poi.isFetchingData;
    if (isFetchingData) {
      return;
    } else {
      console.log('fetchPOI');
      dispatch(setIsFetchingData(true));
      fetch(BASE_URL + 'items/points_of_interest?limit=9999')
        .then(async (response) => {
          // check for error response
          console.log(response.ok);

          if (response.ok) {
            const data = await response.json();
            let fetchedPOI = data.data || [];

            dispatch(setPOI(fetchedPOI));
          } else {
            const error = (data && data.message) || response.status;
            console.log('Fetching POI Error: ', error);
            dispatch(setHasFetchingDataError(true));
          }
        })
        .catch((error) => {
          console.error('Error loading POI: ', error);
          dispatch(setHasFetchingDataError(true));
        })
        .finally(() => {
          console.log('Finished loading POI');
          dispatch(setIsFetchingData(false));
        });
    }
  };
}
