const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) =>
    (it === (question.genre === question.answers[i].genre)));
};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  },

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
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1,
  }),

  incrementMistakes: (userAnswer, question) => {
    let isAnswerCorrect = false;

    switch (question.type) {
      case `genre` : isAnswerCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
      case `artist` : isAnswerCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: isAnswerCorrect ? 0 : 1,
    };
  },

  loadQuestions: (questions) => {
    return {
      type: `LOAD_QUESTIONS`,
      payload: questions,
    };
  },

  setAuthorization: (isAuthorizationRequired) => {
    return {
      type: `UPDATE_AUTHORIZATION`,
      payload: isAuthorizationRequired,
    };
  },

  reset: () => {
    return {
      type: `RESET`,
    };
  }
};

const initialState = {
  step: -1,
  mistakes: 0,
  questions: [],
  isAuthorizationRequired: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`: return Object.assign({}, state, {
      step: state.step + action.payload,
    });

    case `INCREMENT_MISTAKES`: return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload,
    });

    case `LOAD_QUESTIONS`: return Object.assign({}, state, {
      questions: action.payload,
    });

    case `UPDATE_AUTHORIZATION`: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload,
    });

    case `RESET`: return Object.assign({}, initialState);
  }

  return state;
};

export {
  ActionCreator,
  Operation,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer,
};
