export function getSelectedBuildData(data) {
  return {
    type: "GET_SELECTED_BUILD",
    payload: data,
  };
}

export function getSelectedBuild(data) {
  return (dispatch) => {
    dispatch(getSelectedBuildData(data));
  };
}
