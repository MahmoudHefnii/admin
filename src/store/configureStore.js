import rootReducer from "reducers";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  const enhancer = applyMiddleware(thunk);

  return createStore(rootReducer, initialState, enhancer);
}
