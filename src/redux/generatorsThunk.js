import { fetchArtists } from './artistsThunk';

const BASE_URL = 'https://www.admin.poolbar.at/';

function setData(generators) {
    return {
        type: 'SET_GENERATORS',
        payload: generators,

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
    return async (dispatch, getState) => {
        const isFetchingData = getState().generators.isFetchingData;
        if (isFetchingData) {
            return;
        } else {
            dispatch(setIsFetchingData(true));
            const memberGeneratorResponse = await fetch(BASE_URL + 'items/generator_projects_generator_members')
            const memberGeneratorD = await memberGeneratorResponse.json();
            const memberGeneratorData = memberGeneratorD.data;

            const memberResponse = await fetch(BASE_URL + 'items/generator_members')
            const memberD = await memberResponse.json();
            const memberData = memberD.data;
            console.log(memberGeneratorData);
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

                        // add member ids to each generator
                        fetchedGenerators = fetchedGenerators.map((item) => {
                            const memberIds = memberGeneratorData
                                .filter((member) => member.generator_projects_id === item.id)
                                .map((member) => member.generator_members_id);
                            item.members = memberData.filter((member) => memberIds.includes(member.id));
                            return item;
                        });

                        dispatch(setData(fetchedGenerators));
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