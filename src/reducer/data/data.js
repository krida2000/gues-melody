const ActionType = {
  LOAD_QUESTION: `LOAD_QUESTIONS`,
};

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
      type: ActionType.LOAD_QUESTION,
      payload: questions,
    };
  }
};

const initialState = {
  questions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTION: return Object.assign({}, state, {
      questions: action.payload,
    });
  }

  return state;
};

export {
  ActionCreator,
  Operation,
  reducer,
  ActionType,
};

