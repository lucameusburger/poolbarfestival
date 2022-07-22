export const initialState = {
  data: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_SCANN':
      if (
        state.data.find(
          (scann) =>
            scann.id === action.payload.id && scann.type === action.payload.type
        )
      ) {
        return state;
      }
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case 'SET_SCANNS':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
