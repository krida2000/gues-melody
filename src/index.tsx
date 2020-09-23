import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './Components/app/app';
import questions from './mocks/questions.js';
import reducer from "./reducer/reducer";
import {ActionCreator as UserActionCreator} from "./reducer/user/user"
import {Operation as UserOperation} from "./reducer/user/user";
import {Operation as DataOperation} from "./reducer/data/data";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "./api";
import {BrowserRouter} from "react-router-dom";

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

function init() {
  const onUnauthorized = () => {
    store.dispatch(UserActionCreator.setAuthorization(true));
  };

  const api = createAPI(onUnauthorized);

  const store = applyMiddleware(thunk.withExtraArgument(api))(createStore)(
    reducer,
    // Я так и не понял, что компилятору TS не нравится
    // eslint-disable-next-line
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  );

  store.dispatch(DataOperation.loadQuestions());
  store.dispatch(UserOperation.checkAuthorization());

  ReactDOM.render(
      <Provider store={store}>
          <App
            maxMistakes={3}
            gameTime={5}
          />
      </Provider>,
      document.querySelector(`#root`)
  );
}

init();
