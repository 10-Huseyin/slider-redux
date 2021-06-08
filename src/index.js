import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Reducers/rootReducer";
import sliderReducer from "./Reducers/sliderReducer";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import logger from "redux-logger";
import reduxPromise from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";

// const allEnhancers=compose(
//   applyMiddleware(thunk),
// )
// const myStore=createStore(sliderReducer,allEnhancers)

const myStore = createStore(
  sliderReducer,
  composeWithDevTools(applyMiddleware(thunk, reduxPromise, logger))
);
ReactDOM.render(
  <Provider store={myStore}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
