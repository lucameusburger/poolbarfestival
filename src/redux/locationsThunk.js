import { fetchArtists } from './artistsThunk';

const BASE_URL = 'https://www.admin.poolbar.at/';

function setLocations(venues) {
    return {
        type: 'SET_LOCATIONS',
        payload: venues,
    };
}

function setIsFetchingData(isFetching) {
    return {
        type: 'SET_IS_FETCHING_LOCATIONS',
        payload: isFetching,
    };
}

function setHasFetchingDataError(hasError) {
    return {
        type: 'SET_HAS_FETCHING_LOCATIONS_ERROR',
        payload: hasError,
    };
}
export function fetchLocations() {
    return (dispatch, getState) => {
        const isFetchingData = getState().venues.isFetchingData;
        if (isFetchingData) {
            return;
        } else {
            dispatch(setIsFetchingData(true));
            fetch(BASE_URL + 'items/raumfahrtprogramme')
                .then(async (response) => {
                    // check for error response
                    console.log(response.ok);

                    if (response.ok) {
                        const data = await response.json();
                        let fetchedLocations = data.data || [];

                        dispatch(setLocations(fetchedLocations));
                    } else {
                        const error = (data && data.message) || response.status;
                        console.log('Fetching Locations Error: ', error);
                        dispatch(setHasFetchingDataError(true));
                    }
                })
                .catch((error) => {
                    console.error('Error loading Locations: ', error);
                    dispatch(setHasFetchingDataError(true));
                })
                .finally(() => {
                    console.log('Finished loading Locations');
                    dispatch(setIsFetchingData(false));
                });
        }
    };
}

export function fetchGenerator(generatorId) {
    return fetchLocations();
}