export const initialState = {
  CLR_PRIMARY: '#c6c300',
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
