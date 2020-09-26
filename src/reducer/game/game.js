const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET: `RESET`,
};

const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) =>
    (it === (question.genre === question.answers[i].genre)));
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
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
      type: ActionType.INCREMENT_MISTAKES,
      payload: isAnswerCorrect ? 0 : 1,
    };
  },

  reset: () => {
    return {
      type: ActionType.RESET,
    };
  }
};

const initialState = {
  step: -1,
  mistakes: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP: return Object.assign({}, state, {
      step: state.step + action.payload,
    });

    case ActionType.INCREMENT_MISTAKES: return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload,
    });

    case ActionType.RESET: return Object.assign({}, initialState);
  }

  return state;
};

export {
  ActionCreator,
  reducer,
  ActionType
};
