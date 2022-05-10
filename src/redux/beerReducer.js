export const initialState = {
  code: "jkfhkjhdkj",
  redemed: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CODE":
      return {
        ...state,
        code: action.payload,
      };
    case "SET_REDEEMED":
      return {
        ...state,
        redemed: action.payload,
      };
    default:
      return state;
  }
}
