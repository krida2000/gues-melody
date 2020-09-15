import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './Components/app/app';
import questions from './mocks/questions.js';
import {reducer, ActionCreator, Operation} from "./reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "./api";
import {BrowserRouter} from "react-router-dom";
import history from './history'

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

function init() {
  console.log(history);
  const onUnauthorized = () => {
    store.dispatch(ActionCreator.setAuthorization(true));
  };

  const api = createAPI(onUnauthorized);

  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  store.dispatch(Operation.loadQuestions());
  store.dispatch(Operation.checkAuthorization());

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <App
            maxMistakes={3}
            gameTime={5}
          />
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`)
  );
}

init();