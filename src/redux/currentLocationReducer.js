export const initialState = {
    data: null,
    isLoaded: false,
    isFetchingData: false,
    hasFetchingDataError: false,
}


export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CURRENTLOCATION':
            console.log(action.payload)
            return {
                ...state,
                data: action.payload,
                isLoaded: true,
            }
        case 'SET_IS_FETCHING_CURRENTLOCATION':
            return {
                ...state,
                isFetchingData: action.payload,
            }
        case 'SET_HAS_FETCHING_CURRENTLOCATION_ERROR':
            return {
                ...state,
                hasFetchingDataError: action.payload,
            }
        default:
            return state
    }
}