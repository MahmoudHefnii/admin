const initialState = {
  loading: true,
  error: false,
  data: null,
};
const getAllDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_DATA_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "GET_ALL_DATA_SUCCESS":
      return {
        loading: false,
        error: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default getAllDataReducer;
