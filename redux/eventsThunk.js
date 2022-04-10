import { fetchArtists } from "./artistsThunk"

const BASE_URL = 'https://www.admin.poolbar.at/'

function setEvents(artists) {
    return {
        type: "SET_EVENTS",
        payload: artists
    }
}

function setIsFetchingData(isFetching) {
    return {
        type: "SET_IS_FETCHING_EVENTS",
        payload: isFetching
    }
}

function setHasFetchingDataError(hasError) {
    return {
        type: "SET_HAS_FETCHING_EVENTS_ERROR",
        payload: hasError
    }
}

export function fetchEvents() {
    return (dispatch, getState) => {
        const isFetchingData = getState().events.isFetchingData;
        if (isFetchingData) {
            return;
        } else {
            console.log("fetching events...");
            dispatch(setIsFetchingData(true));
            dispatch(fetchArtists())
            fetch(BASE_URL + 'items/events')
                .then(async response => {
                    // check for error response
                    if (response.ok) {
                        const data = await response.json();
                        dispatch(setEvents(data.data));
                    } else {
                        const error = (data && data.message) || response.status;
                        console.log("Fetching Events Error: ", error);
                        dispatch(setHasFetchingDataError(true));
                    }
                })
                .catch(error => {
                    console.error('Error loading Events: ', error);
                    dispatch(setHasFetchingDataError(true));
                })
                .finally(() => {
                    console.log('Finished loading Events');
                    dispatch(setIsFetchingData(false));
                })
        }
    }
}


export function fetchArtist(artistId) {
    return (dispatch, getState) => {
        const isFetchingData = getState().artists.isFetchingData;
        if (isFetchingData) {
            return;
        } else {
            dispatch(setIsFetchingData(true));
            fetch(BASE_URL + 'items/artists')
                .then(async response => {
                    // check for error response
                    console.log(response.ok);

                    if (response.ok) {
                        const data = await response.json();
                        dispatch(setEvents(data.data));
                    } else {
                        const error = (data && data.message) || response.status;
                        console.log("Fetching Artist Error: ", error);
                        dispatch(setHasFetchingDataError(true));
                    }
                })
                .catch(error => {
                    console.error('Error loading Artists: ', error);
                    dispatch(setHasFetchingDataError(true));
                })
                .finally(() => {
                    console.log('Finished loading Artists');
                    dispatch(setIsFetchingData(false));
                })
        }
    }
}

