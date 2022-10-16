import users from "data/users.json";

export function getAllDataLoading(bool) {
  return {
    type: "GET_ALL_DATA_LOADING",
    payload: bool,
  };
}

export function getAllDataSuccess(items) {
  return {
    type: "GET_ALL_DATA_SUCCESS",
    payload: items,
  };
}

export function getAllData() {
  return (dispatch) => {
    dispatch(getAllDataLoading(true));
    setTimeout(() => {
      dispatch(getAllDataSuccess(users));
    }, 3000);
  };
}

export function updateAllData(users) {
  return (dispatch) => {
    dispatch(getAllDataSuccess(users));
  };
}
