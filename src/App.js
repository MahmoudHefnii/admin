import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import "./App.css";
import UserBuildingsPage from "./pages/user-buildings";
import allReducers from "./store/reducers";

function App() {
  const store = createStore(allReducers, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <div className="containerApp">
        <UserBuildingsPage />
      </div>
    </Provider>
  );
}

export default App;
