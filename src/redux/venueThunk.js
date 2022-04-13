import { fetchArtists } from './artistsThunk';

const BASE_URL = 'https://www.admin.poolbar.at/';

function setVenues(venues) {
    return {
        type: 'SET_VENUES',
        payload: venues,
    };
}

function setIsFetchingData(isFetching) {
    return {
        type: 'SET_IS_FETCHING_VENUES',
        payload: isFetching,
    };
}

function setHasFetchingDataError(hasError) {
    return {
        type: 'SET_HAS_FETCHING_VENUES_ERROR',
        payload: hasError,
    };
}
export function fetchVenues() {
    return (dispatch, getState) => {
        const isFetchingData = getState().venues.isFetchingData;
        if (isFetchingData) {
            return;
        } else {
            dispatch(setIsFetchingData(true));
            fetch(BASE_URL + 'items/rooms')
                .then(async (response) => {
                    // check for error response
                    console.log(response.ok);

                    if (response.ok) {
                        const data = await response.json();
                        dispatch(setVenues(data.data));
                    } else {
                        const error = (data && data.message) || response.status;
                        console.log('Fetching Rooms Error: ', error);
                        dispatch(setHasFetchingDataError(true));
                    }
                })
                .catch((error) => {
                    console.error('Error loading Rooms: ', error);
                    dispatch(setHasFetchingDataError(true));
                })
                .finally(() => {
                    console.log('Finished loading Rooms');
                    dispatch(setIsFetchingData(false));
                });
        }
    };
}

export function fetchVenue(artistId) {
    return fetchVenues();
}