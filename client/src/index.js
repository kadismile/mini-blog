import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import "toastr/build/toastr.min.css";
import * as serviceWorker from './serviceWorker';
require('dotenv').config()

const persistedState = localStorage.getItem("miniBlog")
  ? JSON.parse(localStorage.getItem("miniBlog"))
  : {};

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(function() {
  localStorage.setItem("miniBlog", JSON.stringify(store.getState()));
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
