import { fetchArtists } from './artistsThunk';

const BASE_URL = 'https://www.admin.poolbar.at/';

function setGenerators(venues) {
    return {
        type: 'SET_GENERATORS',
        payload: venues,
    };
}

function setIsFetchingData(isFetching) {
    return {
        type: 'SET_IS_FETCHING_GENERATORS',
        payload: isFetching,
    };
}

function setHasFetchingDataError(hasError) {
    return {
        type: 'SET_HAS_FETCHING_GENERATORS_ERROR',
        payload: hasError,
    };
}
export function fetchGenerators() {
    return (dispatch, getState) => {
        const isFetchingData = getState().venues.isFetchingData;
        if (isFetchingData) {
            return;
        } else {
            dispatch(setIsFetchingData(true));
            fetch(BASE_URL + 'items/generator_projects')
                .then(async (response) => {
                    // check for error response
                    console.log(response.ok);

                    if (response.ok) {
                        const data = await response.json();
                        let fetchedGenerators = data.data || [];

                        // fetch lab
                        await Promise.all(
                            fetchedGenerators.map(async (item) => {
                                item.lab_item = {};
                                if (!item.lab) return item;
                                const resp = await fetch('https://www.admin.poolbar.at/items/generator_labs/' + item.lab);
                                const data = await resp.json();
                                if (!data.data) return item;
                                item.lab_item = data.data;

                                return item;
                            })
                        );

                        dispatch(setGenerators(fetchedGenerators));
                    } else {
                        const error = (data && data.message) || response.status;
                        console.log('Fetching Generators Error: ', error);
                        dispatch(setHasFetchingDataError(true));
                    }
                })
                .catch((error) => {
                    console.error('Error loading Generators: ', error);
                    dispatch(setHasFetchingDataError(true));
                })
                .finally(() => {
                    console.log('Finished loading Generators');
                    dispatch(setIsFetchingData(false));
                });
        }
    };
}

export function fetchGenerator(generatorId) {
    return fetchGenerators();
}