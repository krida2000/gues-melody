const ActionType = {
  UPDATE_AUTHORIZATION: `UPDATE_AUTHORIZATION`,
};

const Operation = {
  checkAuthorization: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.setAuthorization(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.setAuthorization(true));
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {email: authData.login, password: authData.password})
      .then(() => {
        dispatch(ActionCreator.setAuthorization(false));
      })
      .catch((err) => {
        throw err;
      });
  },
};

const ActionCreator = {
  setAuthorization: (isAuthorizationRequired) => {
    return {
      type: ActionType.UPDATE_AUTHORIZATION,
      payload: isAuthorizationRequired,
    };
  }
};

const initialState = {
  isAuthorizationRequired: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_AUTHORIZATION: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload,
    });
  }

  return state;
};

export {
  ActionCreator,
  Operation,
  reducer,
  ActionType,
  initialState
};
