export const initialState = {
    artists: [],
    isLoaded: false,
    isFetchingData: false,
    hasFetchingDataError: false,
}


export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ARTISTS':
            console.log("SET_ARTISTS", action.payload)
            return {
                ...state,
                artists: action.payload,
                isLoaded: true,
            }
        case 'SET_IS_FETCHING_DATA':
            return {
                ...state,
                isFetchingData: action.payload,
            }
        case 'SET_HAS_FETCHING_DATA_ERROR':
            return {
                ...state,
                hasFetchingDataError: action.payload,
            }
        default:
            return state
    }
}