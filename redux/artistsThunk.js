const BASE_URL = 'https://www.admin.poolbar.at/'

function setArtists(artists) {
    return {
        type: "SET_ARTISTS",
        payload: artists
    }
}

function setIsFetchingData(isFetching) {
    return {
        type: "SET_IS_FETCHING_DATA",
        payload: isFetching
    }
}

function setHasFetchingDataError(hasError) {
    return {
        type: "SET_HAS_FETCHING_DATA_ERROR",
        payload: hasError
    }
}

function fetchArtists() {
    return (dispatch, getState) => {
        const isFetchingData = getState().artists.isFetchingData;
        if (isFetchingData) {
            return;
        } else {
            dispatch(setIsFetchingData(true));
            console.log('Fetching Artists');
            fetch(BASE_URL + 'items/artists')
                .then(async response => {
                    // check for error response
                    console.log(response.ok);

                    if (response.ok) {
                        const data = await response.json();
                        dispatch(setArtists(data.data));
                    } else {
                        const error = (data && data.message) || response.status;
                        console.log("Fetching Artist Error: ", error);
                        dispatch(setHasFetchingDataError(true));
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    dispatch(setHasFetchingDataError(true));
                })
                .finally(() => {
                    console.log('Finished loading Artists');
                    dispatch(setIsFetchingData(false));
                })
        }
    }
}

export default fetchArtists;
