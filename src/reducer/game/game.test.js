import {reducer, ActionType, ActionCreator} from "./game";

describe(`Reducer work correctly`, () => {
  it(`Reducer without parameters return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
    });
  });

  it(`Reducer increment step on payload value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    })).toEqual({
      step: 0,
      mistakes: 0,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 5,
    })).toEqual({
      step: 4,
      mistakes: 0,
    });
  });

  it(`Reducer increment mistakes on payload value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    })).toEqual({
      step: -1,
      mistakes: 1,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 3,
    })).toEqual({
      step: -1,
      mistakes: 3,
    });
  });

  it(`Reducer reset also return initial state`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.RESET,
      payload: null,
    })).toEqual({
      step: -1,
      mistakes: 0,
    });

    expect(reducer({
      step: 15,
      mistakes: 5,
    }, {
      type: ActionType.RESET,
      payload: null,
    })).toEqual({
      step: -1,
      mistakes: 0,
    });

    expect(reducer({
      step: 15,
      mistakes: 5,
    }, {
      type: ActionType.RESET,
      payload: 10,
    })).toEqual({
      step: -1,
      mistakes: 0,
    });
  });
});

describe(`Action creator work correctly`, () => {
  it(`Increment step also return correct value`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });

    expect(ActionCreator.incrementStep(10)).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`Reset also return correct value`, () => {
    expect(ActionCreator.reset()).toEqual({
      type: ActionType.RESET
    });

    expect(ActionCreator.reset(10)).toEqual({
      type: ActionType.RESET
    });
  });

  it(`Increment mistakes also return correct value`, () => {
    expect(ActionCreator.incrementMistakes(`correct artist`, {
      type: `artist`,
      song: {
        artist: `correct artist`,
      }
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });

    expect(ActionCreator.incrementMistakes(`incorrect artist`, {
      type: `artist`,
      song: {
        artist: `correct artist`,
      }
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });

    expect(ActionCreator.incrementMistakes([true, false, true, false], {
      type: `genre`,
      genre: `correct genre`,
      answers: [
        {
          genre: `correct genre`,
        },
        {
          genre: `incorrect genre`,
        },
        {
          genre: `correct genre`,
        },
        {
          genre: `incorrect genre`,
        },
      ],
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });

    expect(ActionCreator.incrementMistakes([true, true, true, true], {
      type: `genre`,
      genre: `correct genre`,
      answers: [
        {
          genre: `correct genre`,
        },
        {
          genre: `incorrect genre`,
        },
        {
          genre: `correct genre`,
        },
        {
          genre: `incorrect genre`,
        },
      ],
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });
});
