export const initialState = {
    isPermissionGranted: false,
    userLocation: null,
}


export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOCATION_SELECTED':
            return { ...state, userLocation: action.payload.location }
        case 'SET_LOCATION_PERMISSION':
            return { ...state, isPermissionGranted: action.payload }
        default:
            return state
    }
}