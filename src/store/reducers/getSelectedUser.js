const initialState = {
  selectedUser: null,
};
const getSelectedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SELECTED_USER":
      return {
        selectedUser: action.payload,
      };
    default:
      return state;
  }
};

export default getSelectedUserReducer;
