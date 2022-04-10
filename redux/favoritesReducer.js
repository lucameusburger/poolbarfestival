export const initialState = {
    likedArtists: [],
    likedEvents: [],
}


export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_LIKED_ARTISTS':
            if (state.likedArtists.includes(action.payload)) {
                return state
            } else {
                return {
                    ...state,
                    likedArtists: [...state.likedArtists, action.payload]
                }
            }
        case 'ADD_TO_LIKED_EVENTS':
            if (state.likedEvents.includes(action.payload)) {
                return state
            } else {
                return {
                    ...state,
                    likedEvents: [...state.likedEvents, action.payload]
                }
            }
        case 'REMOVE_FROM_LIKED_ARTISTS':
            return {
                ...state,
                likedArtists: state.likedArtists.filter(artist => artist.id !== action.payload.id)
            }
        case 'REMOVE_FROM_LIKED_EVENTS':
            return {
                ...state,
                likedEvents: state.likedEvents.filter(event => event.id !== action.payload.id)
            }
        default:
            return state
    }
}