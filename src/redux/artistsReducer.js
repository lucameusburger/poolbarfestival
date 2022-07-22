export const initialState = {
  artists: [],
  isLoaded: false,
  isFetchingData: false,
  hasFetchingDataError: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ARTISTS':
      return {
        ...state,
        artists: action.payload,
        isLoaded: true,
      };
    case 'SET_IS_FETCHING_DATA':
      return {
        ...state,
        isFetchingData: action.payload,
      };
    case 'SET_HAS_FETCHING_DATA_ERROR':
      return {
        ...state,
        hasFetchingDataError: action.payload,
      };
    case 'persist/REHYDRATE':
      return {
        ...action.payload.artists,
        isLoaded: false,
        isFetchingData: false,
        hasFetchingDataError: false,
      };
    default:
      return state;
  }
}
