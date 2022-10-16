const initialState = {
  selectedBuild: null,
};
const getSelectedBuildReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SELECTED_BUILD":
      return {
        selectedBuild: action.payload,
      };
    default:
      return state;
  }
};

export default getSelectedBuildReducer;
