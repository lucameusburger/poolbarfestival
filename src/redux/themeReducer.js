export const initialState = {
  CLR_PRIMARY: '#00ff00',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CLR_PRIMARY':
      return {
        ...state,
        CLR_PRIMARY: action.payload,
      };
    default:
      return state;
  }
}
