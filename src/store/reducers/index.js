import { combineReducers } from "redux";
import getAllDataReducer from "./getAllData";
import getSelectedBuildReducer from "./getSelectedBuild";
import getSelectedUserReducer from "./getSelectedUser";

const allReducers = combineReducers({
  getAllData: getAllDataReducer,
  getSelectedUser: getSelectedUserReducer,
  getSelectedBuild: getSelectedBuildReducer,
});

export default allReducers;
