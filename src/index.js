import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from 'core/reducers';
import Records from "lib/records";
import App from "core/app";

const history = createBrowserHistory();
const store = createStore(reducers, applyMiddleware(thunk));

const update = () => {
    const records = new Records();
    records.setRecord("diploma", store.getState());
}
store.subscribe(update);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);
