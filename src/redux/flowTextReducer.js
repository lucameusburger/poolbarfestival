export const initialState = {
    elements: [],
    phrase: ""
}


export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ELEMENTS':
            return {
                ...state,
                elements: action.payload
            }
        case 'ADD_ELEMENT':
            return {
                ...state,
                elements: [...state.elements, action.payload]
            }
        case 'REMOVE_ELEMENT':
            return {
                ...state,
                elements: state.elements
                    .filter(element => action.payload !== element.key)
            }
        case 'SET_PHRASE':
            return {
                ...state,
                phrase: action.payload
            }
        default:
            return state
    }
}