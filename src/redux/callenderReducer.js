export const initialState = {
    isPermissionGranted: false,
    callenderId: null,
    //{type: string, id: string, eventId: string}
    events: [],
}


export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PERMISSION_GRANTED':
            return {
                ...state,
                isPermissionGranted: action.payload
            }
        case 'SET_CALLENDER_ID':
            return {
                ...state,
                callenderId: action.payload
            }
        case 'ADD_TO_CALLENDER_EVENTS':
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        case 'REMOVE_FROM_CALLENDER_EVENTS_BY_ID':
            return {
                ...state,
                events: state.events.filter(event => event.eventId !== action.payload)
            }
        default:
            return state
    }
}