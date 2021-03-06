import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter as Router} from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import {reducers} from "./redux/reducers";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

const store = createStore(reducers, compose(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <Router>
            <App/>
        </Router>,
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();