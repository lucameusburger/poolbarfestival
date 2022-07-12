export const initialState = {
  data: [],
  isLoaded: false,
  isFetchingData: false,
  hasFetchingDataError: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SPACELOCATIONS':
      return {
        ...state,
        data: action.payload,
        isLoaded: true,
      };
    case 'SET_IS_FETCHING_SPACELOCATIONS':
      return {
        ...state,
        isFetchingData: action.payload,
      };
    case 'SET_HAS_FETCHING_SPACELOCATIONS_ERROR':
      return {
        ...state,
        hasFetchingDataError: action.payload,
      };
    case 'persist/REHYDRATE':
      return {
        ...state,
        isLoaded: false,
        isFetchingData: false,
        hasFetchingDataError: false,
      };
    default:
      return state;
  }
}
