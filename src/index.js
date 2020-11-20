import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from 'core/reducers_R';
import Records from "lib/records";
import App from "core/app";
import { VERSION } from 'lib/constants';

const history = createBrowserHistory();
const store = createStore(reducers, applyMiddleware(thunk));

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));

const update = () => {
    const records = new Records();
    records.setRecord(`diploma${VERSION}`, store.getState());
}
store.subscribe(update);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router history={history}>
                <App />
            </Router>
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);
