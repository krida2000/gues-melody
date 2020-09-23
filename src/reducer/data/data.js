const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  }
};

const ActionCreator = {
  loadQuestions: (questions) => {
    return {
      type: `LOAD_QUESTIONS`,
      payload: questions,
    };
  }
};

const initialState = {
  questions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_QUESTIONS`: return Object.assign({}, state, {
      questions: action.payload,
    });
  }

  return state;
};

export {
  ActionCreator,
  Operation,
  reducer,
};

