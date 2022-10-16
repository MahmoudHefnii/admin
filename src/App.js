import "./App.css";
import UserBuildingsPage from "./pages/user-buildings";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import allReducers from "./store/reducers";
import { createStore, applyMiddleware } from "redux";

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
