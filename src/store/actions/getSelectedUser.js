export function getSelectedUserData(data) {
  return {
    type: "GET_SELECTED_USER",
    payload: data,
  };
}

export function getSelectedUser(data) {
  return (dispatch) => {
    dispatch(getSelectedUserData(data));
  };
}
